var express = require('express');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mysql = require('mysql');
var multipart = require('connect-multiparty');
let app = express();
const port = 3030;

//全局header
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser('ruidoc'));
app.use(urlencodedParser);
var multipartMiddleware = multipart();//处理由formData传过来的的数据（它是不存在body当中的，存在payLoad中的）
//DB 设置
//详细访问 
let db = {
    connection (){
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'nodeStudy',
            port: 3306
        });
        connection.connect(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
        return connection;
    },
    close(connection) {
        connection.end(function (err) {
            if (err) {
                return;
            } else {
                console.log('关闭连接');
            }
        });
    },
    query(connection, sql, data, callback){
        connection.query(sql, data, function (error, results, fields) {
            callback(error, results);//返回插入的id
        });
    },
}
var responseJSON = function (res, msg, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '201', msg: '操作失败', data: []
        });
    } else {
        res.json({
            code: 200,
            msg: msg,
            data: ret
        });
    }
};

app.get("/", function (req, res){
    res.header("Content-Type", "text/html;charset=utf-8");
    res.sendFile( __dirname + "/4-mysql.html");
});

app.post("/insert", multipartMiddleware, function (req, res) {
    if (req.body.userName && req.body.password){
        let body = {
            userID: new Date().getTime(),
            userName: req.body.userName,
            password: req.body.password,
            email: req.body.email,
            createTime: new Date(),
        };
        let connection = db.connection();
        sql = "INSERT INTO user SET ?";
        db.query(connection, sql, body, function (error, results){
            // console.log('inserted id is:' + id);
            if (error){
                responseJSON(res);
            }
            else{
                //成功
                //获取所有的数据
                sql = 'SELECT * FROM user';
                db.query(connection, sql, {}, function (error, InnerResults) {
                    if (error) {
                        responseJSON(res);
                    }
                    else{
                        responseJSON(res, "插入成功", InnerResults);
                    }
                });
            }
        });

        // res.send("insert OK!!!");
    }
    else{
        res.send("insert fail!!!");
    }
});

app.get("/mock", function (req, res){
    res.json({
        "title": "this is the title from port:3030,changed"
    });
})

app.get('/random', 
    function (req, res, next){
        if (Math.random() > 0.33){
            return next();
        }
        res.send("0.33 to first router");
    },
    function (req, res, next){
        if (Math.random() > 0.5){
            return next();
        }
        res.send("0.33 to second router");
    },
    function (req, res){
        res.send("0.33 to third router");
    }
);
//正则router
app.get(/crazy|mad(ness)?|lunacy/, function (req, res){
    res.send("userName router from regExp111");
})


//服务器
let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});