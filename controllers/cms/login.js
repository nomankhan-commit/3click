
var helper = require('../../helper/helper');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

                res.render('cms/login', return_data);


        }


}


exports.index_post = async function (req, res) {

        return_data = { status: false, message: "", response: {} };

        res.header('Content-Type', 'application/json');

        var Login_User_Name = req.body.Login_User_Name;
        var Login_Password = req.body.Login_Password;

        req.checkBody('Login_User_Name', 'Username Is Required').notEmpty();
        req.checkBody('Login_Password', 'Password Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
                return_data.message = "Email OR Password Is Required";
                //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

        }
        else {


                var db_restult = [];
                await models.User.findAll({
                        where: { User_Name: Login_User_Name, Is_Active: 1 },
                        attributes: ['User_Id', 'User_Name', 'Password', 'Is_Active'],
                        plain: true,
                        include: [
                                {
                                        model: models.Sec_User_Role,
                                        as: "Sec_User_Role",
                                        where: { Role_Id: [1, 3] },
                                        attributes: ['Role_Id']
                                },
                                {
                                        model: models.User_Contact, as: "User_Contact"
                                        , attributes: ['User_Contact_Value1']
                                        , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                                        , required: false
                                },
                                {
                                        model: models.User_Profile,
                                        as: "User_Profile",
                                        attributes: ['First_Name','User_Address']
                                },
                                {
                                        model: models.User_Document, as: "profile_image"
                                        , attributes: ['Document_Detail']
                                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                                        , required: false
                                },
                                {
                                        model: models.User_Custom_Info, as: "User_Description"
                                        , attributes: ['Field_Value']
                                        , where: { Is_Active: 1, Field_Id: 7 }
                                        , required: false
                                }

                        ]

                }).then(data => {



                        if (data != null) {

                                // console.log(data);

                                if (data.length != 0) {

                                        if (helper.Verify_Password(data.Password, Login_Password)) {
                                               var user_data = {
                                                        User_Id: data.User_Id,
                                                        User_Name: data.User_Name,
                                                        Is_Active: data.Is_Active,
                                                        First_Name: data.User_Profile.First_Name,
                                                        User_Address: data.User_Profile.User_Address,                                                     
                                                        Profile_Image: data.profile_image.Document_Detail,
                                                        User_Description: '',
                                                        User_Contact:''
                                                }
                                                
                                                console.log(data.User_Description);        

                                                if(data.User_Description != null){
                                                      user_data.User_Description =  data.User_Description.Field_Value
                                                                
                                                }

                                                if (data.User_Contact.length != 0) {
                                                        user_data.User_Contact = data.User_Contact[0].User_Contact_Value1;
                                        
                                                } 

                                                

                                                req.session.user_data = user_data;
                                                return_data.status = true;
                                                return_data.message = "Login Successfully";

                                        } else {

                                                return_data.message = "Wrong Email OR Password";
                                        }


                                } else {

                                        return_data.message = "Wrong Email OR Password";
                                }
                        } else {

                                return_data.message = "Wrong Email OR Password";
                        }
                });
        }


        res.send(JSON.stringify(return_data));
}


exports.logout = function (req, res) {

        // sess = req.session;
        if (req.session.user_data) {

                req.session.destroy()

        }
        res.status(200).redirect('/cms/login')



}


