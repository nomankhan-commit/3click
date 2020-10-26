var express = require('express');
var router = express.Router();
var helper = require('../helper/helper');

// let api_v1 = require('../controllers/api/v1');

var api_v1_token = require('../controllers/api/v_1/token');
var api_v1_login = require('../controllers/api/v_1/login');
var api_v1_sign_up = require('../controllers/api/v_1/sign_up');
var api_v1_forgot_password = require('../controllers/api/v_1/forgot_password');
var api_v1_get_profile = require('../controllers/api/v_1/get_profile');
var api_v1_update_profile = require('../controllers/api/v_1/update_profile');
var api_v1_change_password = require('../controllers/api/v_1/change_password');
var api_v1_get_about = require('../controllers/api/v_1/get_about');
var api_v1_get_help = require('../controllers/api/v_1/get_help');
var api_v1_get_notification = require('../controllers/api/v_1/get_notification');
var api_v1_get_rider_list = require('../controllers/api/v_1/get_ride_list');
var api_v1_get_rider_detail = require('../controllers/api/v_1/get_ride_detail');
var api_v1_get_fleet_list = require('../controllers/api/v_1/get_fleet_list');
var api_v1_get_fleet_list_by_category = require('../controllers/api/v_1/get_fleet_list_by_category');
var api_v1_get_fleet_detail = require('../controllers/api/v_1/get_fleet_detail');
var api_v1_hire_fleet = require('../controllers/api/v_1/hire_fleet');
var api_v1_get_weight_in_tons = require('../controllers/api/v_1/get_weight_in_tons');
var api_v1_get_amount_by_weight = require('../controllers/api/v_1/get_amount_by_weight');

var api_v1_get_previous_ride_detail = require('../controllers/api/v_1/get_previous_ride_detail');
var api_v1_get_earnings = require('../controllers/api/v_1/get_earnings');
var api_v1_get_current_ride_detail = require('../controllers/api/v_1/get_current_ride_detail');
var api_v1_accept_reject_ride = require('../controllers/api/v_1/accept_reject_ride');
var api_v1_ride_arrived = require('../controllers/api/v_1/ride_arrived');
var api_v1_start_ride = require('../controllers/api/v_1/start_ride');
var api_v1_end_ride = require('../controllers/api/v_1/end_ride');
var api_v1_report_a_problem = require('../controllers/api/v_1/report_a_problem');
var api_v1_get_rider_device_token = require('../controllers/api/v_1/get_rider_device_token');
var api_v1_update_profile_image = require('../controllers/api/v_1/update_profile_image');
var api_v1_update_customer_id = require('../controllers/api/v_1/update_customer_id');

//noman khan


const jwtVerifier = require('express-jwt');
var setting = require('../config/setting');


 
/* API V1 Routes Without Token */
router.post('/v1/token',api_v1_token.token);
router.post('/v1/sign_up',api_v1_sign_up.sign_up);
router.post('/v1/forgot_password',api_v1_forgot_password.forgot_password);
router.post('/v1/get_help',api_v1_get_help.get_help);
router.post('/v1/get_about',api_v1_get_about.get_about);


router.post('/v1/get_fleet_list',api_v1_get_fleet_list.get_fleet_list);
router.post('/v1/get_fleet_list_by_category',api_v1_get_fleet_list_by_category.get_fleet_list_by_category);
router.post('/v1/get_fleet_detail',api_v1_get_fleet_detail.get_fleet_detail);
router.post('/v1/get_weight_in_tons',api_v1_get_weight_in_tons.get_weight_in_tons);
router.post('/v1/get_amount_by_weight',api_v1_get_amount_by_weight.get_amount_by_weight);


/* API V1 Routes With Token */
router.post('/v1/login',jwtVerifier({secret: setting.jwt.secret}),api_v1_login.login);
router.post('/v1/change_password',jwtVerifier({secret: setting.jwt.secret}),api_v1_change_password.change_passward);
router.post('/v1/get_profile',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_profile.get_profile);
router.post('/v1/update_profile',jwtVerifier({secret: setting.jwt.secret}),api_v1_update_profile.update_profile);
router.post('/v1/get_notification',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_notification.get_notification);
router.post('/v1/get_ride_list',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_rider_list.get_ride_list);
router.post('/v1/get_ride_detail',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_rider_detail.get_ride_detail);
// router.post('/v1/get_notification',jwtVerifier({secret: setting.jwt.secret}),api_v1.get_notification);
router.post('/v1/hire_fleet',jwtVerifier({secret: setting.jwt.secret}),api_v1_hire_fleet.hire_fleet);
router.post('/v1/end_ride',jwtVerifier({secret: setting.jwt.secret}),api_v1_end_ride.end_ride);
router.post('/v1/start_ride',jwtVerifier({secret: setting.jwt.secret}),api_v1_start_ride.start_ride);
router.post('/v1/ride_arrived',jwtVerifier({secret: setting.jwt.secret}),api_v1_ride_arrived.ride_arrived);
router.post('/v1/accept_reject_ride',jwtVerifier({secret: setting.jwt.secret}),api_v1_accept_reject_ride.accept_reject_ride);
router.post('/v1/get_previous_ride_detail',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_previous_ride_detail.get_previous_ride_detail);
router.post('/v1/get_earnings',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_earnings.get_earnings);
router.post('/v1/get_current_ride_detail',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_current_ride_detail.get_current_ride_detail);
router.post('/v1/report_a_problem',jwtVerifier({secret: setting.jwt.secret}),api_v1_report_a_problem.report_a_problem);

router.post('/v1/get_rider_device_token',jwtVerifier({secret: setting.jwt.secret}),api_v1_get_rider_device_token.get_rider_device_token);
var profile_image_upload = helper.Multer_Object_Return(['jpg', 'png'],5,1).fields([{ name: 'profile_image', maxCount: 1 }]);

router.post('/v1/update_profile_image',[jwtVerifier({secret: setting.jwt.secret}),profile_image_upload],api_v1_update_profile_image.update_profile_image);
router.post('/v1/update_customer_id',[jwtVerifier({secret: setting.jwt.secret})],api_v1_update_customer_id.update_customer_id);



module.exports = router;
