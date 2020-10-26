var helper = require('../../helper/helper');

var return_data = helper.Cms_Default_Return_Data();


exports.index = function (req, res) {
        res.render('cms/module/user/list', return_data);
}


exports.add = function (req, res) {
        res.render('cms/module/user/add', return_data);
}


exports.add_post = function (req, res) {
        res.render('cms/module/user/add', return_data);
}



exports.edit = function (req, res) {
        res.render('cms/module/user/add', return_data);
}


exports.edit_post = function (req, res) {
        res.render('cms/module/user/add', return_data);
}
