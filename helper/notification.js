var models = require('../models');
const nodemailer = require("nodemailer");
var setting = require('../config/setting');


exports.send_email = async function (email_setting,view) {
   
    if(email_setting == null){

        email_setting = setting.email;
    }


  let EmailAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: email_setting.host,
      port: email_setting.port,
      secure: email_setting.secure,
      auth: {
        user: email_setting.username,
        pass: email_setting.password
      }
    });
  
    // send mail with defined transport object
    // let info =  await transporter.sendMail({
    //   from: '"'+email_setting.from_name+'" <'+email_setting.from_email+'>', // sender address
    //   to: email_setting.to_email, // list of receivers
    //   subject: email_setting.subject, // Subject line
    //   html: view // html body
    // });

    var promise = new Promise(async function(resolve) {
        await transporter.sendMail({
            from: '"'+email_setting.from_name+'" <'+email_setting.from_email+'>', // sender address
            to: email_setting.to_email, // list of receivers
            subject: email_setting.subject, // Subject line
            html: view // html body
          }).catch(data=>{
              
            console.log(data);
                var error_throw = new Error("Email Server is down.please try later");
                error_throw.code = "405";
                throw error_throw;
            });
    });
    // await transporter.sendMail({
    //     from: '"'+email_setting.from_name+'" <'+email_setting.from_email+'>', // sender address
    //     to: email_setting.to_email, // list of receivers
    //     subject: email_setting.subject, // Subject line
    //     html: view // html body
    //   });
    // .catch(data=>{
    //     var error_throw = new Error("Email Server is down.please try later");
    //     error_throw.code = "405";
    //     throw error_throw;
    // });

  
    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

   
}

exports.send_notification = async function (local,push,detail) {
    
    if(local ==  true){

        await models.User_Notification.create(
            {
                User_Id : detail.User_Id,
                User_Notification_Title : detail.Title,
                User_Notification_Description : detail.Detail,
                Created_By: detail.Created_By,
                Created_Date: detail.Created_Date,
                Is_Active: detail.Is_Active
    
            }
        ).then(data => {
    
    
        }).catch(err => {
            
        });
    }

    if(push ==  true){


    }

  

    
}