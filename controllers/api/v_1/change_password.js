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


//Change Password API V1 (for customer and driver role)

exports.change_passward = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    let new_password = req.body.new_password;
    let current_password = req.body.current_password;

    req.checkBody('new_password', 'News Password is required').notEmpty();
    req.checkBody('current_password', 'Current Password is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var token_data = helper.Get_Token_Data(req.headers['authorization']);

        var db_restult = {};

        await models.User.findOne({
            where: { User_Id: token_data.user_id },
            plain: true,
            attributes: ['Password'],
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

        if (db_restult != null) {


            if (helper.Verify_Password(db_restult.Password, current_password)) {

                await models.User.update({
                    Password: helper.Generate_Password(new_password),
                    Modified_By: token_data.user_id,
                    Modified_Date: new Date()
                }, {
                        where: {
                            User_Id: token_data.user_id
                        }
                    });
                return_data.error = null;
                return_data.status = true;
                return_data.message = "Password change successfully ";

            } else {
                return_data.error = "Incorrect Password";

            }


        } else {

            return_data.error = "Incorrect Password";
        }

    }


    res.send(JSON.stringify(return_data));
}

