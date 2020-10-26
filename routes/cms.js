var express = require('express');
var router = express.Router();

var helper = require('../helper/helper');
let dashboard = require('../controllers/cms/dashboard');
let login = require('../controllers/cms/login');
let forget_password = require('../controllers/cms/forget_password');

// let user = require('../controllers/cms/user');
// let companies = require('../controllers/cms/companies');
// let requests = require('../controllers/cms/requests');
// let complaints = require('../controllers/cms/complaints');
let booking = require('../controllers/cms/booking');
let drivers = require('../controllers/cms/drivers');
let report_booking_report = require('../controllers/cms/report/booking_report');
let notification = require('../controllers/cms/notification');
let cms_auth = require('../middleware/cms_auth');

// var upload = multer();
// let expriy_booking = require('../controllers/corn/expriy_booking');


/*=========login START========= */
router.get('/login', login.index);
router.post('/login', login.index_post);
/*=========login START========= */

/*=========logout START========= */
router.get('/logout', cms_auth({}), login.logout);
/*=========logout START========= */

/*=========forget password START========= */
router.get('/forget-password', forget_password.index);
router.post('/forget-password', forget_password.index_post);
/*=========forget password End ========= */

/* GET dashboard page. */
router.get('/', cms_auth({}), dashboard.index);
router.get('/dashboard', cms_auth({}), dashboard.index);
router.get('/account', cms_auth({}), dashboard.account);
var profile_image_upload = helper.Multer_Object_Return(['jpg', 'png'],5,1).fields([{ name: 'profile_image', maxCount: 1 }]);
router.post('/account-profile-image', [cms_auth({}),profile_image_upload], dashboard.account_post);
router.post('/account', cms_auth({}), dashboard.account_post);
router.get('/change-password', cms_auth({}), dashboard.change_password);
router.post('/change-password', cms_auth({}), dashboard.change_password_post);


/*========= booking START========= */
router.get('/booking/current',cms_auth({}), booking.list_current);
router.get('/booking/schedule',cms_auth({}), booking.list_schedule);
router.get('/booking/rejected',cms_auth({}), booking.list_rejected);
router.get('/booking/cancelled',cms_auth({}), booking.list_cancelled);

router.post('/booking/accept',cms_auth({}), booking.post_accept);
router.post('/booking/reject',cms_auth({}), booking.post_reject);
router.post('/booking/view',cms_auth({}), booking.post_view);

/*=========booking END========= */

/*========= Drives START========= */
router.get('/drivers/',cms_auth({}), drivers.list);
router.get('/drivers/add/:record_id?',cms_auth({}), drivers.add_edit);

var drivers_profile_image_upload = helper.Multer_Object_Return(['jpg', 'png'],5,1).fields([{ name: 'drivers_profile', maxCount: 1 }]);
router.post('/drivers/add/:record_id?',[cms_auth({}),drivers_profile_image_upload],drivers.add_edit_post);
router.get('/drivers/edit/:record_id',cms_auth({}),drivers.add_edit);
router.post('/drivers/edit/:record_id',[
    cms_auth({}),
    drivers_profile_image_upload
    ],drivers.add_edit_post);

router.post('/drivers/get-city',cms_auth({}),drivers.get_city_post);
router.post('/driver/view',cms_auth({}),drivers.post_view);
router.post('/driver/remove',cms_auth({}),drivers.post_remove);
router.post('/driver/change-password',cms_auth({}),drivers.post_change_password);


/*=========drivers END========= */


/*=========notification START========= */
router.get('/notification/',cms_auth({}) ,notification.list_notification);
/*=========notification END========= */

/*=========Report START========= */

/*=========Booking Report Start========= */

router.get('/report/booking-report',cms_auth({}) ,report_booking_report.index);

router.post('/report/booking-report/:view_type?',cms_auth({}) ,report_booking_report.index_export);
/*=========Booking Report End========= */

/*=========Report END========= */




/*=========Corn START========= */
// router.get('/corn/expriy_booking',cms_auth({}) , expriy_booking.index);
/*=========Corn START========= */


// /*=========USER START========= */
// router.get('/user',cms_auth({}) ,user.index);
// router.get('/user/add',cms_auth({}), user.add);
// router.post('/user/add',cms_auth({}), user.add_post);
// router.get('/user/edit/:record_id',cms_auth({}), user.edit);
// router.post('/user/edit/:record_id', cms_auth({}),user.edit_post);
// /*=========USER END========= */



/*=========COMPANIES START========= */

// router.get('/companies', companies.list);
// router.get('/companies/add', companies.addCompanies);
// router.get('/companies/edit', companies.editCompanies);

/*=========COMPANIES END========= */

/*========= Request Start ========= */
// router.get('/request/pending', requests.list_requests_pending);
// router.get('/requests/pending/edit', requests.edit_pending_request);
// router.get('/request/approved', requests.list_requests_approved);
// router.get('/request/cancel', requests.list_requests_cancel);
/*=========req_pending END========= */



/*=========complaints START========= */

// router.get('/complaints/close', complaints.list_complaint_close);
// router.get('/complaints/open', complaints.list_complaint_open);
// router.get('/complaints/pending', complaints.list_complaint_pending);

/*=========complaints END========= */




module.exports = router;
