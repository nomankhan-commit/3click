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



// Get Profile  API - V1 (for customer and driver role)

exports.get_profile = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {
        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";
        var user_record_data = null;

        await models.User.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id },
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
            ]
        }).then(data => {


            user_record_data = data;

        }).catch(err => {
            return_data.error = err;
        });

        if (user_record_data != null) {


            return_data.status = true;
            return_data.message = "Susscess";
            return_data.error = null;
            return_data.response.user_id = user_record_data.User_Id + "";
            if (user_record_data.User_Profile != null) {
                return_data.response.name = user_record_data.User_Profile.First_Name + " " + user_record_data.User_Profile.Last_Name;
                //  return_data.response.name = user_record_data.User_Profile.First_Name;

            } else {
                return_data.response.name = "";
            }

            return_data.response.email = user_record_data.Email;
            return_data.response.user_type = user_record_data.Sec_User_Role.Role_Id + "";

            if (user_record_data.User_Contact.length != 0) {
                return_data.response.mobile_number = user_record_data.User_Contact[0].User_Contact_Value1;

            } else {
                return_data.response.mobile_number = "";
            }

            
            if (user_record_data.User_Document.length != 0) {
                return_data.response.image = user_record_data.User_Document[0].Document_Detail;
            } else {
                return_data.response.image = "";
            }

            if (user_record_data.Sec_User_Role.Role_Id == 4) {

                return_data.response.rating = "0";
                return_data.response.city = "-";
                return_data.response.age = "-";
                return_data.response.vehicle_reg = "-";
                return_data.response.vehicle_insurance = "-";
                return_data.response.certification = "-";
                return_data.response.license = "-";


                //city

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 1 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.city = data.Field_Value;

                }).catch(err => {
                    //return_data.error = err;
                });

                //age

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 2 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.age = data.Field_Value;

                }).catch(err => {
                    // return_data.error = err;
                });

                //vehicle_reg

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 3 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.vehicle_reg = data.Field_Value;

                }).catch(err => {
                    // return_data.error = err;
                });

                //vehicle_insurance

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 4 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.vehicle_insurance = data.Field_Value;

                }).catch(err => {
                    // return_data.error = err;
                });


                //certification

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 5 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.certification = data.Field_Value;

                }).catch(err => {
                    // return_data.error = err;
                });

                //license

                await models.User_Custom_Info.findOne({
                    where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 6 },
                    plain: true,
                    attributes: ['Field_Value'],

                }).then(data => {

                    return_data.response.license = data.Field_Value;

                }).catch(err => {
                    // return_data.error = err;
                });


            }


        } else {

            return_data.error = "Record Not Found";
        }


    }


    res.send(JSON.stringify(return_data));

}