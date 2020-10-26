var helper = require('../../helper/helper');



var return_data = helper.Cms_Default_Return_Data();


// exports.list = function (req, res) {
//         res.render('cms/module/complaints/comp_close/list', return_data);
// }



exports.list_complaint_close = function (req, res) {
    res.render('cms/module/complaints/comp_close/list', return_data);
}




exports.list_complaint_open = function (req, res) {
    res.render('cms/module/complaints/comp_open/list', return_data);
}



exports.list_complaint_pending = function (req, res) {
    res.render('cms/module/complaints/comp_pending/list', return_data);
}



exports.edit = function (req, res) {
    res.render('cms/module/Complaints/comp_close/edit', return_data);
}

