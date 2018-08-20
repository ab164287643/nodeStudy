const PORT = '3000';
const http = require('http');
const util = require('util');
const querystring = require('querystring');

const { URL } = require('url');//URL url的构造函数

//createServer http提供的简便创建服务器的用法

http.createServer(function(req, res) {
	let url = new URL(req.headers.host + req.url);
	console.log(req.headers.host + req.url);
	// let port = url.port;
	// let protocol = url.protocol;
	// let search = url.search;
	// let name = url.searchParams.get("name");

	// res.writeHead(200, { 'Content-Type': 'text/html' });
	// res.write(`
	// port + ${port},	
	// protocol + ${protocol},
	// search + ${search},
	// <br/> get name<br/>
	// name + ${name},
	// `);


	//处理post内容
	let post = "";
	req.on("data", function (chunk){
		post += chunk;
	});

	req.on("end", function (){
		post = querystring.parse(post);
		console.log(post);
		res.end(util.inspect(post));//返回
	});

	// res.end('<p>Hello World</p>');
}).listen(PORT);
console.log(`HTTP server is listening at port ${PORT}.`);

//完整版
// let server = new http.Server();

// server.on("request", function (req, res){
// 	console.log("listening 3000 and url is " + req.url);

// 	res.writeHead(200, { 'Content-Type': 'text/html' });
// 	res.write("this is the content from server");
// 	res.end('server already end\n');
// });
// server.listen(PORT);

// //显示了三次这也证明了TCP的三次握手
// server.on('connection', () => {
// 	a();
// });
// server.on('close', () => {
// 	console.log('server will close');
// });

// function a (){
// 	console.log("connect!!!")
// }