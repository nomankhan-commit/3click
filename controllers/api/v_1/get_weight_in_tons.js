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


//Get get_weight_in_tons API V1 (for customer)

exports.get_weight_in_tons = async function (req, res) {

    return_data = { status: false, message: "", response: [], error: null };
    res.header('Content-Type', 'application/json');


    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    {

        // get amount from table
        await models.Sys_List.findAll({
            where: { List_Type_Id: [8], Is_Active: 1 },
            // attributes: ['Role_Id'],
            attributes: [
                ["List_Name", "Weight_in_tons_value"]
                , ["List_Value", "weight_in_tonsId"]
            ],
            raw: true,

        }).then(data => {


            if (data != null) {

                if (data.lenght != 0) {

                    return_data.status = true;
                    return_data.message = "Susscess";
                    return_data.error = null;
                    return_data.response = data;


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