var helper = require('../../helper/helper');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
var fileUpload = require('express-fileupload');


exports.list = async function (req, res) {

        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        return_data.data_record = [];

        // Driver
        await models.User.findAll({
                where: { Is_Active: [1, 2], User_Parent_Id: return_data.session_user_data.User_Id },
                raw: true,
                include: [
                        {
                                model: models.User_Contact, as: "User_Contact"
                                , attributes: ['User_Contact_Value1']
                                , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                                , required: false
                        },
                        {
                                model: models.User_Profile, as: "User_Profile"
                                , attributes: ['First_Name', 'Last_Name', 'User_Address']
                        },
                        {
                                model: models.Sec_User_Role,
                                as: "Sec_User_Role",
                                attributes: ['Role_Id']
                                , where: { Role_Id: 4 }
                                , required: true
                                // , required: false

                        },
                        {
                                model: models.User_Document, as: "profile_image"
                                , attributes: ['Document_Detail']
                                , where: { Is_Active: 1, Document_Type: "profile_image" }
                                , required: false
                        }
                ], order: [
                        ['User_Id', 'DESC'],
                ],
        }).then(data => {

                // console.log(data);

                if (data != null) {


                        if (data.length != 0) {

                                return_data.data_record = data;

                        } else {


                        }

                } else {


                }


        }).catch(err => {
        });

        //  res.send(return_data.data_record);
        res.render('cms/module/drivers/list', return_data);

}

exports.add_edit = async function (req, res) {
        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        return_data.data_record = {};
        return_data.data_record.record_id = 0;
        return_data.data_record.sys_country = [];
        return_data.data_record.sys_city = [];
        return_data.data_record.sys_state = [];
        return_data.data_record.record = null;



        if (req.params.record_id == null) {

                // Sys_Country

                await models.Sys_Country.findAll({
                        where: { Is_Active: 1 },
                        attributes: [
                                "Country_Id"
                                , "Country_Name"
                        ],
                        raw: true,
                        order: [
                                ['Country_Name', 'ASC'],
                        ],
                }).then(data => {
                        // console.log(data);
                        if (data != null) {
                                if (data.length != 0) {
                                        return_data.data_record.sys_country = data;

                                } else {


                                }

                        } else {


                        }


                }).catch(err => {
                });

                // sys state

                await models.Sys_State.findAll({
                        where: { Is_Active: 1 },
                        attributes: [
                                "State_Id"
                                , "State_Name"
                        ],
                        raw: true,
                        order: [
                                ['State_Name', 'ASC'],
                        ],
                }).then(data => {

                        // console.log(data);
                        if (data != null) {


                                if (data.length != 0) {


                                        return_data.data_record.sys_state = data;

                                } else {


                                }

                        } else {


                        }


                }).catch(err => {
                });

                ////sys city

                await models.Sys_City.findAll({
                        where: { Is_Active: 1, State_Id: return_data.data_record.sys_state[0].State_Id },
                        attributes: [
                                "City_Id"
                                , "City_Name"
                        ],
                        raw: true,
                        order: [
                                ['City_Name', 'ASC'],
                        ],
                }).then(data => {

                        // console.log(data);
                        if (data != null) {


                                if (data.length != 0) {



                                        return_data.data_record.sys_city = data;

                                } else {


                                }

                        } else {


                        }


                }).catch(err => {
                });


                return_data.data_record.record_id = 0;
                // console.log('add');

        } else {
                //  console.log('edit');

                await models.User.findOne({
                        where: { Is_Active: [1, 2], User_Parent_Id: return_data.session_user_data.User_Id, User_Id: req.params.record_id },
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
                                        , attributes: ['First_Name', 'Last_Name', 'User_Address']
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


                        if (data != null) {

                                return_data.data_record.record = data;

                        }


                }).catch(err => {
                        return_data.error = err;
                });

                // console.log(return_data.data_record.record.User_Document);

                return_data.data_record.record_id = req.params.record_id;



        }

        // console.log(return_data.data_record.record_id);

        if (return_data.data_record.record_id != 0 && return_data.data_record.record == null) {

                // res.send({'a':return_data.data_record.record_id,'b':return_data.data_record.record});

                res.status(200).redirect('/cms/404')
        } else {

                res.render('cms/module/drivers/add', return_data);
        }



}

