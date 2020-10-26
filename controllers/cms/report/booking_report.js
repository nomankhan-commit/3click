var helper = require('../../../helper/helper');
var setting = require('../../../config/setting');
var models = require('../../../models');
const Sequelize = require('sequelize');
var moment = require('moment');
var ejs = require('ejs');
pdf = require('express-pdf');


var express = require('express'),
        app = express(),
        pdf = require('express-pdf');
//previously app.use(pdf())
app.use(pdf); // or you can app.use(require('express-pdf'));


const Op = Sequelize.Op;



exports.index = function (req, res) {

        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        res.render('cms/module/report/booking_report/index.ejs', return_data);

}



exports.index_export = async function (req, res) {

        var return_data = helper.Cms_Default_Return_Data();

        return_data.session_user_data = req.session.user_data;

        var booking_report_from_date = req.body.form_booking_report_from_date;
        var form_booking_report_to_date = req.body.form_booking_report_to_date;

        req.checkBody('form_booking_report_from_date', 'From date is required').notEmpty().toDate();
        req.checkBody('form_booking_report_to_date', 'To date is required').notEmpty().toDate();


        // console.log(booking_report_from_date);
        // console.log(form_booking_report_to_date);
        // var dateObject = moment(booking_report_from_date,'MM-DD-YYYY');
        // console.log(dateObject.get);



        var errors = req.validationErrors();
        if (errors) {
                return_data.message = '';
                for (i = 0; i < errors.length; i++) {

                        return_data.message += errors[i].msg;

                        if (i + 1 != errors.length) {
                                return_data.message += "<br/>";
                        }

                }


                var error_throw = new Error(return_data.message);
                error_throw.code = "405";
                throw error_throw;
        } else {

                return_data.report = {};
                return_data.report.date_from = moment(booking_report_from_date, 'MM/DD/YYYY');
                return_data.report.date_to = moment(form_booking_report_to_date, 'MM/DD/YYYY')

                if (
                        moment(
                                return_data.report.date_from.format('YYYY-MM-DD')
                        ).isAfter(
                                return_data.report.date_to.format('YYYY-MM-DD')
                                )
                ) {

                        var error_throw = new Error("Date rang is not correct");
                        error_throw.code = "405";
                        throw error_throw;

                }

                return_data.report.title = setting.application.name + " - Booking Report";
                return_data.report.copyright = setting.application.coypright;
                return_data.report.fb = setting.application.social_media.fb;
                return_data.report.twitter = setting.application.social_media.twitter;
                return_data.report.data = [];

                var User_Parent_Id = "";

                await models.User.findAll({
                        where: { Is_Active: [1, 2], User_Parent_Id: return_data.session_user_data.User_Id },
                        attributes: [
                                [Sequelize.fn('GROUP_CONCAT', Sequelize.col('User_Id')), 'User_Id']

                        ],

                }).then(data => {


                        if (data != null) {


                                if (data.length != 0) {

                                        User_Parent_Id = data[0].User_Id;
                                        // return_data.data_record.data_total_driver = data.length;
                                }

                        }

                }).catch(err => {
                });


                await models.Rms_Accept.findAll({
                        where: {
                                Is_Active: 1, Accepted_By: User_Parent_Id.split(","), Accept_Status_Id: [8]

                        },
                        attributes: ['Request_Id', 'Accepted_By'],
                        include: [
                                {
                                        model: models.Rms_Request, as: "Rms_Request"
                                        , attributes: ['From_Location', 'To_Location', 'Requested_Date', 'Created_Date', 'Item_Weight', 'ETA_Amount']
                                        , required: true
                                        , where: {
                                                Created_Date: {
                                                        [Op.between]: [return_data.report.date_from.format(), return_data.report.date_to.format()]
                                                        // [Op.between]: ["2019-07-08T14:06:48.000Z", "2019-10-08T22:33:54.000Z"]

                                                }
                                        }
                                        , include: [

                                                {
                                                        model: models.User, as: "User"
                                                        , attributes: ['Email']
                                                        , required: false
                                                        , include: [

                                                                {
                                                                        model: models.User_Profile, as: "User_Profile"
                                                                        , attributes: ['First_Name']
                                                                        , required: false

                                                                },
                                                                {
                                                                        model: models.User_Contact, as: "User_Contact"
                                                                        , attributes: ['User_Contact_Value1']
                                                                        , where: { Is_Active: 1, Is_Primary: 1, Contact_Type: 'mobile' }
                                                                        , required: false

                                                                }


                                                        ]

                                                },
                                        ]
                                }, {
                                        model: models.User, as: "User"
                                        , attributes: ['Email']
                                        , required: false
                                        , include: [

                                                {
                                                        model: models.User_Profile, as: "User_Profile"
                                                        , attributes: ['First_Name']
                                                        , required: false

                                                }

                                        ]

                                }, {
                                        model: models.Sys_List, as: "Accept_Status"
                                        , attributes: ['List_Value']
                                        , required: false


                                }, {
                                        model: models.Rms_Ride, as: "Rms_Ride"
                                        , attributes: ['Duration', 'Total_Fare']
                                        , required: false


                                },


                        ],
                        raw: true,
                        order: [
                                ['Request_Id', 'ASC'],
                        ],
                }).then(data => {



                        if (data != null) {
                                return_data.report.data = data;
                        }
                }).catch(err => {
                });

                // console.log(return_data.report.data);

                if (req.params.view_type == null) {

                        res.status(200).redirect('/cms/booking-report');

                } if (req.params.view_type == 'html') {

                        res.render('cms/module/report/booking_report/view/html.ejs', return_data);

                } else if (req.params.view_type == 'excel') {

                        var excel = require('node-excel-export');

                        var styles = {
                                headerDark: {
                                        fill: {
                                                fgColor: {
                                                        rgb: '002f5b'
                                                }
                                        },
                                        font: {
                                                color: {
                                                        rgb: 'FFFFFFFF'
                                                },
                                                sz: 13,
                                                bold: true,
                                                underline: false
                                        }
                                },
                                cellPink: {
                                        fill: {
                                                fgColor: {
                                                        rgb: 'f5f7fa'
                                                }
                                        }
                                },
                                cellGreen: {
                                        fill: {
                                                fgColor: {
                                                        rgb: 'f5f7fa'
                                                }
                                        }
                                }
                                ,
                                headerblank: {
                                        fill: {
                                                fgColor: {
                                                        rgb: 'f5f7fa'
                                                }
                                        },

                                        font: {
                                                color: {
                                                        rgb: '002f5b'
                                                },
                                                sz: 20,
                                                bold: true,
                                                underline: false
                                        }
                                },
                                headersmall: {
                                        fill: {
                                                fgColor: {
                                                        rgb: 'f5f7fa'
                                                }

                                        },

                                        font: {
                                                color: {
                                                        rgb: '#000000'
                                                },

                                                sz: 15,
                                                bold: true,
                                                underline: false
                                        }
                                },

                        };

                        var heading = [
                                [{ value: return_data.report.title, style: styles.headerblank }],
                                [{ value: "", style: styles.headerblank }],
                                [{ value: 'From : ' + return_data.report.date_from.format('DD-MMM-YYYY') + ' To : ' + return_data.report.date_to.format('DD-MMM-YYYY') + '', style: styles.headersmall }],

                        ];

                        var specification = {
                                s_num: {
                                        displayName: 'S#',
                                        headerStyle: styles.headerDark,

                                        width: 30
                                },
                                Request_Id: {
                                        displayName: 'Booking ID',
                                        headerStyle: styles.headerDark,

                                        width: 200
                                },


                                First_Name: {
                                        displayName: 'Customer Name',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Email: {
                                        displayName: 'Customer Email',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                User_Contact_Value1: {
                                        displayName: 'Customer Contact',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                From_Location: {
                                        displayName: 'P.Location',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                To_Location: {
                                        displayName: 'D.Location',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Requested_Date: {
                                        displayName: 'Booking Created Date & Time',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Created_Date: {
                                        displayName: 'Booking Date & Time',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Item_Weight: {
                                        displayName: 'Weight (tons)',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                ETA_Amount: {
                                        displayName: 'Estimated Amount',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Total_Fare: {
                                        displayName: 'Total Amount',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Accepted_By: {
                                        displayName: 'Driver ID	',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Driver_First_Name: {
                                        displayName: 'Driver Name',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Duration: {
                                        displayName: 'Ride Duration',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                List_Value: {
                                        displayName: 'Ride Status',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Invoice_Number: {
                                        displayName: 'Transaction ID',
                                        headerStyle: styles.headerDark,

                                        width: 220
                                },
                                Amount: {
                                        displayName: 'Amount Charged',
                                        headerStyle: styles.headerDark,
                                        //cellStyle: styles.cellPink, 
                                        width: 220
                                }
                        }


                        var dataset = [];
                        for (var i = 0; i < (return_data.report.data).length; i++) {

                                dataset.push({
                                        s_num: (i + 1)
                                        , Request_Id: return_data.report.data[i].Request_Id
                                        , First_Name: return_data.report.data[i]['Rms_Request.User.User_Profile.First_Name']
                                        , Email: return_data.report.data[i]['Rms_Request.User.Email']
                                        , User_Contact_Value1: return_data.report.data[i]['Rms_Request.User.User_Contact.User_Contact_Value1']
                                        , From_Location: return_data.report.data[i]['Rms_Request.From_Location']
                                        , To_Location: return_data.report.data[i]['Rms_Request.To_Location']
                                        , Requested_Date: moment(return_data.report.data[i]['Rms_Request.Requested_Date']).format("dddd, MMMM Do YYYY, h:mm:ss a")
                                        , Created_Date: moment(return_data.report.data[i]['Rms_Request.Created_Date']).format("dddd, MMMM Do YYYY, h:mm:ss a")
                                        , Item_Weight: return_data.report.data[i]['Rms_Request.Item_Weight']
                                        , ETA_Amount: return_data.report.data[i]['Rms_Request.ETA_Amount']
                                        , Total_Fare: return_data.report.data[i]['Rms_Ride.Total_Fare']
                                        , Accepted_By: return_data.report.data[i].Accepted_By
                                        , First_Name: return_data.report.data[i]['User.User_Profile.First_Name']
                                        , Duration: return_data.report.data[i]['Rms_Ride.Duration']
                                        , List_Value: return_data.report.data[i]['Accept_Status.List_Value']
                                        , Transaction_ID: "-"
                                        , Amount_Charged: "-"
                                });
                        }

                        // Define an array of merges. 1-1 = A:1
                        // The merges are independent of the data.
                        // A merge will overwrite all data _not_ in the top-left cell.
                        var merges = [
                                { start: { row: 1, column: 1 }, end: { row: 1, column: 18 } },

                                { start: { row: 2, column: 1 }, end: { row: 2, column: 18 } },
                                { start: { row: 3, column: 1 }, end: { row: 3, column: 18 } },
                        ]

                        var report = excel.buildExport(
                                [
                                        {
                                                name: return_data.report.title, // <- Specify sheet name (optional)
                                                heading: heading, // <- Raw heading array (optional)
                                                merges: merges, // <- Merge cell ranges
                                                specification: specification, // <- Report specification
                                                data: dataset // <-- Report data
                                        }
                                ]
                        );
                        var file_name = ((return_data.report.title.toLowerCase()).replace(/\s/gi, '-')).replace(/-{2,}/g, '-');
                        file_name += '_' + return_data.report.date_from.format('DD-MM-YYYY') + '-' + return_data.report.date_to.format('DD-MM-YYYY');
                        res.attachment(file_name + '.xlsx');
                        return res.send(report);



                } else if (req.params.view_type == 'pdf') {

                        var pdf = require('html-pdf');
                        var fs = require('fs');
                        var stream = require('express-stream');
                        return_data.file_name = ((return_data.report.title.toLowerCase()).replace(/\s/gi, '-')).replace(/-{2,}/g, '-');
                        return_data.file_name += '_' + return_data.report.date_from.format('DD-MM-YYYY') + '-' + return_data.report.date_to.format('DD-MM-YYYY');
                        

                        var compiled = ejs.compile(fs.readFileSync('./views/cms/module/report/booking_report/view/pdf.ejs', 'utf8'));
                        var html = compiled(return_data);
                        pdf.create(html).toStream((err, pdfStream) => {
                                if (err) {

                                        var error_throw = new Error(err);
                                        error_throw.code = "500";
                                        throw error_throw;


                                } else {
                                        res.statusCode = 200
                                        pdfStream.on('end', () => {
                                                return res.end()
                                        })
                                        pdfStream.pipe(res)
                                }
                        });

                } else {
                        res.status(200).redirect('/cms/booking-report');
                }
        }
}
