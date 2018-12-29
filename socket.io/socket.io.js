let express = require('express');
let app = express(); //express 
let http = require('http').Server(app);
let fs = require("fs")

let port = 3000;

//教程 https://www.w3cschool.cn/socket/socket-odxe2egl.html
//两个服务器在一起 都来自于 localhost:3000
//启动socketio 并将socketio绑定到http服务器上面
//监听的是客户端的事件
//触发的也是客户端的事件   所以下面两个事件一样，并不是相互监听和触发
let io = require('socket.io')(http, {
    // path: "customSocketIo",
    serveClient: false,//是否提供客户端文件（true ）
    pingInterval: 10000, //有多少ms没有乒乓包考虑连接close（60000）
    pingTimeout: 5000, //发送新的ping packet（25000）之前有多少ms 。
}); 
io.on('connection', function (socket) {
    //注意 emit是挂在io下面的
    socket.on('person1', function (data, cb) {
        console.log("namespace-main");
        io.emit('person2', data);
        cb("发送成功了，由person1发送给person2");
    });

    socket.on('person2', function (data, cb) {
        io.emit('person1', data);
        cb("发送成功了，由person2发送给person1");
    });

    socket.on('disconnect', function () {
        io.emit('user disconnected');
    });

});
//生成一个namespace  其实还是共用 上面io的那个连接
const namespace = io.of("namespace1");
namespace.on('connection', function (socket) {
    socket.on('person1', function (data, cb) {
        console.log("namespace1");
        io.emit('person1', data);
        io.emit('person2', data);
        io.emit('person3', data);
        cb("发送成功了，由person1发送给所有人");
    });
})
//获取有多少个客户机ID连接在这个服务器上面
namespace.clients((error, clients) => {
    if (error) throw error;
    console.log(clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
});



app.get("/socketio1", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync("socket.io1.html", 'utf-8'));
});
app.get("/socketio2", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync("socket.io2.html", 'utf-8'));
});
app.get("/socketio3", function (req, res) {
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync("socket.io3.html", 'utf-8'));
});
let server = http.listen(port, function () {

    let host = server.address().address;
    console.log('Example app listening at http://%s:%s', host, port);
});