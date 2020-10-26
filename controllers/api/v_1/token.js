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


// Token API - V1 (for customer and driver role)

exports.token = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    let email = req.body.email;
    let user_type = req.body.user_type;
    let password = req.body.password;
    let device_token = req.body.device_token;
    let network_protocol = req.body.network_protocol;

    req.checkBody('email', 'Email is required').notEmpty().isEmail();
    req.checkBody('user_type', 'User Type is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('device_token', 'Device Token is required').notEmpty();
    req.checkBody('network_protocol', 'Network Protocol is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        // check from DB
        // only customer and rider db check

        var db_restult = [];
        await models.User.findAll({
            where: { User_Name: email, Is_Active: 1 },
            attributes: ['User_Id', 'Password'],
            plain: true,
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    where: { Role_Id: [2, 4] },
                    attributes: ['Role_Id']
                },
                {
                    model: models.User_Profile,
                    as: "User_Profile",
                    attributes: ['Is_Verify']
                },

            ]

        }).then(data => {
            db_restult = data;

        });

        if (db_restult != null) {

            if (db_restult.length != 0) {


                if (helper.Verify_Password(db_restult.Password, password)) {

                    // console.log(db_restult);

                    if (user_type == db_restult.Sec_User_Role.Role_Id) {

                        if (1 == db_restult.User_Profile.Is_Verify) {

                            return_data.status = true;
                            return_data.error = null;
                            return_data.message = "Susscess";
                            //   return_data.response.token = db_restult; 

                            return_data.response.token = helper.createToken(db_restult.User_Id);
                            //exports.Generate_Password("salim123");

                        } else {


                            email_view = await ejs.renderFile('./views/email/signup.ejs'
                                , {

                                    title: "Verify your email for " + setting.application.name,
                                    url: setting.application.web_url,
                                    website: setting.application.website,
                                    application: setting.application,
                                    email: email,
                                    email_token: helper.createToken_Verify_Email(db_restult.User_Id)
                                }
                            );

                            email_setting = setting.email;
                            email_setting.subject = "Verify your email for " + setting.application.name;
                            email_setting.to_email = email;
                           
                            await notification.send_email(email_setting, email_view).catch();

                            return_data.error = "Please verify your email";
                        }
                    } else {

                        return_data.error = "Wrong Password";
                    }


                } else {

                    return_data.error = "Wrong Email OR Password";
                }
            } else {

                return_data.error = "Wrong Email OR Password";
            }


        }


        res.send(JSON.stringify(return_data));
    }
}
