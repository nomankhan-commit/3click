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



//Get get_earnings API V1 (for driver role)

exports.get_earnings = async function (req, res) {
    return_data = { status: false, message: "", response: [], error: null };
    res.header('Content-Type', 'application/json');

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        var token_data = helper.Get_Token_Data(req.headers['authorization']);
        return_data.error = "Not Found";

        await models.Rms_Ride.findAll({
            attributes: [['End_Time', "Date"], ['Total_Fare', "Amount"]
                // ,[Sequelize.col('Rms_Accept.Accepted_By') , "Location"]
            ],
            where: { Is_Active: 1, Ride_Status_Id: 12 },

            raw: true,
            include: [
                // {
                //     model: models.Rms_Accept,
                //     as: "Rms_Accept",
                //     where: { Accepted_By: token_data.user_id },
                //     attributes: [
                //         // [Sequelize.col('Rms_Request.To_Location') , "Locatilln"]
                //     ],
                //     raw: true,
                //     include: [
                //         {
                //             model: models.Rms_Request,
                //             as: "Rms_Request",
                //             attributes: [
                //                 // 'To_Location'
                //             ]
                //         }
                //     ],
                //     required: false
                // }

            ]

        }).then(data => {

            if (data != null) {

                if (data.length != 0) {

                    return_data.status = true;
                    return_data.message = "Susscess";
                    // return_data.response = data.map(({ "Rms_Accept.Rms_Request.To_Location": Location, ...rest }) => ({ ...rest, Location }));;
                    return_data.response = data;

                    return_data.error = null;
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