const dns = require("dns");

dns.lookup('survey.seevin.com', function (err, address, family) {
    if (err) throw err;
    console.log('例子A: ' + address + "---" + family );
});

//一个域名可能对于多个地址
dns.lookup('www.baidu.com', {all: true}, function (err, address, family) {
    if (err) throw err;
    console.log('例子B: ' + JSON.stringify(address) );
});