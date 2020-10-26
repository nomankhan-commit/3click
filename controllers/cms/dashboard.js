var helper = require('../../helper/helper');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
var dropDowns = require('../../controllers/cms/drivers')
const Op = Sequelize.Op;



exports.index = async function (req, res) {
        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        return_data.data_record = {};
        return_data.data_record.data_total_driver = 0;
        return_data.data_record.data_total_cancel_booking = 0;
        return_data.data_record.data_total_earnings = 0;
        return_data.data_record.data_total_booking = 0;
        var User_Parent_Id = "";


        await models.User.findAll({
                where: { Is_Active: [1,2], User_Parent_Id: return_data.session_user_data.User_Id },
                attributes: [
                        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('User_Id')), 'User_Id']

                ],

        }).then(data => {


                if (data != null) {


                        if (data.length != 0) {

                                User_Parent_Id = data[0].User_Id;
                                // return_data.data_record.data_total_driver = data.length;
                        }

                }

        }).catch(err => {
        });

        return_data.data_record.data_total_driver = User_Parent_Id.split(",").length;

        //data_total_booking

        await models.Rms_Request.count({
                where: { Is_Active: 1 },
                attributes: [],
                include: [
                        {
                                model: models.Rms_Accept, as: "Rms_Accept"
                                , attributes: []
                                , where: { Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [8] }
                                // , required: false
                        },


                ],
                raw: true,
                order: [
                        ['Request_Id', 'DESC'],
                ],
        }).then(data => {

                if (data != null) {


                        return_data.data_record.data_total_booking = data;



                } else {


                }


        }).catch(err => {
        });

        User_Parent_Id += "," + return_data.session_user_data.User_Id;


        // data_total_cancel_booking

        await models.Rms_Request.count({
                where: { Is_Active: 1 },
                attributes: [],
                include: [
                        {
                                model: models.Rms_Accept, as: "Rms_Accept"
                                , attributes: []
                                , where: { Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [9] }

                        },

                ],
                raw: true,
                order: [
                        ['Request_Id', 'DESC'],
                ],
        }).then(data => {

                if (data != null) {

                        return_data.data_record.data_total_cancel_booking = data;


                } else {


                }


        }).catch(err => {
        });

        // data_total_earnings


        await models.Rms_Accept.findAll({
                where: { Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [8] },
                attributes: [],

                include: [
                        //  {
                        //        model: models.Rms_Accept, as: "Rms_Accept"
                        //         , attributes: []
                        //         , where: { Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [8] }
                        //  ,include: [
                        {
                                model: models.Rms_Ride, as: "Rms_Ride"
                                //,attributes: []
                                , attributes: [[Sequelize.fn('sum', Sequelize.col('Rms_Ride.Total_Fare')), 'total']],

                                where: { Is_Active: 1, Ride_Status_Id: [12] }
                        },
                        // ]
                        // },
                ],

                raw: true,
                order: [
                        ['Request_Id', 'DESC'],
                ],
        }).then(data => {

                if (data != null) {
                        // console.log(data);

                        if (data[0]["Rms_Ride.total"] == null) {

                                return_data.data_record.data_total_earnings = round(parseFloat(data[0]["Rms_Ride.total"]).toFixed(2));
                        } else {

                                return_data.data_record.data_total_earning = 0;
                        }
                        // return_data.data_record.data_total_earnings =parseInt(data[0]["Rms_Ride.total"]);

                } else {
                }
        }).catch(err => {
        });


        res.render('cms/dashboard', return_data);
}

exports.account = async function (req, res) {
        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;
        return_data.data_record = {};




        res.render('cms/account', return_data);
}

