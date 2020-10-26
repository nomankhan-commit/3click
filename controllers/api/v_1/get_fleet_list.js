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



//Get get_fleet_list API V1 (for customer)

exports.get_fleet_list = async function (req, res) {
    return_data = { status: false, message: "", response: [], error: null };
    res.header('Content-Type', 'application/json');


    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        // Rating and amount

        var db_restult = [];
        await models.User.findAll({

            attributes: [
                // ['User_Id', "fleet_id"],
                [Sequelize.fn("concat", "", Sequelize.col('User.User_Id')), "fleet_id"],
                // [Sequelize.literal('CASE WHEN user_parent_id = 0 THEN "0" ELSE "1" END'), "rider_type"],               
                [Sequelize.col('User_Profile.First_Name'), 'fleet_name'],
                [Sequelize.col('User_Document.Document_Detail'), 'fleet_image'],
                [Sequelize.fn("concat", "4"), "rating"],
                [Sequelize.fn("concat", "0"), "amount"],
                // [Sequelize.col('Sec_User_Role.Role_Id'), 'rider_type']
                [Sequelize.fn("concat", "", Sequelize.col('Sec_User_Role.Role_Id')), "rider_type"]
                // ,[Sequelize.col("User.User_Rating.Sys_Rating.Rating_Point")]
                // ,[Sequelize.fn("sum",Sequelize.col('Rating_Point')),"rating2"]

            ],
            raw: true,
            where: { User_Parent_Id: 0, Is_Active: 1 },
            include: [
                {
                    model: models.Sec_User_Role,
                    as: "Sec_User_Role",
                    where: { Role_Id: [3, 4] },
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
                // {
                    // model: models.User_Rating, as: "User_Rating"
                    // , attributes: [
                        // [Sequelize.fn("count",Sequelize.col('User.User_Rating.Sys_Rating.Rating_Point')),"rating"] 
                        //    [Sequelize.fn("concat","0"),"rating"] 
                        // [Sequelize.col("Sys_Rating.Rating_Point") , "aaa"]


                    // ]
                    // ,
                    // include: [
                    //     {
                    //         model: models.Sys_Rating,
                    //         as: "Sys_Rating",
                    //         where: { Is_Active:1 },
                    //         // attributes: [
                    //             // Sequelize.fn("count",Sequelize.col('User_Rating.Sys_Rating.Rating_Point')),"rating"
                    //             // "User.User_Rating.Sys_Rating.Rating_Point"
                    //             // [Sequelize.col("User.User_Rating.Sys_Rating.Rating_Point") , "aaa"]
                    //             // [Sequelize.col("Sys_Rating.Rating_Point") , "aaa"]
                    //         // ]    
                    //         attributes: [
                    //                 'Rating_Point'
                    //         ]
                    //     },

                    // ]

                    // , where: { Is_Active: 1 }
                    // , required: false
                // }

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

    }


    res.send(JSON.stringify(return_data));

}