exports.add_edit_post = async function (req, res) {


        return_data = { status: false, message: "Error From Server!", response: {} };

        // return_data.session_user_data = req.session.user_data;

        res.header('Content-Type', 'application/json');

        var drivers_username = "";
        var drivers_fullname = req.body.drivers_fullname;
        var drivers_address = req.body.drivers_address;
        var drivers_contact_number = req.body.drivers_contact_number;
        var drivers_vehicle_reg = req.body.drivers_vehicle_reg;
        var drivers_certification = req.body.drivers_certification;
        var drivers_license = req.body.drivers_license;
        var drivers_vehicle_insurance = req.body.drivers_vehicle_insurance;
        var drivers_status = req.body.drivers_status;
        var drivers_age = req.body.drivers_age;




        req.checkBody('drivers_fullname', 'Name is required').notEmpty();
        req.checkBody('drivers_address', 'Address is required').notEmpty();
        req.checkBody('drivers_contact_number', 'Contact Number  is required').notEmpty();
        // req.checkBody('drivers_vehicle_reg', 'Vehicle Reg Number  is required').notEmpty();
        // req.checkBody('drivers_certification', 'Certification is required').notEmpty();
        // req.checkBody('drivers_license', 'License Number is required').notEmpty();
        // req.checkBody('drivers_vehicle_insurance', 'insurance is required').notEmpty();
        // req.checkBody('drivers_age', 'Age  is required').notEmpty();

        if (req.params.record_id == null) {

                drivers_username = req.body.drivers_username;

                req.checkBody('drivers_username', 'Username must be email and its required').notEmpty().isEmail();

                req.checkBody('drivers_password', 'Password is required').notEmpty();
                req.checkBody('drivers_conform_password', 'Conform Password is required').notEmpty();
                req.assert('drivers_password', 'Passwords do not match').equals(req.body.drivers_conform_password);
                req.checkBody('drivers_city', 'City Name is required').notEmpty();
                req.checkBody('drivers_state', 'State Name is required').notEmpty();
                req.checkBody('drivers_country', 'Country Name is required').notEmpty();

                var drivers_password = req.body.drivers_password;
                var drivers_conform_password = req.body.drivers_conform_password;
                var drivers_country = req.body.drivers_country;
                var drivers_state = req.body.drivers_state;
                var drivers_city = req.body.drivers_city;


        }

        var Schema = {
                "drivers_status": {
                        in: 'body',
                        matches: {
                                options: [/\b(?:1|2)\b/],
                                errorMessage: "Status is required!"
                        }
                }
        }

        req.check(Schema);

        var errors = req.validationErrors();


        if (errors) {
                return_data.message = '';
                for (i = 0; i < errors.length; i++) {

                        return_data.message += errors[i].msg + "<br/>";
                }
        } else {

                if (req.params.record_id == null) {

                        var db_restult = [];

                        await models.User.findAll({
                                where: { User_Name: drivers_username, Is_Active: [1, 2] },
                                attributes: ['User_Id'],
                                raw: true,
                        }).then(data => {
                                db_restult = data;

                        });

                        if (db_restult.length == 0) {






                                var user_id = 0;
                                var deafult_image_path = helper.Application_Setting_Default_Iamge();

                                var image_status = false;


                                if (req.files['drivers_profile'].length != 0) {

                                        // console.log(req.files['drivers_profile'][0]);

                                        var fs = require("fs").promises;

                                        // var file = helper.Application_Setting_Profile_Image_Path()+"/" + req.files['drivers_profile'][0].originalname;
                                        var file = helper.Filename_For_Uplaod(req.files['drivers_profile'][0].originalname);


                                        var image_data = null;

                                        image_data = await fs.readFile(req.files['drivers_profile'][0].path);
                                        //   console.log(image_data);


                                        await fs.writeFile(file, image_data);

                                        await fs.unlink(req.files['drivers_profile'][0].path);

                                        deafult_image_path = setting.application.web_url + '/' + file.replace("public/", "");
                                        image_status = true;

                                        //       if( err ){
                                        //         //  console.log(err);
                                        //              image_status = false;
                                        //          }else{

                                        //           console.log('ss');
                                        //           deafult_image_path = setting.application.web_url+'/'+file;
                                        //           image_status = true;
                                        //          }

                                        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                                        // let drivers_profile = req.files['drivers_profile'];

                                        // // Use the mv() method to place the file somewhere on your server
                                        // drivers_profile.destination('/public/assets/cms/images/profile/'+drivers_profile.name, function (err) {
                                        //         if (err) {

                                        //         } else {

                                        //                 image_status = true;
                                        //         }

                                        // });



                                }

                                // console.log(req.files['drivers_profile'].length);

                                //  console.log(image_status);
                                // return;

                                if (image_status) {

                                        return_data.status = true;
                                        return_data.message = "Dirver Created Successfully";




                                        // Add User

                                        await models.User.create(
                                                {
                                                        User_Name: drivers_username,
                                                        Email: drivers_username,
                                                        Password: helper.Generate_Password(drivers_password),
                                                        Signup_Date: new Date(),
                                                        Created_By: 0,
                                                        Created_Date: new Date(),
                                                        Is_Active: drivers_status,
                                                        User_Parent_Id: req.session.user_data.User_Id

                                                }
                                        ).then(data => {

                                                user_id = data.User_Id;

                                        }).catch(err => {
                                                return_data.message = err;
                                        });




                                        if (user_id != 0) {

                                                console.log(deafult_image_path);

                                                //add full name
                                                await models.User_Profile.create(
                                                        {

                                                                User_Id: user_id,
                                                                First_Name: drivers_fullname,
                                                                Last_Name: "",
                                                                User_Title: "",
                                                                User_Address: drivers_address,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1

                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                await models.User_Contact.create(
                                                        {
                                                                Contact_Type: "mobile",
                                                                User_Id: user_id,
                                                                Is_Primary: 1,
                                                                User_Contact_Value1: drivers_contact_number,
                                                                User_Contact_Value2: '',
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.error = err;
                                                });

                                                //add image
                                                await models.User_Document.create(
                                                        {
                                                                User_Id: user_id,
                                                                Document_Type: "profile_image",
                                                                Document_Detail: deafult_image_path,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                //add user role
                                                await models.Sec_User_Role.create(
                                                        {
                                                                User_Id: user_id,
                                                                Role_Id: 4,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                //add city
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 1,
                                                                Field_Value: drivers_city,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                //add age
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 2,
                                                                Field_Value: drivers_age,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                //add vehicle reg
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 3,
                                                                Field_Value: drivers_vehicle_reg,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                // add vehicle insurance
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 4,
                                                                Field_Value: drivers_vehicle_insurance,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                // add certification
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 5,
                                                                Field_Value: drivers_certification,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                                // add license
                                                await models.User_Custom_Info.create(
                                                        {
                                                                User_Id: user_id,
                                                                Field_Id: 6,
                                                                Field_Value: drivers_license,
                                                                Created_By: user_id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        return_data.message = err;
                                                });

                                        }


                                } else {

                                        return_data.status = false;
                                        return_data.message = "Error while uploading driver profile image";

                                }

                        } else {

                                return_data.message = "Email is used!";


                        }
                        //console.log(errors)
                        //return_data.message = errors;
                } else {


                        var data_record = [];

                        var status_update = true;

                        await models.Rms_Accept.findAll({
                                where: { Is_Active: 1, Accepted_By: return_data.response.User_Id, Accept_Status_Id: [5, 6, 7] },
                                attributes: ['Request_Id'],
                                raw: true,
                                // limit: 50,
                                order: [
                                        ['Request_Id', 'DESC'],
                                ],
                        }).then(data => {

                                console.log(data);

                                if (data != null) {


                                        if (data.length != 0) {

                                                data_record = data;

                                        }

                                }

                        }).catch(err => {
                        });



                        if (data_record.length == 0) {

                                if(drivers_status==2){
                                        status_update  =false;
                                }
                              

                        } 

                        if(status_update){

                                var drivers_profile = "";
                                if (typeof req.files['drivers_profile'] !== 'undefined') {
        
        
                                        if (req.files['drivers_profile'].length != 0) {
        
                                                // console.log(req.files['drivers_profile'][0]);
        
                                                var fs = require("fs").promises;
        
        
                                                var file = helper.Filename_For_Uplaod(req.files['drivers_profile'][0].originalname);
        
        
                                                var image_data = null;
        
                                                image_data = await fs.readFile(req.files['drivers_profile'][0].path);
                                                //   console.log(image_data);
        
        
                                                await fs.writeFile(file, image_data);
        
                                                await fs.unlink(req.files['drivers_profile'][0].path);
        
                                                drivers_profile = setting.application.web_url + '/' + file.replace("public/", "");
        
        
                                        }
        
                                }
                                if (drivers_profile != "") {
        
                                        var User_Document = null;
        
                                        await models.User_Document.findOne({
                                                where: {
                                                        User_Id: req.params.record_id,
                                                        Is_Active: 1,
                                                        Document_Type: 'profile_image'
                                                },
                                                plain: true,
                                        }).then(data => {
        
                                                // console.log(data);
                                                User_Document = data;
        
                                        });
        
                                        if (User_Document != null) {
        
        
                                                await models.User_Document.update({
                                                        Document_Detail: drivers_profile,
                                                        Modified_By: req.session.user_data.User_Id,
                                                        Modified_Date: new Date(),
                                                        Is_Active: 1
                                                }, {
                                                                where: {
                                                                        User_Id: req.params.record_id,
                                                                        Document_Type: 'profile_image'
                                                                }
                                                        });
        
        
                                        } else {
        
                                                await models.User_Document.create(
                                                        {
                                                                User_Id: req.params.record_id,
                                                                Document_Type: "profile_image",
                                                                Document_Detail: drivers_profile,
                                                                Created_By: req.session.user_data.User_Id,
                                                                Created_Date: new Date(),
                                                                Is_Active: 1
                                                        }
                                                ).catch(err => {
                                                        // return_data.message = err;
                                                });
                                        }
        
        
                                }
        
                                var User_Contact = null;
        
                                await models.User_Contact.findOne({
                                        where: {
                                                User_Id: req.params.record_id,
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
                                                User_Contact_Value1: drivers_contact_number,
                                                Modified_By: req.session.user_data.User_Id,
                                                Modified_Date: new Date()
                                        }, {
                                                        where: {
                                                                User_Id: req.params.record_id,
                                                                Contact_Type: "mobile",
                                                                Is_Primary: 1
        
                                                        }
                                                });
        
                                } else {
                                        await models.User_Contact.create(
                                                {
                                                        Contact_Type: "mobile",
                                                        User_Id: req.params.record_id,
                                                        Is_Primary: 1,
                                                        User_Contact_Value1: drivers_contact_number,
                                                        User_Contact_Value2: '',
                                                        Created_By: req.session.user_data.User_Id,
                                                        Created_Date: new Date(),
                                                        Is_Active: 1
                                                }
                                        ).catch(err => {
        
                                                //  console.log(err);
        
                                        });
        
                                }
        
        
        
                                var User_Profile = null;
        
                                await models.User_Profile.findOne({
                                        where: {
                                                User_Id: req.params.record_id,
                                        },
                                        plain: true,
                                }).then(data => {
        
                                        // console.log(data);
                                        User_Profile = data;
        
                                });
        
                                if (User_Profile != null) {
        
                                        await models.User_Profile.update({
                                                First_Name: drivers_fullname,
                                                User_Address: drivers_address,
                                                Modified_By: req.session.user_data.User_Id,
                                                Modified_Date: new Date()
                                        }, {
                                                        where: {
                                                                User_Id: req.params.record_id,
                                                        }
                                                });
        
                                } else {
        
                                        await models.User_Profile.create(
                                                {
        
                                                        User_Id: req.params.record_id,
                                                        First_Name: drivers_fullname,
                                                        Last_Name: "",
                                                        User_Title: "",
                                                        User_Address: drivers_address,
                                                        Created_By: req.session.user_data.User_Id,
                                                        Created_Date: new Date(),
                                                        Is_Active: 1
        
                                                }
                                        ).catch(err => {
                                                // return_data.message = err;
                                        });
        
        
                                }
        
                                await models.User.update({
                                        Is_Active: drivers_status,
                                        Modified_By: req.session.user_data.User_Id,
                                        Modified_Date: new Date()
                                }, {
                                                where: {
                                                        User_Id: req.params.record_id,
                                                }
                                        });
        
        
                                return_data.status = true;
                                return_data.message = "Dirver Updated Successfully!";

                        }else{

                                return_data.status = false;
                                return_data.message = "Can't In-Active this Dirver becasue you have assign a job to this dirver";
              

                        }

                      
                }
                // console.log(return_data)

                //  res.render('cms/module/booking/schedule_list', return_data);
                // res.render('cms/module/drivers/edit/:record_id', return_data);
                // res.send(JSON.stringify(return_data));
        }

        res.send(JSON.stringify(return_data));
}

exports.get_city_post = async function (req, res) {
        return_data = { status: false, message: "", response: {} };

        res.header('Content-Type', 'application/json');

        var State_Id = req.body.Driver_Get_City_State_Id;

        req.checkBody('Driver_Get_City_State_Id', 'State Id Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {

                return_data.message = "Invalid Ride Id";
                //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

        }
        else {


                await models.Sys_City.findAll({
                        where: { Is_Active: 1, State_Id: State_Id },
                        attributes: [
                                "City_Id"
                                , "City_Name"
                        ],
                        raw: true,
                        order: [
                                ['City_Name', 'ASC'],
                        ],
                }).then(data => {


                        if (data != null) {


                                if (data.length != 0) {


                                        return_data.status = true;
                                        return_data.response = data;


                                } else {


                                }

                        } else {


                        }


                }).catch(err => {
                });


        }


        res.send(JSON.stringify(return_data));
}

exports.post_view = async function (req, res) {
        return_data = { status: false, message: "", response: {} };

        res.header('Content-Type', 'application/json');

        var User_Id = req.body.Driver_View_User_Id;


        req.checkBody('Driver_View_User_Id', 'User Id Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {

                return_data.message = "Invalid User Id";
                //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

        }
        else {

                await models.User.findOne({
                        where: { Is_Active: [1, 2], User_Parent_Id: req.session.user_data.User_Id, User_Id: User_Id },
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


                        if (data != null) {

                                return_data.status = true;
                                return_data.response = data;

                        }


                }).catch(err => {
                        return_data.message = err;
                });

                if (return_data.response != null) {

                        //city

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 1 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.city = data.Field_Value;

                        }).catch(err => {
                                //return_data.error = err;
                        });

                        //age

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 2 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.age = data.Field_Value;

                        }).catch(err => {
                                // return_data.error = err;
                        });

                        //vehicle_reg

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 3 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.vehicle_reg = data.Field_Value;

                        }).catch(err => {
                                // return_data.error = err;
                        });

                        //vehicle_insurance

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 4 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.vehicle_insurance = data.Field_Value;

                        }).catch(err => {
                                // return_data.error = err;
                        });


                        //certification

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 5 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.certification = data.Field_Value;

                        }).catch(err => {
                                // return_data.error = err;
                        });

                        //license

                        await models.User_Custom_Info.findOne({
                                where: { Is_Active: 1, User_Id: return_data.response.User_Id, Field_Id: 6 },
                                plain: true,
                                attributes: ['Field_Value'],

                        }).then(data => {

                                return_data.response.license = data.Field_Value;

                        }).catch(err => {
                                // return_data.error = err;
                        });


                }





        }


        res.send(JSON.stringify(return_data));
}

