var helper = require('../../../helper/helper');
var models = require('../../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};



//Get Ride List API V1 (for customer and driver role)

exports.get_ride_list = async function (req, res) {
    return_data = { status: false, message: "", response: [], error: null };
    res.header('Content-Type', 'application/json');
    let ride_type = req.body.ride_type;

    var Schema = {
        "ride_type": {
            in: 'body',
            matches: {
                options: [/\b(?:schedule|pending|previous)\b/],
                errorMessage: "Ride Type Required!"
            }
        }
    }

    req.check(Schema);
    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var Role_Id = 0;
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";


        await models.User.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id },
            plain: true,
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    attributes: ['Role_Id']
                },
            ]
        }).then(data => {

            Role_Id = data.Sec_User_Role.Role_Id

        }).catch(err => {
            return_data.error = err;
        });

        if (Role_Id == 2) {
            var ride_status = (ride_type == 'schedule') ? 2 : (ride_type == 'pending') ? 1 : (ride_type == 'previous') ? [3,4] : 0;

            if (ride_status != 0) {


                // get amount from table
                await models.Rms_Request.findAll({
                    where: { Is_Active: 1, Requested_By: token_data.user_id, Request_Status_Id: ride_status },
                    attributes: [
                        [Sequelize.fn("concat", ""), "starting"]                        
                        , [Sequelize.fn("concat", "", Sequelize.col('ETA_Amount')), "amount"]
                        , [Sequelize.fn("concat", ""), "moving"]     
                        , [Sequelize.fn("concat", ""), "waiting"]     
                        , [Sequelize.fn("concat", "0.0"), "service_fee"]
                        , [Sequelize.fn("concat", ""), "customer_name"]    
                        , [Sequelize.fn("concat", ""), "customer_number"]    
                        , [Sequelize.fn("concat", ""), "customer_image"]    
                        , [Sequelize.fn("concat", ""), "location_image"]    
                        , [Sequelize.fn("concat", ""), "waiting"]    
                        , ["Requested_Date", "booking_date"]
                        , ["Created_Date", "booking_create_date"]
                        , ["Requested_Expiry", "expire_date_time"]                        
                        , ["From_Location", "pickup_location_name"]                                       
                        , ["From_Latitude", "pickup_lattitude"]                     
                        , ["From_Longitude", "pickup_longitude"]
                        , ["To_Location", "drop_off_location_name"]                     
                        , ["To_Latitude", "drop_off_lattitude"]                     
                        , ["To_Longitude", "drop_off_longitude"]                      
                        , ["Item_Weight", "ton"]              
                       , [ Sequelize.col('Rms_Accept.Accept_Status_Id'), "ride_status_id"]
                        , [Sequelize.fn("concat", "", Sequelize.col('Rms_Request.Request_Id')), "ride_id"]


                    ], include: [
                        {
                            model: models.Rms_Accept, as: "Rms_Accept"
                            , attributes: []
                            , required: false
                        },

                    ],
                    
                    raw: true,
                    // limit: 50,
                    order: [
                        ['Request_Id', 'DESC'],
                    ],
                }).then(data => {

                    if (data != null) {

                        if (data.length != 0) {

                            return_data.status = true;
                            return_data.message = "Susscess";
                            return_data.error = null;
                            return_data.response = data;

                            
        

                        } else {
                            return_data.message = "Record not found";
                            return_data.status = true;
                            return_data.error = null;
                            return_data.response = [];

                        }

                    } else {
                        return_data.message = "Record not found";
                        return_data.status = true;
                        return_data.error = null;
                        return_data.response = [];

                    }


                }).catch(err => {
                    return_data.error = err;
                });

            } else {

                return_data.error = "Invalid Ride Type!";
            }


        } else if (Role_Id == 4) {
            var ride_status = (ride_type == 'schedule') ? [6,7,58] : (ride_type == 'pending') ? 5 : (ride_type == 'previous') ? [8,9] : 0;
            

            if (ride_status != 0) {

                console.log(ride_status);

                // get amount from table
                await models.Rms_Request.findAll({
                    where: { Is_Active: 1 },
                    attributes: [
                      
                        [Sequelize.fn("concat", ""), "starting"]                        
                        , [Sequelize.fn("concat", "", Sequelize.col('ETA_Amount')), "amount"]
                        , [Sequelize.fn("concat", ""), "moving"]     
                        , [Sequelize.fn("concat", ""), "waiting"]     
                        , [Sequelize.fn("concat", "0.0"), "service_fee"]
                        , [Sequelize.fn("concat", ""), "fleet_name"]    
                        , [Sequelize.fn("concat", ""), "fleet_number"]    
                        , [Sequelize.fn("concat", ""), "fleet_image"]    
                        , [Sequelize.fn("concat", ""), "location_image"]    
                        , [Sequelize.fn("concat", ""), "waiting"]    
                        , ["Requested_Date", "booking_date"]
                        , ["Created_Date", "booking_create_date"]
                        , ["Requested_Expiry", "expire_date_time"]                        
                        , ["From_Location", "pickup_location_name"]                                       
                        , ["From_Latitude", "pickup_lattitude"]                     
                        , ["From_Longitude", "pickup_longitude"]
                        , ["To_Location", "drop_off_location_name"]                     
                        , ["To_Latitude", "drop_off_lattitude"]                     
                        , ["To_Longitude", "drop_off_longitude"]                        
                        , ["Item_Weight", "ton"]
                        , [ Sequelize.col('Rms_Accept.Accept_Status_Id'), "ride_status_id"]
                        // , ["Request_Id", "ride_id"]
                        , [Sequelize.fn("concat", "", Sequelize.col('Rms_Request.Request_Id')), "ride_id"]

                    ],
                    include: [
                        {
                            model: models.Rms_Accept, as: "Rms_Accept"
                            , attributes: []
                            , where: { Is_Active: 1, Accepted_By: token_data.user_id, Accept_Status_Id: ride_status }
                            // , required: false
                        },

                    ],
                    raw: true,
                    // limit: 50,
                    order: [
                        ['Request_Id', 'DESC'],
                    ],
                }).then(data => {

                    if (data != null) {
                        

                        if (data.length != 0) {
                            
                        return_data.status = true;
                        return_data.message = "Susscess";
                        return_data.error = null;
                        return_data.response = data;


                        } else {
                            return_data.message = "Record not found";
                            return_data.status = true;
                            return_data.error = null;
                            return_data.response = [];

                        }

                    } else {
                        return_data.message = "Record not found";
                        return_data.status = true;
                        return_data.error = null;
                        return_data.response = [];

                    }


                }).catch(err => {
                    return_data.error = err;
                });

            } else {

                return_data.error = "Invalid Ride Type!";
            }


        } else {

            return_data.error = "Error form server";
        }





    }

    res.send(JSON.stringify(return_data));

}