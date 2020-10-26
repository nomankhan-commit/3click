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

//Get start_ride API V1 (for driver role)

exports.report_a_problem = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json')
    let Request_Id = req.body.ride_id;
    let User_Id = req.body.user_id;

    req.checkBody('ride_id', 'Ride Id is required').notEmpty();
    req.checkBody('user_id', 'Rider Id is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // check from DB
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var Accept_Id = 0;
        var Ride_Id = 0;
        var Role_Id = 0;

        await models.Sec_User_Role.findOne({
            where: { User_Id: token_data.user_id },
            plain: true,
            attributes: ['Role_Id'],
            

        }).then(data => {

            if(data != null){

                Role_Id = data.Role_Id;
            }
     

        });

        return_data.status = true;
        return_data.message = "Ride Reported successfully";
        return_data.error = null;

        // if (Role_Id == 2) {

        //     var status = 0;

        //     await models.Rms_Request.findOne({
        //         as: "Rms_Accept",
        //         where: { Is_Active: 1, Requested_By: token_data.user_id, Request_Id: Request_Id, Request_Status_Id: [3,4] },
        //         attributes: ['Accept_Id'],
        //         plain: true,
    
        //     }).then(data => {
    
        //         if (data != null) {
    
        //             status = 1;
        //         }else{
                    
        //             return_data.error = "Ride Id is invalid";

        //         }
        //     }).catch(err => {
        //         return_data.error = err;
        //     });


        // }else if (Role_Id == 4) {
            
            
        // }else{

        //     return_data.error = "Ride Id is invalid";
            
        // }


       




    }


    res.send(JSON.stringify(return_data));

}