exports.post_remove = async function (req, res) {
        return_data = { status: false, message: "", response: {} };

        res.header('Content-Type', 'application/json');

        var User_Id = req.body.Driver_Remove_User_Id;


        req.checkBody('Driver_Remove_User_Id', 'User Id Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {

                return_data.message = "Invalid User Id";
                //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

        }
        else {





                await models.User.findOne({
                        where: { Is_Active: [1, 2], User_Parent_Id: req.session.user_data.User_Id, User_Id: User_Id },
                        attributes: ['User_Id'],
                        plain: true,
                }).then(data => {


                        if (data != null) {


                                return_data.response = data;

                        }


                }).catch(err => {
                        return_data.message = err;
                });

                if (return_data.response != null) {


                        var data_record = [];

                        await models.Rms_Accept.findAll({
                                where: { Is_Active: 1, Accepted_By: return_data.response.User_Id, Accept_Status_Id: [5, 6, 7] },
                                attributes: ['Request_Id'],
                                raw: true,
                                // limit: 50,
                                order: [
                                        ['Request_Id', 'DESC'],
                                ],
                        }).then(data => {

                                console.log(data);

                                if (data != null) {


                                        if (data.length != 0) {

                                                data_record = data;

                                        }

                                }

                        }).catch(err => {
                        });



                        if (data_record.length == 0) {

                                await models.User.update({
                                        Is_Active: 3,
                                        Modified_By: req.session.user_data.User_Id,
                                        Modified_Date: new Date()
                                }, {
                                                where: {
                                                        User_Id: return_data.response.User_Id
                                                }
                                        });


                                return_data.status = true;
                                return_data.message = "Dirver Remove Successfully"
                        } else {

                                return_data.status = false;
                                return_data.message = "Can't Delete this Dirver becasue you have assign a job to this dirver";
                        }


                }



        }


        res.send(JSON.stringify(return_data));
}


