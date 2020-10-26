var helper = require('../../helper/helper');
var models = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.list_notification = async function (req, res) {

    var return_data = helper.Cms_Default_Return_Data();

    return_data.session_user_data = req.session.user_data;


    var User_Parent_Id = [];
    

    await models.User.findAll({
        where: { Is_Active: 1, User_Parent_Id: return_data.session_user_data.User_Id },
        attributes: [

            [Sequelize.fn('GROUP_CONCAT', Sequelize.col('User_Id')), 'User_Id']

        ],


    }).then(data => {


        if (data != null) {


            if (data.length != 0) {

                User_Parent_Id = data[0].User_Id;
            }

        }

    }).catch(err => {
    });

    User_Parent_Id += ','+return_data.session_user_data.User_Id;
    


    await models.User_Notification.findAll({
    
        where: {User_Id: User_Parent_Id.split(",") },
    
        attributes: [

            'User_Notification_Title','User_Notification_Description'

        ],
               raw: true,
         limit: 20,
         order: [
             ['Created_Date', 'DESC'],
         ],
    }).then(data => {

        if (data != null) {
            if (data.length != 0) {


                return_data.data_record = data;
            } else {


            }

        } else {


        }


    }).catch(err => {
    });



    res.render('cms/module/notification/list', return_data);
}
