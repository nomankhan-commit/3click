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

//Get get_amount_by_weight API V1 (for customer)

exports.get_amount_by_weight = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');


    let weight_in_tons = req.body.weight_in_tons;
    let km = req.body.km;
    let user_type = req.body.user_type;

    req.checkBody('km', ' Kilo meter is required').notEmpty();
    req.checkBody('weight_in_tons', 'weight in tons is required').notEmpty();

    var Schema = {
        "user_type": {
            in: 'body',
            matches: {
                options: [/\b(?:fleetcompany|individual)\b/],
                errorMessage: "User Type Required!"
            }
        }
    }

    req.check(Schema);

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var role_id = (user_type == 'fleetcompany') ? 3 : (user_type == 'individual') ? 4 : 0;
        // check from DB
        await models.Sys_List.findOne({
            where: { List_Value: weight_in_tons, List_Type_Id: [8], Is_Active: 1 },
            // attributes: ['Role_Id'],
            attributes: [
                "List_Id"
            ],
            plain: true,
            include: [
                {
                    model: models.Sys_List, as: "Weight_Rate"
                    , attributes: ['List_Value', 'List_Custom_Value1', 'List_Custom_Value2']
                    , where: { List_Type_Id: 9, List_Custom_Value3: role_id, Is_Active: 1 }
                    , required: false
                },

            ]

        }).then(data => {


            if (data != null) {

                if (data.lenght != 0) {

                    return_data.status = true;
                    return_data.message = "Susscess";
                    return_data.error = null;
                    return_data.response.amount = 0;

                    if (km <= data.Weight_Rate.List_Custom_Value2) {
                        return_data.response.amount = data.Weight_Rate.List_Value;
                        // return_data.response.amount = (parseFloat(return_data.response.amount).toFixed(2)) + ' - ' + ((parseFloat(return_data.response.amount) + 50).toFixed(2));

                        return_data.response.amount =  parseFloat(return_data.response.amount).toFixed(2)

                    } else {
                        var rem_km = km - data.Weight_Rate.List_Custom_Value2;
                        return_data.response.amount = parseFloat(data.Weight_Rate.List_Value) + parseFloat((rem_km * data.Weight_Rate.List_Custom_Value1));
                        // return_data.response.amount = (parseFloat(return_data.response.amount).toFixed(2)) + ' - ' + ((parseFloat(return_data.response.amount) + 50).toFixed(2));

                        return_data.response.amount = parseFloat(return_data.response.amount).toFixed(2);
                    }

                } else {

                    return_data.error = "Record Not Found";

                }
            } else {

                return_data.error = "Record Not Found";
            }


        }).catch(err => {
            return_data.error = err;
        });



    }


    res.send(JSON.stringify(return_data));

}