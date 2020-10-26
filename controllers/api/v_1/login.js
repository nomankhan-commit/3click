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


// Login API - V1 (for customer and driver role)

exports.login = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');
    let device_token = req.body.device_token;
    let network_protocol = req.body.network_protocol;
    req.checkBody('device_token', 'Device Token is required').notEmpty();
    req.checkBody('network_protocol', 'Network Protocol is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        var User_Device_Id = null;

        await models.User.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id },
            plain: true,
            attributes: ['Email', 'User_Id', 'User_Parent_Id'],
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    attributes: ['Role_Id']
                },
                {
                    model: models.User_Document, as: "User_Document"
                    , attributes: ['Document_Detail']
                    , where: { Document_Type: "profile_image", Is_Active: 1 }
                    , required: false
                },
                {
                    model: models.User_Profile, as: "User_Profile"
                    , attributes: ['First_Name', 'Last_Name']
                },
                {
                    model: models.User_Contact, as: "User_Contact"
                    , attributes: ['User_Contact_Value1']
                    , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                    , required: false
                },
                {
                    model: models.User_Custom_Info, as: "User_Device_Id"
                    , attributes: ['Field_Value']
                    , where: { Field_Id: 8, Is_Active: 1 }
                    , required: false
                },
            ]

        }).then(data => {


            return_data.error = null;
            return_data.status = true;
            return_data.message = "Susscess";
            return_data.response.user_id = data.User_Id + "";

            if (data.User_Profile != null) {
                return_data.response.name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;
            } else {
                return_data.response.name = "";
            }


            return_data.response.email = data.Email;

            if (data.User_Contact.length != 0) {

                return_data.response.mobile_number = data.User_Contact[0].User_Contact_Value1;
            } else {
                return_data.response.mobile_number = "";
            }



            if (data.User_Document.length != 0) {
                return_data.response.image = data.User_Document[0].Document_Detail;
            } else {
                return_data.response.image = "";
            }



            return_data.response.user_type = data.Sec_User_Role.Role_Id + "";

            if (data.Sec_User_Role.Role_Id == 4) {

                return_data.response.user_sub_type = (data.User_Parent_Id == 0) ? 0 : 1;

                return_data.response.user_sub_type = return_data.response.user_sub_type + "";
            }

            if (data.User_Device_Id.Field_Value != "") {

                User_Device_Id = data.User_Device_Id.Field_Value;
                // console.log("asa");

            }


        }).catch(err => {
            return_data.error = err;
        });

        if (return_data.status == true) {

            if (User_Device_Id != null) {


                await models.User_Custom_Info.update({
                    Field_Value: device_token,
                    Modified_By: token_data.user_id,
                    Modified_Date: new Date()
                }, {
                        where: {
                            User_Id: token_data.user_id,
                            Is_Active: 1,
                            Field_Id: 8

                        }
                    });

            } else {
                await models.User_Custom_Info.create(
                    {
                        User_Id: token_data.user_id,
                        Field_Id: 8,
                        Field_Value: device_token,
                        Created_By: token_data.user_id,
                        Created_Date: new Date(),
                        Is_Active: 1
                    }
                ).catch(err => {



                });

            }
        }

        return_data.response.Is_Card_Added = false;
        return_data.response.Card_Id ="";

        await models.User_Custom_Info.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 9 },
            plain: true,
            attributes: ['Field_Value'],

        }).then(data => {

            if (data != null) {

                if(data.Field_Value != "0"){
                    return_data.response.Is_Card_Added = true;
                }                
                return_data.response.Card_Id = data.Field_Value;
            }


        }).catch(err => {
            //return_data.error = err;
        });

        return_data.response.Card_Number = "";
        await models.User_Custom_Info.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 10 },
            plain: true,
            attributes: ['Field_Value'],

        }).then(data => {

            if (data != null) {
                            
                return_data.response.Card_Number = data.Field_Value;
            }


        }).catch(err => {
            //return_data.error = err;
        });

    }

    res.send(JSON.stringify(return_data));

}
