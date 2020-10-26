
var helper = require('../../helper/helper');
var notification = require('../../helper/notification');
var models = require('../../models');
var setting = require('../../config/setting');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const ejs = require('ejs');

var return_data = helper.Cms_Default_Return_Data();


exports.index = function (req, res) {

        return_data = helper.Cms_Default_Return_Data();

        sess = req.session;
        if (sess.user_data) {

                res.status(200).redirect('/cms/dashboard')
        } else {

                return_data.cms_sidebar = false;
                return_data.cms_top_nav = false;
                return_data.cms_footer = false;
                return_data.cms_class = "body-bg-full profile-page";

                res.render('cms/forget-password', return_data);


        }

}


exports.index_post = async function (req, res) {
        
                return_data = { status: false, message: "", response: {} };
        
                res.header('Content-Type', 'application/json');
        
                var FGP_User_Name = req.body.FGP_User_Name;
        
                req.checkBody('FGP_User_Name', 'Username Is Required').notEmpty();
        
                var errors = req.validationErrors();
                if (errors) {
                        return_data.message = "Email OR Password Is Required";
                        //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";
        
                }
                else {
        
        
                        var db_restult = [];
                        await models.User.findAll({
                                where: { User_Name: FGP_User_Name, Is_Active: 1 },
                                attributes: ['Email','User_Name','User_Id'],
                                plain: true,
                                include: [
                                        {
                                                model: models.Sec_User_Role,
                                                as: "Sec_User_Role",
                                                where: { Role_Id: [1, 3] },
                                                attributes: ['Role_Id']
                                        },
                                       
                                        {
                                                model: models.User_Profile,
                                                as: "User_Profile",
                                                attributes: ['First_Name','User_Address']
                                        },
                                       
                                       
                                ]
        
                        }).then(data => {
        
        
        
                                if (data != null) {
        
                                        // console.log(data);
        
                                       
                                        if (data.length != 0) {
                                                db_restult = data;
                                                return_data.status = true;
                                                return_data.message = "we have sent a link on your registered email.";
        
        
                                        } else {
        
                                                return_data.message = "Wrong Username OR Email";
                                        }
                                } else {
        
                                        return_data.message = "Wrong Username OR Email";
                                }
                        });

                       
                        if (db_restult.length != 0) {

                               var email = db_restult.User_Name;

                                email_view = await ejs.renderFile('./views/email/forget_password.ejs'
                                , {
            
                                    title:"Forgot Password at "+setting.application.name,
                                    url:setting.application.web_url,
                                    website:setting.application.website,
                                    application:setting.application,
                                    email:email,
                                    email_token:helper.createToken_Forget_Password(db_restult.User_Id)
                                 }
                                );

                                
                                email_setting = setting.email;
                                email_setting.subject =  "Forgot Password at "+setting.application.name;
                                email_setting.to_email =  email;
                                // email_setting.to_email =  "salim.viftech@gmail.com";
                                // email_view =__dirname + 'path_to_template.pug';
                                await notification.send_email(email_setting,email_view).catch();


                        }
                }
        
        
                res.send(JSON.stringify(return_data));
        }
        
        

