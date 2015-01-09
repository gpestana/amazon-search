var crypto  = require('crypto'),
cred        = require('../credentials/cred.js')

/*
 *  Receives an array of string and sort it according to byte
 * values. Lowercase after uppercase
 */
var sort_bytes = function(input, cb) {
  var res_tmp = []
  var res = []
 
  //convert to bytes
  input.forEach(function(str){
    var tmp = []
    for(var i=0; i<str.length; i++) {
      tmp.push(str.charCodeAt(i)) 
    }
    res_tmp[str] = tmp
  })

  //sort by bytes
  var bytes = [] 
  for(var key in res_tmp) {
    bytes.push(res_tmp[key])
  }
   
  bytes.sort() 

  //push sorted results to array
  bytes.forEach(function(chunk) {
    var tmp_str = ""
    for(var i=0; i<chunk.length; i++){
      tmp_str+=(String.fromCharCode(chunk[i]))
    }
    res.push(tmp_str)
  })

  cb(res)
}

/*
 *  Creates signature based on sorted array
 */ 
var transform_str = function(input, cb) {
  var res = "GET\nwebservices.amazon.com\n/onca/xml\n"
  
  for(var i = 0; i<input.length; i++) {
    if(i == 0) res+=input[i]
    else res+="&"+input[i]
  }

  //encode URI
  res = res.replace(/,/g,'%2C').replace(/:/g,'%3A')
  cb(encodeURIComponent(
    crypto.createHmac("sha256", cred.api_key).update(res).digest("base64")))
}



var sign = function(url, cb) {
  var input = url.split('?')[1].split('&')
  sort_bytes(input, function(sorted){
    transform_str(sorted, function(str){
      url = url.replace(/,/g,'%2C').replace(/:/g,'%3A')
      cb(url+"&Signature="+encodeURIComponent(str))
    })
  })  
}

exports.sign = sign
