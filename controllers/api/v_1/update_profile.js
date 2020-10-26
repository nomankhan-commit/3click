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



//Update Profile API V1 (for customer and driver role)

exports.update_profile = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    var email = req.body.email;
    // let password = req.body.password;
    var name = req.body.name;
    var mobile_number = req.body.mobile_number;
    // var image = req.body.image;
    var user_type = req.body.user_type;

    req.checkBody('email', 'Email is required').notEmpty().isEmail();
    req.checkBody('user_type', 'User Type is required').notEmpty();
    // req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('mobile_number', 'Mobile Number is required').notEmpty();

    if (user_type == 4) {
        var city = req.body.city;
        var age = req.body.age;
        var vehicle_reg = req.body.vehicle_reg;
        var vehicle_insurance = req.body.vehicle_insurance;
        var certification = req.body.certification;
        var license = req.body.license;

        req.checkBody('city', 'City is required').notEmpty();
        req.checkBody('age', 'Age is required').notEmpty();
        req.checkBody('vehicle_reg', 'Vehicle Register is required').notEmpty();
        req.checkBody('vehicle_insurance', 'Vehicle Insurance is required').notEmpty();
        req.checkBody('certification', 'Certification is required').notEmpty();
        req.checkBody('license', 'License is required').notEmpty();

    }

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var token_data = helper.Get_Token_Data(req.headers['authorization']);

        var db_restult = null;

        await models.User.findOne({
            where: { User_Name: email, User_Id: { [Op.notIn]: [token_data.user_id] },Is_Active:[1,2] },
            plain: true,
            attributes: ['Email', 'User_Id'],
            // include: [
            //     {
            //         model: models.Sec_User_Role,
            //         as: "Sec_User_Role",
            //         attributes: ['Role_Id']
            //     },
            // ]


        }).then(data => {
            db_restult = data;

        });

        if (db_restult == null) {

            var Role_Id = 0;
            var profile_image = "";

            await models.User.findOne({
                where: { User_Id: token_data.user_id },
                plain: true,
                include: [
                    {
                        model: models.Sec_User_Role,
                        as: "Sec_User_Role",
                        attributes: ['Role_Id']
                    },
                    {
                        model: models.User_Document, as: "profile_image"
                        , attributes: ['Document_Detail']
                        , where: { Is_Active: 1, Document_Type: "profile_image" }
                        , required: false
                    }
                ]
            }).then(data => {

                if(data != null){
                    Role_Id = data.Sec_User_Role.Role_Id;
                    profile_image = data.profile_image.Document_Detail
                }
               

            }).catch(err => {
                return_data.error = err;
            });

            if (Role_Id == user_type) {


                if (Role_Id == 2) {

                    await models.User.update({
                        User_Name: email,
                        Email: email,
                        // Password: helper.Generate_Password(password),
                        Modified_By: token_data.user_id,
                        Modified_Date: new Date()
                    }, {
                            where: {
                                User_Id: token_data.user_id
                            }
                        });

                    await models.User_Profile.update({
                        First_Name: name,
                        Modified_By: token_data.user_id,
                        Modified_Date: new Date()
                    }, {
                            where: {
                                User_Id: token_data.user_id
                            }
                        });


                    await models.User_Contact.findOne({
                        where: {
                            User_Id: token_data.user_id,
                            Contact_Type: "mobile",
                            Is_Primary: 1
                        },
                        plain: true,
                    }).then(data => {


                        if (data != null) {


                            models.User_Contact.update({
                                User_Contact_Value1: mobile_number,
                                Modified_By: token_data.user_id,
                                Modified_Date: new Date()
                            }, {
                                    where: {
                                        User_Id: token_data.user_id,
                                        Contact_Type: "mobile",
                                        Is_Primary: 1

                                    }
                                });

                        } else {
                            models.User_Contact.create(
                                {
                                    Contact_Type: "mobile",
                                    User_Id: token_data.user_id,
                                    Is_Primary: 1,
                                    User_Contact_Value1: mobile_number,
                                    User_Contact_Value2: '',
                                    Created_By: token_data.user_id,
                                    Created_Date: new Date(),
                                    Is_Active: 1
                                }
                            ).catch(err => {
                                return_data.error = err;
                            });

                        }


                    });

                } else if (Role_Id == 4) {
                    await models.User.update({
                        User_Name: email,
                        Email: email,
                        Modified_By: token_data.user_id,
                        Modified_Date: new Date()
                    }, {
                            where: {
                                User_Id: token_data.user_id
                            }
                        });

                    await models.User_Profile.update({
                        First_Name: name,
                        Modified_By: token_data.user_id,
                        Modified_Date: new Date()
                    }, {
                            where: {
                                User_Id: token_data.user_id
                            }
                        });


                    // await models.User_Document.update({
                    //     Document_Detail: image,
                    //     Modified_By: token_data.user_id,
                    //     Modified_Date: new Date()
                    // }, {
                    //         where: {
                    //             User_Id: token_data.user_id,
                    //             Document_Type: "profile_image"
                    //         }
                    //     });



                    //city

                    var User_Custom_Info_Record_Status = 0;

                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 1 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }
                        

                    }).catch(err => {
                        //return_data.error = err;
                    });

                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: city,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 1
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 1,
                                Field_Value: city,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }

                    //age


                    User_Custom_Info_Record_Status = 0;

                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 2 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                       
                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }

                    }).catch(err => {
                        // return_data.error = err;
                    });

                    

                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: age,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 2
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 2,
                                Field_Value: age,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }

                    

                    //vehicle_reg

                    
                    User_Custom_Info_Record_Status = 0;


                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 3 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }

                    }).catch(err => {
                        // return_data.error = err;
                    });


                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: vehicle_reg,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 3
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 3,
                                Field_Value: vehicle_reg,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }


                    //vehicle_insurance

                    
                    User_Custom_Info_Record_Status = 0;


                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 4 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }

                    }).catch(err => {
                        // return_data.error = err;
                    });

                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: vehicle_insurance,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 4
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 4,
                                Field_Value: vehicle_insurance,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }


                    //certification

                    
                    User_Custom_Info_Record_Status = 0;


                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 5 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }

                    }).catch(err => {
                        // return_data.error = err;
                    });

                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: certification,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 5
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 5,
                                Field_Value: certification,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }

                    //license

                    
                    User_Custom_Info_Record_Status = 0;


                    await models.User_Custom_Info.findOne({
                        where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 6 },
                        plain: true,
                        attributes: ['Field_Value'],

                    }).then(data => {

                        if(data != null){
                            User_Custom_Info_Record_Status= 1;
                        }

                    }).catch(err => {
                        // return_data.error = err;
                    });

                    if(User_Custom_Info_Record_Status ==1){

                        await models.User_Custom_Info.update({
                            Field_Value: license,
                        }, {
                                where: {
                                    Is_Active: 1, User_Id: token_data.user_id, Field_Id: 6
                                }
                            });
                    }else{

                        await models.User_Custom_Info.create(
                            {
                                User_Id: token_data.user_id,
                                Field_Id: 6,
                                Field_Value: license,
                                Created_By: token_data.user_id,
                                Created_Date: new Date(),
                                Is_Active: 1
                            }
                        ).catch(err => {
                            return_data.error = err;
                        });


                    }



                }

                return_data.error = null;
                return_data.status = true;
                return_data.message = "Profile updated successfully ";


                return_data.response.name = name + "";
                return_data.response.email = email + "";
                return_data.response.mobile_number = mobile_number + "";
                return_data.response.image = profile_image + "";

                
                return_data.response.user_type = user_type + "";
                // return_data.response.user_id = user_id + "";
                // return_data.response.image = deafult_image_path + "";

                if (Role_Id == 4) {


                    return_data.response.city = city + "";
                    return_data.response.age = age + "";
                    return_data.response.vehicle_reg = vehicle_reg + "";
                    return_data.response.vehicle_insurance = vehicle_insurance + "";
                    return_data.response.certification = certification + "";
                    return_data.response.license = license + "";


                }
                // return_data.response.message = "Profile updated successfully ";


            } else {
                return_data.error = "Invalid User Type";

            }




        } else {

            return_data.error = "Email is Alread Use";
        }

    }


    res.send(JSON.stringify(return_data));


}