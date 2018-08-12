// var http = require('http');
// http.createServer(function (request, response) {

//     // 发送 HTTP 头部 
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

// // 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8888/');

var express = require('express');
var app = express();

//中间件
app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next();
});


app.get('/', function (req, res) {
	let str = `
		${process.argv.toString()}
	<br/>`;
    res.send(str + 'Hello World! This is express server');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;


    console.log('Example app listening at http://%s:%s', host, port);
});
function compute (){
	console.log(1);
	process.nextTick(compute)
}
compute();