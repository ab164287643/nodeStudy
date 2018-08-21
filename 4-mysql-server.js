var express = require('express');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mysql = require('mysql');
let app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser('ruidoc'));
app.use(urlencodedParser);

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
    insert(connection, sql, data, callback){
        connection.query(sql, data, function (error, results, fields) {
            if (error) throw error;
            callback(results.insertId);//返回插入的id
        });
    }
}

app.get("/", function (req, res){
    res.sendFile( __dirname + "/4-mysql.html");
});

app.post("/insert", function (req, res) {
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
        db.insert(connection, sql, body, function (id){
            console.log('inserted id is:' + id);
            res.send("insert OK!!!");
        });

        // res.send("insert OK!!!");
    }
    else{
        res.send("insert fail!!!");
    }
});



//服务器
let server = app.listen(port, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});