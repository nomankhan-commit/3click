var express = require('express');
var router = express.Router();

// let api_v1 = require('../controllers/api/v1');

let change_password = require('../controllers/main/change_password');
let verify_email  = require('../controllers/main/verify_email');
let booking  = require('../controllers/main/booking');
let message  = require('../controllers/main/message');
let expriy_booking = require('../controllers/corn/expriy_booking');




var helper = require('../helper/helper');
const jwtVerifier = require('express-jwt');
var setting = require('../config/setting');


/* GET home page. */
router.get('/', function(req, res, next) {
 
//    res.render('index', { title: 'Express' });
res.status(200).redirect('/cms/login')

});


router.get('/change-password/:token', change_password.index);
router.post('/change-password/:token', change_password.index_post);
router.get('/verify-email/:token', verify_email.index);
router.get('/booking/approved/:token', booking.index_approved);
router.post('/booking/approved/:token', booking.index_approved_post);
router.get('/booking/rejected/:token', booking.index_rejected);

router.post('/message/:type', message.index);
router.get('/message/:type', message.index);




//Corn Job

router.get('/corn/expriy_booking', expriy_booking.index);



module.exports = router;
