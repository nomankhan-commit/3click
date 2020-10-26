var helper = require('../../helper/helper');
var setting = require('../../config/setting');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



exports.index = function (req, res) {

        var return_data = helper.Main_Default_Return_Data();

        if(req.params.type == "change-password"){
            res.render('main/message/change_password.ejs', return_data);

        }else if(req.params.type == "booking-approved"){
            res.render('main/message/booking_approved.ejs', return_data);

        }else if(req.params.type == "booking-rejected"){
            res.render('main/message/booking_rejected.ejs', return_data);

        }else{

            res.status(200).redirect('/404');
        }
        

}