exports.post_change_password = async function (req, res) {
        return_data = { status: false, message: "", response: {} };

        res.header('Content-Type', 'application/json');

        var User_Id = req.body.Driver_Change_Password_User_Id;
        var Drivers_Password = req.body.Drivers_Password;
        var Drivers_Conform_Password = req.body.Drivers_Conform_Password;

        req.checkBody('Drivers_Password', 'Password is required').notEmpty();
        req.checkBody('Drivers_Conform_Password', 'Conform Password is required').notEmpty();
        req.assert('Drivers_Password', 'Passwords do not match').equals(req.body.Drivers_Conform_Password);
        req.checkBody('Driver_Change_Password_User_Id', 'User Id Is Required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {

                return_data.message = "Invalid User Id";
                //login_user_name;// Login_User_Name;// errors;//"Email OR Password Is Required";

        }
        else {

                await models.User.findOne({
                        where: { Is_Active: [1, 2], User_Parent_Id: req.session.user_data.User_Id, User_Id: User_Id },
                        attributes: ['User_Id'],
                        plain: true,
                }).then(data => {


                        if (data != null) {


                                return_data.response = data;

                        }


                }).catch(err => {
                        return_data.message = err;
                });

                if (return_data.response != null) {

                        await models.User.update({
                                Password: helper.Generate_Password(Drivers_Password),
                                Modified_By: req.session.user_data.User_Id,
                                Modified_Date: new Date()
                        }, {
                                        where: {
                                                User_Id: return_data.response.User_Id
                                        }
                                });


                        return_data.status = true;
                        return_data.message = "Password Change Successfully"



                }



        }


        res.send(JSON.stringify(return_data));
}

