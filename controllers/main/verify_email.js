
var helper = require('../../helper/helper');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var jwt = require('jsonwebtoken');
// var request = require('request'); // npm install request


exports.index = async function (req, res) {



        // if(typeof req.query.token !== 'undefined'){

        // }

        var status_cp = false;


        try {

                var token = req.params.token;
                var decoded = jwt.verify(token, setting.jwt.secret_verify_email);
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
                        where: { User_Id: decoded.user_id, Is_Active: [1, 2] },
                        attributes: ['User_Id'],
                        // plain: true,    
                        include: [
                                {
                                        model: models.User_Profile, as: "User_Profile"
                                        , attributes: []
                                        ,where:{Is_Verify: 0}
                                        , required: true
                                },
                        ]
                }).then(data => {


                        if (data != null) {



                                if (data.length != 0) {

                                        db_restult = data;


                                }
                        }
                });

                if (db_restult.length != 0) {




                        await models.User_Profile.update({
                                Is_Verify: 1,
                                Verify_Date: new Date(),
                                Verify_link: setting.application.web_url + '/verify-email/' + req.params.token,
                                Modified_By: decoded.user_id,
                                Modified_Date: new Date()
                        }, {
                                        where: {
                                                User_Id: decoded.user_id
                                        }
                                });


                        helper.JWD_Token_Destroy(req.params.token, 'verify_email');

                        //     req.pipe(request.post('http://localhost:3000/message/verify-email'));

                        //     request({ url: '/message/verify-email', headers: req.headers, body: req.body }, function(err, remoteResponse, remoteBody) {
                        //         if (err) { console.log(err);return res.status(500).end('Error'); }
                        //         res.writeHead(); // copy all headers from remoteResponse
                        //         res.end(remoteBody);
                        //     });

                        // request.post('http://localhost:3000/message/verify-email').form({});


                        //     res.status(307).redirect('/message/verify-email');

                        var return_data = helper.Main_Default_Return_Data();

                        res.render('main/message/verify_email.ejs', return_data);


                } else {

                        res.status(200).redirect('/404')



                }


        }
}
