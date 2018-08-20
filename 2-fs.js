let fs = require("fs");
// fs.open("test.txt", "w+", function (err, fd){
//     //fs  打开的文件指针
//     if (err){
//         console.log(err);
//     }
//     else{
//         var bf = Buffer.from("12313");
//         fs.write(fd, bf, 0, 3, null, function (err, len, buffer) {

//             //将buffer对象里的数据写入文件夹中
//             console.log(err);//null
//             console.log(len);//3
//             console.log(buffer);//<Buffer 61 61 61 00 00>
//         })
//     }
// });
fs.watch(".", { recursive: true}, function (eventType, fileName){
    console.log(eventType);
    if (fileName) {
        console.log(`提供的文件名: ${fileName}`);
    } else {
        console.log('未提供文件名');
    }
});