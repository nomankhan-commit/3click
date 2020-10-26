var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);
var setting = require('./config/setting');

// var indexRouter = require('./routes/index');
var mainRouter = require('./routes/main');
var apiRouter = require('./routes/api');
var cmsRouter = require('./routes/cms');
var usersRouter = require('./routes/users');
var multer = require('multer');
var helper =  require('./helper/helper');
var vhost = require('vhost');
var connect = require('connect')

var pdf = require('express-pdf');




var app = express();
// var app2 = connect();

const expressValidator = require('express-validator');


// var jwtDecode = require('jwt-decode');
// const jwt = require('jsonwebtoken');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.set('views', [
  path.join(__dirname, 'views'),
  // path.join(__dirname, 'views/cms/'), 
  // path.join(__dirname, 'views/series/')
]
);

app.set('view engine', 'ejs');
app.set('env', 'production');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(setting);


var sessionStore = new MySQLStore(setting.session.mysqloption);

app.use(session({
   key: setting.session.key,
   secret: setting.session.secret,
   store: sessionStore,
   resave: false,
   saveUninitialized: false
}));




app.use(expressValidator());

// app.use(expressValidator({
//   customValidators: {
//     isValidDate: isValidDate
//   }
// }));
// app.use(Sequelize);
// app.use(jwtDecode);
// app.use(jwt.jwt);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', mainRouter);
app.use('/api', apiRouter);
app.use('/cms', cmsRouter);


app.use(pdf);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use(validator());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
	if(err.name === 'UnauthorizedError'){

    var return_data = {
      status: false
      ,message: ""
      ,response: {
      }
      ,error:{"status":err.status,"message":err.message}
    };

    res.send(JSON.stringify(return_data));      

  }else if(err instanceof multer.MulterError){

    helper.Application_Error_Return(res,err.message);

  }else{

    // console.log(err.status);
    res.locals.message = err.message;
    var error_data = err.message.split("|");

    if(error_data.length == 2){
     
      helper.Application_Error_Return(res,error_data[1]);

    }else{

      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    }

   


  } 
});


app.listen(30000); 
// app.listen(80, 'transmissito.localhost',511, function() {
//   // console.log("... port %d in %s mode", app.address().port, app.settings.env);
// });

// app.use(vhost('transmissito.localhost', function handle (req, res, next) {
//   // for match of "foo.bar.example.com:8080" against "*.*.example.com":
//   console.dir(req.vhost.host) // => 'foo.bar.example.com:8080'
//   console.dir(req.vhost.hostname) // => 'foo.bar.example.com'
//   console.dir(req.vhost.length) // => 2
//   console.dir(req.vhost[0]) // => 'foo'
//   console.dir(req.vhost[1]) // => 'bar'
// }))

// app.listen(80);


module.exports = app;