
var helper = require('../../helper/helper');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');

exports.index = async function (req, res) {



        // if(typeof req.query.token !== 'undefined'){

        // }

        var status_cp = false;


        try {

                var token = req.params.token;
                var decoded = jwt.verify(token, setting.jwt.secret_forget_password);
                console.log(decoded);
                status_cp = true;

        } catch{

                status_cp = false;
                var error_throw = new Error("Invalid User");
                error_throw.code = "405";
                throw error_throw;


        }


        if (status_cp) {


                // console.log(decoded.user_id);

                var db_restult = [];
                await models.User.findOne({
                        where: { User_Id: decoded.user_id, Is_Active: 1 },
                        attributes: ['User_Id'],
                        // plain: true,                        

                }).then(data => {


                        if (data != null) {



                                if (data.length != 0) {

                                        db_restult = data;


                                }
                        }
                });

                if (db_restult.length != 0) {


                        var return_data = helper.Cms_Default_Return_Data();

                        return_data.session_user_data = req.session.user_data;

                        return_data.token = token;
                        res.render('main/change_password', return_data);

                } else {

                        res.status(200).redirect('/404')



                }




        }
}

exports.index_post = async function (req, res) {

        return_data = { status: false, message: "", response: {} };




        try {

                var token = req.params.token;
                var decoded = jwt.verify(token, setting.jwt.secret_forget_password);
             
                return_data.status = true;

        } catch{

                return_data.status = false;
                return_data.message = "Invalid User";



        }


        if (return_data.status) {

                res.header('Content-Type', 'application/json');
                var New_Password = req.body.New_Password;
                var Conform_Password = req.body.Conform_Password;
                req.checkBody('New_Password', 'Current Password  required').notEmpty();
                req.checkBody('Conform_Password', 'Confrom Password  required').notEmpty();
                req.assert('New_Password', 'Passwords do not match').equals(req.body.Conform_Password);

                var errors = req.validationErrors();
                if (errors) {
                        return_data.message = '';
                        for (i = 0; i < errors.length; i++) {

                                return_data.message += errors[i].msg + "<br/>";
                        }
                        return_data.status = false;

                } else {

                        var db_restult = [];
                        await models.User.findOne({
                                where: { User_Id: decoded.user_id, Is_Active: 1 },
                                attributes: ['User_Id'],
                                // plain: true,                        

                        }).then(data => {


                                if (data != null) {



                                        if (data.length != 0) {

                                                db_restult = data;


                                        }
                                }
                        });

                        if (db_restult.length != 0) {

                                await models.User.update({
                                        Password: helper.Generate_Password(New_Password),
                                        Modified_By: decoded.user_id,
                                        Modified_Date: new Date()
                                }, {
                                        where: {
                                                User_Id: decoded.user_id
                                        }
                                });


                                return_data.status = true;
                                return_data.message = "Password Change Successfully";

                                helper.JWD_Token_Destroy(req.params.token,'forget_password');


                        } else {

                                return_data.status = false;
                                return_data.message = "Invalid User";

                        }









                }


        }












        res.send(JSON.stringify(return_data));
}
