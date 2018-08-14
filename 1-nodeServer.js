const PORT = '3000';
const http = require('http');
http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('<h1>Node.js</h1>');
	res.write('<p>Node.js</p>');
	res.end('<p>Hello World2222</p>');
}).listen(PORT);
console.log(`HTTP server is listening at port ${PORT}.`);