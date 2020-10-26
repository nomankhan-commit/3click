var helper = require('../../../helper/helper');
var models = require('../../../models');
var notification = require('../../../helper/notification');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var notification = require('../../../helper/notification');

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};

//Get get_rider_device_token API V1 (for customer role)

exports.get_rider_device_token = async function (req, res) {

    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let request_id = req.body.ride_id;
    req.checkBody('ride_id', 'ride id is required').notEmpty();
    

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // check from DB
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var Accepted_By = 0;

        await models.Rms_Accept.findOne({
            as: "Rms_Accept",
            where: { Is_Active: 1, Request_Id: request_id },
            attributes: ['Accept_Id','Accepted_By'],
            include: [
                {
                    model: models.Rms_Request,
                    as: "Rms_Request",
                    attributes: [],
                    where: { Is_Active: 1, Requested_By: token_data.user_id, Request_Id: request_id },
                    required:true
                }
            ],
            plain: true,

        }).then(data => {

            if (data != null) {

                Accepted_By = data.Accepted_By;

            }
        }).catch(err => {
            return_data.error = err;
        });

        if (Accepted_By != 0) {


            await models.User_Custom_Info.findOne({
                // as: "User_Custom_Info",
                where: { Is_Active: 1, User_Id: Accepted_By ,Field_Id:8},
                attributes: ['Field_Value'],
                plain: true,
    
            }).then(data => {

                console.log(data.Field_Value);
    
                if(data != null){

                    console.log("sa");
    
                    return_data.response.device_token = data.Field_Value;
                    return_data.status = true;
                    return_data.message = "Susscess";
                    return_data.error = null;
    
                }
            }).catch(err => {
                return_data.error = err;
            });


        } else {

            return_data.error = "Ride id is invalid";
        }

    }


    res.send(JSON.stringify(return_data));

}