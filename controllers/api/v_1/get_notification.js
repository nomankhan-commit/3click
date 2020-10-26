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



//Get Notification API V1 (for customer and driver role)

exports.get_notification = async function (req, res) {
    return_data = { status: false, message: "", response: [], error: null };

    res.header('Content-Type', 'application/json');

    var token_data = helper.Get_Token_Data(req.headers['authorization']);
    return_data.error = "Not Found";
    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    } else {
        await models.User_Notification.findAll({
            where: { User_Id: token_data.user_id },
            raw: true,
            limit: 10,
            attributes: [['User_Notification_Title', "Title"], ['User_Notification_Description', "Description"]]


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