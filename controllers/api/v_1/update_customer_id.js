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



//update customer id API V1 (for customer role)

exports.update_customer_id = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');


    var customer_id = req.body.customer_id;
    var card_num = req.body.card_num;

    req.checkBody('customer_id', 'Customer Id is required').notEmpty();
    req.checkBody('card_num', 'Card Number is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var token_data = helper.Get_Token_Data(req.headers['authorization']);


        var User_Custom_Info_Record_Status = 0;

        await models.User_Custom_Info.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 9 },
            plain: true,
            attributes: ['Field_Value'],

        }).then(data => {

            if (data != null) {
                User_Custom_Info_Record_Status = 1;
            }


        }).catch(err => {
            //return_data.error = err;
        });

        // console.log(User_Custom_Info_Record_Status);
        if (User_Custom_Info_Record_Status == 1) {

            await models.User_Custom_Info.update({
                Field_Value: customer_id,
            }, {
                    where: {
                        Is_Active: 1, User_Id: token_data.user_id, Field_Id: 9
                    }
                });
        } else {

            await models.User_Custom_Info.create(
                {
                    User_Id: token_data.user_id,
                    Field_Id: 9,
                    Field_Value: customer_id,
                    Created_By: token_data.user_id,
                    Created_Date: new Date(),
                    Is_Active: 1
                }
            ).catch(err => {
                return_data.error = err;
            });


        }

        var User_Custom_Info_Record_Status = 0;

        await models.User_Custom_Info.findOne({
            where: { Is_Active: 1, User_Id: token_data.user_id, Field_Id: 10 },
            plain: true,
            attributes: ['Field_Value'],

        }).then(data => {

            if (data != null) {
                User_Custom_Info_Record_Status = 1;
            }


        }).catch(err => {
            //return_data.error = err;
        });

        // console.log(User_Custom_Info_Record_Status);
        if (User_Custom_Info_Record_Status == 1) {

            await models.User_Custom_Info.update({
                Field_Value: card_num,
            }, {
                    where: {
                        Is_Active: 1, User_Id: token_data.user_id, Field_Id: 10
                    }
                });
        } else {

            await models.User_Custom_Info.create(
                {
                    User_Id: token_data.user_id,
                    Field_Id: 10,
                    Field_Value: card_num,
                    Created_By: token_data.user_id,
                    Created_Date: new Date(),
                    Is_Active: 1
                }
            ).catch(err => {
                return_data.error = err;
            });


        }

        return_data.error = null;
        return_data.status = true;
        return_data.message = "Customer Id updated successfully ";


    }


    res.send(JSON.stringify(return_data));


}