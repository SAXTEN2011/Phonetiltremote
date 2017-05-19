var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');

app.get('/', function (req, res) {
    res.sendfile('./public/index.html');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));
http.listen(3000, function () {
    console.log('listening on *:3000');
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('updatePos', function (t) {
            // console.log(t.toString());
            fs.writeFile("C:/Users/Aaron/PhoneMouseController/public/mouseRot.txt", t[0].toString(), function (err, data) {
                if(err) return console.log(err);
            });
            fs.writeFile("C:/Users/Aaron/PhoneMouseController/public/mouseYaw.txt", t[1].toString(), function (err, data) {
                if(err) return console.log(err);
            });
        });
        socket.on('click', function () {
            fs.writeFile("C:/Users/Aaron/PhoneMouseController/public/mouseClick.txt", "click", function (err, data) {
                if(err) return console.log(err);
            });
        });
    });


});

module.exports = app;