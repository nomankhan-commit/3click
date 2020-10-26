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



// Sign Up - V1 (for customer and driver role)

exports.sign_up = async function (req, res) {

  

    return_data = { status: false, message: "", response: {}, error: null };
    //Name Email Password UserType Device Token Network Protocol (FCM/APNS)

    res.header('Content-Type', 'application/json');
    let name = req.body.name;
    let email = req.body.email;
    let user_type = req.body.user_type;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let network_protocol = req.body.network_protocol;
    var city = "";
    var age = "";
    var vehicle_reg = "";
    var vehicle_insurance = "";
    var certification = "";
    var license = "";

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty().isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('user_type', 'Invalid User').notEmpty();
    req.checkBody('device_token', 'Device Token is required').notEmpty();
    req.checkBody('network_protocol', 'Network Protocol is required').notEmpty();


    if (user_type == 4) {

        req.checkBody('city', 'City is required').notEmpty();
        // req.checkBody('age', 'Age is required').notEmpty();
        // req.checkBody('vehicle_reg', 'Vehicle Register is required').notEmpty();
        // req.checkBody('vehicle_insurance', 'Vehicle Insurance is required').notEmpty();
        // req.checkBody('certification', 'Certification is required').notEmpty();
        // req.checkBody('license', 'License is required').notEmpty();

       
        city = req.body.city;
        if(req.body.age != null){
            age = req.body.age;
        }
        if(req.body.vehicle_reg != null){
            vehicle_reg = req.body.vehicle_reg;
        }
        if(req.body.vehicle_insurance != null){
            vehicle_insurance = req.body.vehicle_insurance;
        }

        if(req.body.certification != null){
            certification = req.body.certification;
        }

        if(req.body.license != null){
            license = req.body.license;
        }
       

    }

    // console.log(helper.Generate_Password("assas"));

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        if (user_type == 2 || user_type == 4) {

            var Is_Active = 0;

            if (user_type == 2) {

                Is_Active = 1;
            }

            var db_restult = [];
           
            await models.User.findAll({
                where: { User_Name: email ,Is_Active:[1,2]},
                attributes: ['User_Id'],
                raw: true,
            }).then(data => {
                db_restult = data;

            });
            if (db_restult.length == 0) {

                var user_id = 0;
                // var deafult_image_path = "http://transmissito.codecreators.net:3000/assets/cms/images/profile/default.png";
                var deafult_image_path = helper.Application_Setting_Default_Iamge();
                
               
                
                await models.User.create(
                    {
                        User_Name: email,
                        Email: email,
                        Password: helper.Generate_Password(password),
                        Signup_Date: new Date(),
                        User_Parent_Id:0,
                        Created_By: 0,
                        Created_Date: new Date(),
                        Is_Active: Is_Active

                    }
                ).then(data => {

                    // console.log("asas");

                    // console.log(data);

                    user_id = data.User_Id;

                }).catch(err => {
                    return_data.error = err;
                });


                if (user_id != 0) {


                    await models.User_Profile.create(
                        {

                            User_Id: user_id,
                            First_Name: name,
                            Last_Name: "",
                            User_Title: "",
                            User_Address: "",
                            Created_By: user_id,
                            Created_Date: new Date(),
                            Is_Active: 1

                        }
                    ).catch(err => {
                        return_data.error = err;
                    });

                    await models.User_Document.create(
                        {
                            User_Id: user_id,
                            Document_Type: "profile_image",
                            Document_Detail: deafult_image_path,
                            Created_By: user_id,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    ).catch(err => {
                        return_data.error = err;
                    });

                    await models.Sec_User_Role.create(
                        {
                            User_Id: user_id,
                            Role_Id: user_type,
                            Created_By: user_id,
                            Created_Date: new Date(),
                            Is_Active: 1
                        }
                    ).catch(err => {
                        return_data.error = err;
                    });

                    if (user_type == 4) {


                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 1,
                                Field_Value: city,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 2,
                                Field_Value: age,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 3,
                                Field_Value: vehicle_reg,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 4,
                                Field_Value: vehicle_insurance,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 5,
                                Field_Value: certification,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                        await models.User_Custom_Info.create(
                            {
                                User_Id: user_id,
                                Field_Id: 6,
                                Field_Value: license,
                                Created_By: user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });

                    }


                    return_data.message = "Susscess";
                    return_data.response.name = name + "";
                    return_data.response.email = email + "";
                    return_data.response.password = password + "";
                    return_data.response.user_type = user_type + "";
                    return_data.response.user_id = user_id + "";
                    return_data.response.image = deafult_image_path + "";

                    if (user_type == 4) {

                        return_data.response.city = city + "";
                        return_data.response.age = age + "";
                        return_data.response.vehicle_reg = vehicle_reg + "";
                        return_data.response.vehicle_insurance = vehicle_insurance + "";
                        return_data.response.certification = certification + "";
                        return_data.response.license = license + "";


                    }


                    return_data.response.device_token = device_token + "";
                    return_data.response.network_protocol = network_protocol + "";

                    return_data.status = true;
                    return_data.error = null;


                    email_view = await ejs.renderFile('./views/email/signup.ejs'
                    , {

                        title:"Sign up at "+setting.application.name,
                        url:setting.application.web_url,
                        website:setting.application.website,
                        application:setting.application,
                        email:email,
                        email_token:helper.createToken_Verify_Email(user_id)
                     }
                    );
                    
                    email_setting = setting.email;
                    email_setting.subject =  "Sign up at "+setting.application.name;
                    email_setting.to_email =  email;
                    // email_setting.to_email =  "salim.viftech@gmail.com";
                    // email_view =__dirname + 'path_to_template.pug';

                   
                    await notification.send_email(email_setting,email_view).catch();

                } else {

                    return_data.error = "Error while creating user";
                }



            } else {

                return_data.error = "Email is used!";
            }

        } else {

            return_data.error = "Invalid User!";
        }

    }

    res.send(JSON.stringify(return_data));

}