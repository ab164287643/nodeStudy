const CryptoJS = require('crypto-js');
const { Base64 } = require("js-base64")
let secret = "8Xt7aLWDYF7EbFWM9UF4bi2yOpTACmj6UK1lGde9mVW1jZeVfiVNzsHke4yxeBdg";
let timeStamp = new Date().getTime();
var hash = CryptoJS.HmacSHA256(timeStamp, secret);
var hashInBase64 = Base64.encode(hash);


console.log(timeStamp);
console.log(encodeURIComponent(hashInBase64));