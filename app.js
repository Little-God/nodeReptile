var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

var schedule = require('node-schedule');
var process = require('child_process');
var sendMail = require('./util/sendMail');

function scheduleCronstyle(){
  schedule.scheduleJob('30 * * * * *', function(){
    console.log('执行定时操作');
    // console.log('scheduleCronstyle:' + new Date());
    process.exec('npm run phantomjs main.js',function (error, stdout, stderr) {
      console.log(stdout, stderr);
      // sendMail('enting.wu@qingclass.com', '测试邮件', '吴恩廷真帅！');
      if (error !== null) {
        console.log('exec error: ' + error);
      };
    });
  });
}
// sendMail('enting.wu@qingclass.com', '测试邮件', '吴恩廷真帅！');
scheduleCronstyle();

module.exports = app;
