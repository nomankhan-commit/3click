var helper = require('../../helper/helper');

var return_data = helper.Cms_Default_Return_Data();


exports.list = function (req, res) {
        res.render('cms/module/companies/list', return_data);
}

 exports.addCompanies = function (req, res) {
         res.render('cms/module/companies/add', return_data);
 }

 exports.editCompanies = function (req, res) {
        res.render('cms/module/companies/edit', return_data);
}
