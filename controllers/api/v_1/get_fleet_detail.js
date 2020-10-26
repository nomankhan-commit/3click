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

//Get get_fleet_detail API V1 (for customer )

exports.get_fleet_detail = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');
    let Fleet_Id = req.body.Fleet_Id;
    req.checkBody('Fleet_Id', 'Fleet Id is required').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        // Rating and amount
        // check from DB

        await models.User.findOne({
            where: { Is_Active: 1, User_Id: Fleet_Id },
            plain: true,
            attributes: [


                //      [Sequelize.fn("concat","0"),"rating"] ,
                //    [Sequelize.fn("concat","0"),"amount"] 
            ],
            include: [
                {
                    model: models.User_Contact, as: "User_Contact"
                    , attributes: ['User_Contact_Value1']
                    , where: { Contact_Type: "mobile", Is_Active: 1, Is_Primary: 1 }
                    , required: false
                },
                {
                    model: models.User_Profile, as: "User_Profile"
                    , attributes: ['First_Name', 'Last_Name']
                },
                {
                    model: models.User_Document, as: "User_Document"
                    , attributes: ["Document_Detail"]
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

            return_data.status = true;
            return_data.message = "Susscess";
            return_data.error = null;

            // var tem_ = data.User_Document;
            // return_data.response.data = ;
            // console.log(data);

            if (data.User_Document[0] != null) {
                return_data.response.fleet_image = data.User_Document[0].Document_Detail;
            } else {
                return_data.response.fleet_image = "";
            }
            if (data.User_Profile != null) {
                return_data.response.fleet_name = data.User_Profile.First_Name + " " + data.User_Profile.Last_Name;

            } else {
                return_data.response.fleet_name = "";
            }
            // return_data.response.amount = 0
            return_data.response.rating = "4";
            return_data.response.location_image = "";
            return_data.response.fleet_description = "Super Drive is a new service that connects Learner Drivers with Trusted Instructors and Supervisors. It helps them learn how to safely operate a car and complete the necessary supervised driving experience required under Australian law.  Learners Drivers register via an online portal, which then geo-searches registered Trusted Instructors and Trusted Supervisors in the local area. Learner Drivers are required to undergo a minimum three hours tuition with a licensed instructor and 15 hours total supervision before bookings supervised sessions.";


        }).catch(err => {
            return_data.error = err;
        });



    }

    res.send(JSON.stringify(return_data));

}