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


//Get get_fleet_list_by_category API V1 (for customer)

exports.get_fleet_list_by_category = async function (req, res) {
    return_data = { status: false, message: "", response: [], error: null };
    res.header('Content-Type', 'application/json');


    let category_type = req.body.category_type;


    req.checkBody('category_type', 'category_type please').notEmpty();
    var Schema = {
        "category_type": {
            in: 'body',
            matches: {
                options: [/\b(?:fleetcompany|individual)\b/],
                errorMessage: "Category Type Required!"
            }
        }
    }

    req.check(Schema);
    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {
        // Rating and amount
        var role_id = (category_type == 'fleetcompany') ? 3 : (category_type == 'individual') ? 4 : 0;
        // check from DB

        if (category_type != 0) {
            var db_restult = [];

            await models.User.findAll({

                attributes: [
                    ['User_Id', "Fleet_Id"],
                    // [Sequelize.col('Sec_User_Role.Role_Id'), 'Role_Id'],
                    [Sequelize.col('User_Profile.First_Name'), 'fleet_name'],
                    [Sequelize.col('User_Document.Document_Detail'), 'fleet_image'],
                    [Sequelize.fn("concat", "0"), "rating"],
                    [Sequelize.fn("concat", "0"), "amount"]
                ],
                raw: true,
                where: { User_Parent_Id: 0, Is_Active: 1 },
                include: [
                    {
                        model: models.Sec_User_Role,
                        as: "Sec_User_Role",
                        where: { Role_Id: role_id },
                        attributes: []
                    },
                    {
                        model: models.User_Profile, as: "User_Profile"
                        , attributes: []
                    },
                    {
                        model: models.User_Document, as: "User_Document"
                        , attributes: []
                        , where: { Document_Type: "profile_image", Is_Active: 1 }
                        , required: false
                    },
                    {
                        model: models.User_Rating, as: "User_Rating"
                        , attributes: [
                            // [Sequelize.fn("count",Sequelize.col('Rating_Id')),"rating"] 
                            //    [Sequelize.fn("concat","0"),"rating"] 
                        ]
                        // ,where : {Rating_Id:"rating" , Is_Active:1}
                        , required: false
                    }
                ]


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

        } else {

            return_data.error = "Invalid Category Type!";
        }

    }


    res.send(JSON.stringify(return_data));

}
