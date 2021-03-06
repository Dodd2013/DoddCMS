var express = require('express');
var fs = require("fs");
var path = require('path');
// var favicon = require('serve-favicon'); //网页logo
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //session
var RedisStrore = require('connect-redis')(session); //redis
var config = require("./config");
var app = express();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var sessionConfig = config.sessionConfig;
app.use(session({
    name: "sid",
    secret: 'Asecret123-',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: sessionConfig.cookie,
    store: new RedisStrore(sessionConfig.sessionStore)
}));
//允许跨域
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", config.cros === "*" ? req.headers.origin : config.cros);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,x_requested_with");
    res.header("Access-Control-Allow-Credentials", "true");//跨域session
    if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    else  next();
});
// if (config.initMysql) {
require("./DAO/initMysql"); //初始化数据库
// config.initMysql=false;
//   fs.writeFile("config.json",JSON.stringify(config),function (err) {
//      if (err) throw err ;
//      console.log("initMysql and config reWrite!"); //文件被保存
//  }) ;
// }
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('This api is not exist!!!!!!!!!');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.jsonp({
            msg: err.message,
            error: err,
            status: "no"
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.jsonp({
        msg: err.message,
        error: err,
        status: "no"
    });
});


module.exports = app;