var helper = require('../../../helper/helper');
var notification = require('../../../helper/notification');
var models = require('../../../models');
var setting = require('../../../config/setting');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ejs = require('ejs');

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};


//Get hire_fleet API V1 (for customer )

exports.hire_fleet = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    let weight_in_tons = req.body.weight_in_tons;
    let pickup_location = req.body.pickup_location;
    let pickup_latitude = req.body.pickup_latitude;
    let pickup_longitude = req.body.pickup_longitude;
    let drop_off_location = req.body.drop_off_location;
    let drop_off_latitude = req.body.drop_off_latitude;
    let drop_off_longitude = req.body.drop_off_longitude;
    let amount = req.body.amount;
    let fleet_id = req.body.fleet_id;
    var date_time = req.body.date_time;

    req.checkBody('weight_in_tons', 'Weight required').notEmpty();
    req.checkBody('pickup_location', 'Pickup Location required').notEmpty();
    req.checkBody('pickup_latitude', 'Pickup Latitude required').notEmpty();
    req.checkBody('pickup_longitude', 'Pickup Longitude required').notEmpty();
    req.checkBody('drop_off_location', 'Drop off Location required').notEmpty();
    req.checkBody('drop_off_latitude', 'Drop off Latitude required').notEmpty();
    req.checkBody('drop_off_longitude', 'Drop off Longitude required').notEmpty();
    req.checkBody('amount', 'Amount required').notEmpty();
    req.checkBody('fleet_id', 'Fleed Id required').notEmpty();
    // req.checkBody('data_time', 'Data Time must be valid').isValidDate();
    req.checkBody('date_time')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Data Time cannot be empty')
        .isISO8601('yyyy-mm-dd');
    // .matches('^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
    // .withMessage('Data Time must be in correct format yyyy:mm:dd hh:mm:ss');

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var booking_detail = {};

        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var User_Id = 0;
      

        await models.User.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id },
            attributes: ['User_Id','Email'],
            plain: true,
            include: [
                {
                    model: models.User_Contact, as: "User_Contact"
                    , attributes: ['User_Contact_Value1']
                    , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                    , required: false
                },
                {
                    model: models.User_Profile, as: "User_Profile"
                    , attributes: ['First_Name', 'Last_Name']
                },
                {
                    model: models.User_Document, as: "User_Document"
                    , attributes: ["Document_Detail"]
                    , where: { Document_Type: "profile_image", Is_Active: 1 }
                    , required: false
                },                
            ]
        }).then(data => {
            User_Id = data.User_Id;
            booking_detail.Email = data.Email;
            booking_detail.First_Name = data.User_Profile.First_Name;
            booking_detail.User_Contact_Value1 = data.User_Contact.User_Contact_Value1;

        });
        if (User_Id != 0) {

            var Request_Id = 0;

            

            // var dateString = "2010-08-09 01:02:03";

            var tem_reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
            var tem_dateArray = tem_reggie.exec(date_time);
            var tem_dateObject = new Date(
                (+tem_dateArray[1]),
                (+tem_dateArray[2]) - 1, // Careful, month starts at 0!
                (+tem_dateArray[3]),
                (+tem_dateArray[4]),
                (+tem_dateArray[5]),
                (+tem_dateArray[6])
            );

            var expiry_date = new Date((new Date).getTime() + 30 * 60000);

            booking_detail.From_Location = pickup_location;
            booking_detail.To_Location = drop_off_location;
            booking_detail.Item_Weight = weight_in_tons;
            booking_detail.ETA_Amount = amount;
            booking_detail.Requested_Date = tem_dateObject;

            // console.log(tem_dateObject);
            // console.log(expiry_date);
            await models.Rms_Request.create(
                {
                    From_Latitude: pickup_latitude,
                    From_Longitude: pickup_longitude,
                    From_Location: pickup_location,
                    To_Latitude: drop_off_latitude,
                    To_Longitude: drop_off_longitude,
                    To_Location: drop_off_location,
                    Item_Weight: weight_in_tons,
                    ETA_Amount: amount,
                    Shipping_Type_Id: 0,
                    Promo_Id: 0,
                    Requested_By: User_Id,
                    Requested_Date: tem_dateObject,
                    Requested_Expiry: expiry_date,
                    Request_Status_Id: 1,
                    Created_By: 0,
                    Created_Date: new Date(),
                    Is_Active: 1

                }
            ).then(data => {

                Request_Id = data.Request_Id;


            }).catch(err => {
                return_data.error = err;
            });

            if (Request_Id != 0) {

                booking_detail.Request_Id = Request_Id;

                await models.Rms_Accept.create(
                    {

                        Request_Id: Request_Id,
                        Current_Latitude: null,
                        Current_Longitude: null,
                        Accepted_By: fleet_id,
                        Reference_Accept_Id: 0,
                        Accept_Status_Id: 5,
                        Accept_Status_Date: new Date(),
                        Created_By: 0,
                        Created_Date: new Date(),
                        Is_Active: 1

                    }
                ).then(data => {

                    return_data.status = true;
                    return_data.error = null;
                    return_data.message = "Booking has been created!";

                    return_data.response.weight_in_tons = weight_in_tons;
                    return_data.response.pickup_location = pickup_location;
                    return_data.response.pickup_latitude = pickup_latitude;
                    return_data.response.pickup_longitude = pickup_longitude;
                    return_data.response.drop_off_location = drop_off_location;
                    return_data.response.drop_off_latitude = drop_off_latitude;
                    return_data.response.drop_off_longitude = drop_off_longitude;
                    return_data.response.amount = amount;
                    return_data.response.fleet_id = fleet_id;
                    return_data.response.date_time = date_time;

                  


                }).catch(err => {
                    return_data.error = err;
                });

                if(return_data.status){
                    notification.send_notification(true,true,
                        {   User_Id:fleet_id,
                            Title:'Received Booking',
                            Detail:'You Have Received Booking For '+date_time,
                            Created_By : User_Id,
                            Created_Date : new Date(),
                            Is_Active : 1
                        }
                    );



                    var email = '';
                    await models.User.findOne({
                        where: { Is_Active: 1, User_Id: fleet_id },
                        attributes: ['User_Id','Email'],
                        plain: true,
                    }).then(data => {
                       
                        email = data.Email;
            
                    });

                    
                    email_view = await ejs.renderFile('./views/email/booking.ejs'
                    , {

                        title:"Booking at "+setting.application.name,
                        url:setting.application.web_url,
                        website:setting.application.website,
                        application:setting.application,
                        booking_detail: booking_detail,
                        email:email,
                        email_token:helper.createToken_Booking(Request_Id)
                     }
                    );
                    
                    email_setting = setting.email;
                    email_setting.subject =  "Booking at "+setting.application.name;
                    email_setting.to_email =  email;
                    // email_setting.to_email =  "salim.viftech@gmail.com";
                    // email_view =__dirname + 'path_to_template.pug';

                    // console.log(email_view);
                   
                    await notification.send_email(email_setting,email_view).catch();

                    // res.render('email/booking', {
                        
                    //                             title:"Booking at "+setting.application.name,
                    //                             url:setting.application.web_url,
                    //                             website:setting.application.website,
                    //                             application:setting.application,
                    //                             booking_detail: booking_detail,
                    //                             email:email,
                    //                             email_token:helper.createToken_Booking(Request_Id)
                    //                          });
                }



            } else {

                return_data.error = "Request id not found";
            }

        } else {

            return_data.error = "Invalid User!";
        }

    }


    res.send(JSON.stringify(return_data));

}