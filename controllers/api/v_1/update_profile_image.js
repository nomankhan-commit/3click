var helper = require('../../../helper/helper');
var setting = require('../../../config/setting');
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



//Update Profile API V1 (for customer and driver role)

exports.update_profile_image = async function (req, res) {
    return_data = { status: false, message: "", response: {}, error: null };
    res.header('Content-Type', 'application/json');



    var errors = req.validationErrors();
    if (errors) {
        return_data.error = errors;
    }
    else {

        var token_data = helper.Get_Token_Data(req.headers['authorization']);

        var db_restult = null;

        await models.User.findOne({
            where: { User_Id: token_data.user_id, Is_Active: [1, 2] },
            plain: true,
            attributes: ['User_Id'],


        }).then(data => {
            db_restult = data;

        });

        if (db_restult != null) {


            var profile_image = "";

            if (req.files['profile_image'].length != 0) {

                // console.log(req.files['drivers_profile'][0]);

                var fs = require("fs").promises;

                // var file = req.files['profile_image'][0].originalname;
                
                var file = helper.Filename_For_Uplaod(req.files['profile_image'][0].originalname);

                // file = helper.Application_Setting_Profile_Image_Path() + "/" + path.basename(file,helper.Filename_Extension(file)) +'_'+Date.now()+helper.Filename_Extension(file);
              
               
                var image_data = null;

                image_data = await fs.readFile(req.files['profile_image'][0].path);
                //   console.log(image_data);


                await fs.writeFile(file, image_data);

                await fs.unlink(req.files['profile_image'][0].path);

                profile_image = setting.application.web_url + '/' + file.replace("public/", "");
               

            }



            if (profile_image != "") {



                await models.User_Document.update({
                    Document_Detail: profile_image,
                    Modified_By: token_data.user_id,
                    Modified_Date: new Date(),
                    Is_Active: 1
                }, {
                        where: {
                            User_Id: token_data.user_id,
                            Document_Type: 'profile_image'
                        }
                    });

                return_data.response.profile_image = profile_image + "";
                return_data.error = null;
                return_data.status = true;
                return_data.message = "Profile image updated successfully ";


            } else {
                return_data.error = "Invalid Image";

            }




        } else {

            return_data.error = "Email is Alread Use";
        }

    }


    res.send(JSON.stringify(return_data));


}