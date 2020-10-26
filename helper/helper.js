const jwt = require('jsonwebtoken');
var jwt_decode = require('jwt-decode');
var setting = require('../config/setting');
var moment = require('moment');
const bcrypt = require('bcrypt');
var path = require('path');
// const bcrypt = require('bcrypt');

// exports.secret = function () { return "click3" }

exports.createToken = function (id) {

    let expirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30); //30 days from now
    var token = jwt.sign({ user_id: id, exp: expirationDate }, setting.jwt.secret);
    return token;

}


exports.createToken_Forget_Password = function (id) {
    
        let expirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //1 days from now
        var token = jwt.sign({ user_id: id, exp: expirationDate }, setting.jwt.secret_forget_password);
        return token;
    
}



exports.createToken_Verify_Email = function (id) {
    
        let expirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //1 days from now
        var token = jwt.sign({ user_id: id, exp: expirationDate }, setting.jwt.secret_verify_email);
        return token;
    
}



exports.createToken_Booking = function (ride_id) {
    
        let expirationDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); //1 days from now
        var token = jwt.sign({ ride_id: ride_id, exp: expirationDate }, setting.jwt.secret_booking);
        return token;
    
}


exports.JWD_Token_Destroy = function (token,type) {
    
       
    
}


exports.Get_Token_Data = function (token) {


    var retinr_data = null;
    if (token.startsWith('bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    retinr_data = jwt_decode(token)
    //jwt.verify(token, exports.secret(), (err, decoded) => {
    // return err;
    // if(!err) {
    //     return decoded;
    // }
    // });

    return retinr_data;

}

exports.Generate_Password = function (password) {

    let hash = bcrypt.hashSync(password, setting.bcrypt.saltRounds);

    return hash;

    // await bcrypt.hash(password, setting.bcrypt.saltRounds, function(err, hash) {
    //     // Store hash in your password DB.


    //   });

    //   console.log(hash);


    // await bcrypt.genSalt(10, function(err, salt) {

    //     // return salt;
    //     // _salt = salt;

    // });


    // await  bcrypt.hash(password, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     _hash = hash;

    // });

    // return _hash;

    // bcrypt.hash(password, 10, (err, hash) => {
    //    return hash;
    // });

}

exports.Verify_Password = function (hash, password) {


    // console.log(hash);
    // console.log(password);

    if (bcrypt.compareSync(password, hash)) {
        return true;
    } else {
        return false
    }

    // bcrypt.hash(password, 10, (err, hash) => {
    //    return hash;
    // });

}

// CMS Default Return Data

exports.Cms_Default_Return_Data = function (password) {

    var return_data = {
        cms_class: "sidebar-dark sidebar-expand navbar-brand-dark header-light",
        cms_top_nav: true,
        cms_sidebar: true,
        cms_footer: true,
        cms_page_js: false,
        cms_page_css: false,
        moment: moment,

    };

    return return_data;

}



// CMS Default Return Data

exports.Main_Default_Return_Data = function (password) {
    
        var return_data = {
            moment: moment,
    
        };
    
        return return_data;
    
    }
// booking_expiry


exports.Application_Setting_Booking_Expiry = function () {

    return setting.application.booking_expiry;

}

exports.Application_Setting_Profile_Image_Path = function () {

    // console.log(setting.application.upload);
    return setting.application.upload+'/images/profile';

}

exports.Application_Setting_Default_Iamge = function () {

    return setting.application.default_image_path;

}

exports.Application_Error_Return = function (res, message) {

    var error_data = message.split("|");
    var return_data = {
        status: false
        , message: ""
        , response: {}

    };

    if (error_data.length == 2) {
        return_data.message = error_data[1];
    } else {
        return_data.message = message;

    }
    res.send(JSON.stringify(return_data));
}



exports.Multer_Object_Return = function (accepted_extensions, mb, qty) {

    var multer = require('multer');
    var fileType = require('file-type');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'bin/temp/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })

  
    var limits = {
        fileSize:  mb * 1024 * 1024,  // 5 MB upload limit
        files: qty                    // 1 file
    };
    var fileFilter = (req, file, cb) => {
        // if the file extension is in our accepted list
        if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
            return cb(null, true);
        }

        // otherwise, return error

        var message = 'Only ' + accepted_extensions.join(", ") + ' files are allowed!';

        //  var data = JSON.stringify({ status: false, message: message, response: {} });

        //  res.send(data);
        //  return;
        var err = new Error('403|' + message);

        return cb(err);
        // return cb(null, false, message);
    };

    var upload = multer(
        {
            storage: storage,
            fileFilter: fileFilter,
            limits: limits,
           
        }
    );
    return upload;

}

exports.Filename_Extension =  function(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

exports.Filename_For_Uplaod =  function(files_data) {
    var file = files_data;
    
    file = exports.Application_Setting_Profile_Image_Path() + "/" + path.basename(file,exports.Filename_Extension(file)) +'_'+Date.now()+exports.Filename_Extension(file);
  
    return file;

}