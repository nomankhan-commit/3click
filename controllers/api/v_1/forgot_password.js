var helper = require('../../../helper/helper');
var notification = require('../../../helper/notification');
var setting = require('../../../config/setting');
var models = require('../../../models');
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


// Forgot Password API - V1 (for customer and driver role)

exports.forgot_password = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    let email = req.body.email;
    req.checkBody('email', 'Email is required').notEmpty().isEmail();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        var db_restult = [];

        await models.User.findAll({
            where: { User_Name: email, Is_Active: 1 },
            attributes: ['User_Id'],
            raw: true,
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    where: { Role_Id: [2, 4] },
                    attributes: ['Role_Id']
                },

            ]

        }).then(data => {
            db_restult = data;


        }).catch(err => {
            return_data.error = err;
        });

        if (db_restult != null) {

            if (db_restult.length != 0) {

                // Send Email

                var email = db_restult.email;

                email_view = await ejs.renderFile('./views/email/forget_password.ejs'
                    , {

                        title: "Forgot Password at " + setting.application.name,
                        url: setting.application.web_url,
                        website: setting.application.website,
                        application: setting.application,
                        email: email,
                        email_token: helper.createToken_Forget_Password(db_restult.User_Id)
                    }
                );


                email_setting = setting.email;
                email_setting.subject = "Forgot Password at " + setting.application.name;
                email_setting.to_email = email;
                // email_setting.to_email =  "salim.viftech@gmail.com";
                // email_view =__dirname + 'path_to_template.pug';
                await notification.send_email(email_setting, email_view).catch();

                return_data.status = true;
                return_data.message = "Susscess";
                return_data.response.message = "Password sent successfully ";
                return_data.error = null;
            } else {

                return_data.status = true;
                return_data.error = "Wrong Email";
            }
        } else {
            return_data.status = true;
            return_data.error = "Wrong Email";
        }



    }

    res.send(JSON.stringify(return_data));
}
