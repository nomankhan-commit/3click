var helper = require('../../helper/helper');
var models = require('../../models');
// var db = require('../../config/config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var return_data = {
    status: false
    , message: ""
    , response: {
    }
    , error: null
};
