
var express = require('express');
var app = express();


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;


    console.log('Example app listening at http://%s:%s', host, port);
});

//中间件
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});
// 定制 404 页面
// app.use(function (req, res, next) {
//     res.type('text/plain');
//     res.status(404);
//     res.send('404 - Not Found');
// });
//路由
app.get('/', function (req, res) {
    // res.send('Hello World! This is express server');
    res.sendFile( __dirname + "/3-formSubmit-Fronted.html");
});
app.get('/about', function (req, res) {
    res.send('Hello World! about Router!');
});
//查看header信息
app.get('/headers', function (req, res) {
    res.set('Content-Type', 'text/plain');
    var s = '';
    for (var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
});
app.get('/no-layout', function (req, res) {
    res.render('no-layout', { layout: null });
});



