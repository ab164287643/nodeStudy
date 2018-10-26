const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.headers.host
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    console.log(html);//其实就是用vue在服务端运行，并产生一个字符串作为渲染内容
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

const app = server.listen(3000, function () {
    let host = app.address().address;
    let port = app.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})