exports.account_post = async function (req, res) {

        return_data = { status: false, message: "", response: {} };

        session_user_data = req.session.user_data;

        res.header('Content-Type', 'application/json');

        // var account_username = req.body.account_username;
        var account_fullname = req.body.account_fullname;
        // var account_Password = req.body.account_Password;
        var account_address = req.body.account_address;
        var account_contactnumber = req.body.account_contactnumber;
        var account_description = req.body.account_description;

        // var account_conform_password = req.body.account_conform_password;

        // var account_country = req.body.account_country;
        // var account_city = req.body.account_city;
        // var account_state = req.body.account_state;


        // var profile_image = req.body.profile_image;



        // req.checkBody('account_username', 'Username must be email and its required').notEmpty();
        req.checkBody('account_fullname', 'Full Name is required').notEmpty();
        // req.checkBody('account_Password', 'Password is required').notEmpty();
        req.checkBody('account_address', 'Address is required').notEmpty();
        req.checkBody('account_contactnumber', 'Contact number is required').notEmpty();
        req.checkBody('account_description', 'Description is required').notEmpty();

        //req.checkBody('account_conform_password', "Conform Password  required").isEmpty();

        // req.checkBody('account_country', 'account country is required').isEmpty();
        // req.checkBody('account_city', 'account city must be  required').isEmpty();
        // req.checkBody('account_state', 'account state is required').isEmpty();

        //  req.checkBody('profile_image', 'profile image is required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
                return_data.message = '';
                for (i = 0; i < errors.length; i++) {

                        return_data.message += errors[i].msg + "<br/>";
                }
        } else {

                var profile_image = "";
                if (typeof req.files !== 'undefined') {

                        
                if (req.files['profile_image'].length != 0) {

                        // console.log(req.files['drivers_profile'][0]);

                        var fs = require("fs").promises;

                        // var file = req.files['profile_image'][0].originalname;

                        var file = helper.Filename_For_Uplaod(req.files['profile_image'][0].originalname);

                        // file = helper.Application_Setting_Profile_Image_Path() + "/" + path.basename(file,helper.Filename_Extension(file)) +'_'+Date.now()+helper.Filename_Extension(file);


                        var image_data = null;

                        image_data = await fs.readFile(req.files['profile_image'][0].path);
                        //   console.log(image_data);


                        await fs.writeFile(file, image_data);

                        await fs.unlink(req.files['profile_image'][0].path);

                        profile_image = setting.application.web_url + '/' + file.replace("public/", "");


                }

                }
                if(profile_image != ""){

                        await models.User_Document.update({
                                Document_Detail: profile_image,
                                Modified_By: session_user_data.User_Id,
                                Modified_Date: new Date(),
                                Is_Active: 1
                        }, {
                                where: {
                                      User_Id: session_user_data.User_Id,
                                      Document_Type: 'profile_image'
                                }
                        });
            
                }


                //First_Name 
                //User_Address

                await models.User_Profile.update({
                        First_Name: account_fullname,
                        User_Address: account_address,
                        Modified_By: session_user_data.User_Id,
                        Modified_Date: new Date()
                }, {
                                where: {
                                        User_Id: session_user_data.User_Id
                                }
                        });

                // User_Contact

                var User_Contact = null;

                await models.User_Contact.findOne({
                        where: {
                                User_Id: session_user_data.User_Id,
                                Contact_Type: "mobile",
                                Is_Primary: 1
                        },
                        plain: true,
                }).then(data => {

                        // console.log(data);
                        User_Contact = data;

                });


                if (User_Contact != null) {


                        await models.User_Contact.update({
                                User_Contact_Value1: account_contactnumber,
                                Modified_By: session_user_data.User_Id,
                                Modified_Date: new Date()
                        }, {
                                        where: {
                                                User_Id: session_user_data.User_Id,
                                                Contact_Type: "mobile",
                                                Is_Primary: 1

                                        }
                                });

                } else {
                        await models.User_Contact.create(
                                {
                                        Contact_Type: "mobile",
                                        User_Id: session_user_data.User_Id,
                                        Is_Primary: 1,
                                        User_Contact_Value1: account_contactnumber,
                                        User_Contact_Value2: '',
                                        Created_By: session_user_data.User_Id,
                                        Created_Date: new Date(),
                                        Is_Active: 1
                                }
                        ).catch(err => {

                                //  console.log(err);

                        });

                }

                //User_Description

                var User_Description = null;

                await models.User_Custom_Info.findOne({
                        where: {
                                User_Id: session_user_data.User_Id,
                                Is_Active: 1,
                                Field_Id: 7
                        },
                        plain: true,
                }).then(data => {

                        // console.log(data);
                        User_Description = data;

                });

                if (User_Description != null) {


                        await models.User_Custom_Info.update({
                                Field_Value: account_description,
                                Modified_By: session_user_data.User_Id,
                                Modified_Date: new Date()
                        }, {
                                        where: {
                                                User_Id: session_user_data.User_Id,
                                                Is_Active: 1,
                                                Field_Id: 7

                                        }
                                });

                } else {
                        await models.User_Custom_Info.create(
                                {
                                        User_Id: session_user_data.User_Id,
                                        Field_Id: 7,
                                        Field_Value: account_description,
                                        Created_By: session_user_data.User_Id,
                                        Created_Date: new Date(),
                                        Is_Active: 1
                                }
                        ).catch(err => {

                                //  console.log(err);

                        });

                }


                if(profile_image != ""){
                        session_user_data.Profile_Image = profile_image;
                }
                session_user_data.First_Name = account_fullname;
                session_user_data.User_Contact = account_contactnumber;
                session_user_data.User_Address = account_address;
                session_user_data.User_Description = account_description;
                req.session.user_data = session_user_data;

                return_data.status = true;
                return_data.message = "Account Update Successfully";

        }
        res.send(JSON.stringify(return_data));
}

