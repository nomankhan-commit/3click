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


//Get About API V1 (for customer and driver role)

exports.get_about = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {


        // GET From DataBase

        return_data.status = true;
        return_data.message = "Susscess";
        return_data.error = null;
        return_data.response.image = "http://transmissito.codecreators.net:3000/assets/cms/images/about_img.png"
            return_data.response.about_description = [
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. \nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a\n galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic\n typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            ]
    }



    res.send(JSON.stringify(return_data));

}
