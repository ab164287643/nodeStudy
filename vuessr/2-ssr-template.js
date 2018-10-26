const Vue = require('vue')
const fs = require("fs");
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./2-vue-ssr-template.html', 'utf-8')
})

server.get('/', (req, res) => {
    const app = new Vue({
        data: {
            url: req.headers.host
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })

    //app 会注入模板中的 <!--vue-ssr-outlet--> 占位符中
    //我们还可以传入一个 "渲染上下文对象" 作为 renderToString 函数的第二个参数，来提供插值数据,并在模板中使用 {{}} 或者 {{{}}} 来渲染
    const context = {
        title: "This title is from context by inserted",
        meta: `
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        `
    }
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        console.log(html);//其实就是用vue在服务端运行，并产生一个字符串作为渲染内容
        res.send(html)
    })
})

const app = server.listen(3000, function () {
    let host = app.address().address;
    let port = app.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})