exports.change_password = function (req, res) {
        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        res.render('cms/change_password', return_data);
}

exports.change_password_post = async function (req, res) {

        return_data = { status: false, message: "", response: {} };

        // return_data.session_user_data = req.session.user_data;

        res.header('Content-Type', 'application/json');

        var Current_Password = req.body.Current_Password;
        var New_Password = req.body.New_Password;
        var Conform_Password = req.body.Conform_Password;

        req.checkBody('Current_Password', 'New Password required').notEmpty();
        req.checkBody('New_Password', 'Current Password  required').notEmpty();
        req.checkBody('Conform_Password', 'Confrom Password  required').notEmpty();

        req.assert('New_Password', 'Passwords do not match').equals(req.body.Conform_Password);

        var errors = req.validationErrors();
        if (errors) {
                return_data.message = '';
                for (i = 0; i < errors.length; i++) {

                        return_data.message += errors[i].msg + "<br/>";
                }

        } else {


                var User_Id = 0;
                await models.User.findAll({
                        where: { User_Name: req.session.user_data.User_Name, Is_Active: 1 },
                        attributes: ['User_Id', 'Password'],
                        plain: true,
                        include: [
                                {
                                        model: models.Sec_User_Role,
                                        as: "Sec_User_Role",
                                        where: { Role_Id: [1, 3] },
                                        attributes: []
                                },
                                {
                                        model: models.User_Profile,
                                        as: "User_Profile",
                                        attributes: []
                                },

                        ]

                }).then(data => {



                        if (data != null) {

                                if (data.length != 0) {

                                        if (helper.Verify_Password(data.Password, Current_Password)) {

                                                User_Id = data.User_Id;

                                        }

                                }
                        }
                });


                if (User_Id != 0) {

                        await models.User.update({
                                Password: helper.Generate_Password(New_Password),
                                Modified_By: req.session.user_data.User_Id,
                                Modified_Date: new Date()
                        }, {
                                        where: {
                                                User_Id: User_Id
                                        }
                                });


                        return_data.status = true;
                        return_data.message = "Password Change Successfully";

                } else {
                        return_data.message = "Wrong Current Password";

                }



        }
        res.send(JSON.stringify(return_data));
}
