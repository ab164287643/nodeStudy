var express = require('express');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser('ruidoc'));
app.use(urlencodedParser);

app.get('/', function (req, res) {
    // res.send('Hello World! This is express server');
    res.sendFile(__dirname + "/3-formSubmit-Fronted.html");
});
app.post('/formhander', urlencodedParser, function (req, res) {
    console.log(req);
    res.json({ userName: req.body.userName, password: req.body.password });
    
});
//配置
let storage = multer.diskStorage({
    filename (req, file, callBack) {
        var fileFormat = (file.originalname).split(".");
        callBack(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    },
    destination (req, file, callBack) {
        callBack(null, './uploads');
    }, 
});
var upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }

}); //保存在uploads文件夹中  multer是一个构造函数
//文件上传   单文件上传
app.post('/fileupload', upload.single("file"), function (req, res, next) {
    console.log(req.file);//文件对象   file非前端的name

    //设置签名cookie
    res.cookie('signedCookie', true, {
        'signed': true
    });

    //获取客户端传来的cookie 注意获取cookie必须use cookie-parser
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)//signed cookie在客户端存储是经过加密的

    res.send("upload success!!!");
});
//多文件上传  
/*12 是文件限制个数*/
app.post('/multi-fileupload', upload.array("files", 12), function (req, res, next) {
    console.log(req.files);//文件对象数组  files 非前端的name 
    let host = req.headers.host;   
    let htmlStr = "";
    // req.files.forEach((v) => {
    //     htmlStr += `<a href = "${host}\\${v.path}">${v.path}</a><br/>`
    // });

    //设置cookie
    res.cookie("isLogin", true);
    //获取cookie  从header中获取



    res.send(htmlStr + '<br /> "upload success!!!"');
});

//多文件上传
var cpUpload = upload.fields([{ name: 'files1', maxCount: 3 }, { name: 'files2', maxCount: 8 }]);//分别设置每个字段的上传的文件个数限制
app.post('/multi-fileupload2', cpUpload, function (req, res, next) {
    // console.log(req.files['files1']);//文件对象 
    // console.log(req.files['files2']);//两个 fields的  file对象  
    res.send("upload success!!!");
});

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;


    console.log('Example app listening at http://%s:%s', host, port);
});
