var helper = require('../../helper/helper');

var return_data = helper.Cms_Default_Return_Data();


exports.list_requests_approved = function (req, res) {
        res.render('cms/module/requests/req_approved/list', return_data);
}

exports.list_requests_cancel = function (req, res) {
    res.render('cms/module/requests/req_cancel/list', return_data);
}


exports.list_requests_pending = function (req, res) {
    res.render('cms/module/requests/req_pending/list', return_data);
}

 exports.edit_pending_request = function (req, res) {
         res.render('cms/module/requests/req_pending/edit', return_data);
 }
