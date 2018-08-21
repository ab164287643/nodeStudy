var express = require('express');
var multer = require('multer');
var app = express();
const port = 3000;

var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;


    console.log('Example app listening at http://%s:%s', host, port);
});
app.get('/', function (req, res) {
    // res.send('Hello World! This is express server');
    res.sendFile(__dirname + "/3-formSubmit-Fronted.html");
});
app.post('/formhander', urlencodedParser, function (req, res) {
    console.log(req);
    res.json({ userName: req.body.userName, password: req.body.password });
    
});

var upload = multer({ dest: './uploads/' }); //保存在uploads文件夹中  multer是一个构造函数
//文件上传   单文件上传
app.post('/fileupload', upload.single("file"), function (req, res, next) {
    console.log(req.file);//文件对象   file非前端的name
    res.send("upload success!!!");
});
//多文件上传  
app.post('/multi-fileupload', upload.array("files", 12)/*12 是文件限制个数*/, function (req, res, next) {
    console.log(req.files);//文件对象数组  files 非前端的name    
    res.send("upload success!!!");
});

//多文件上传
var cpUpload = upload.fields([{ name: 'files1', maxCount: 3 }, { name: 'files2', maxCount: 8 }]);//分别设置每个字段的上传的文件个数限制
app.post('/multi-fileupload2', cpUpload, function (req, res, next) {
    console.log(req.files['files1']);//文件对象 
    console.log(req.files['files2']);//两个 fields的  file对象  
    res.send("upload success!!!");
});
