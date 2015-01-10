var crypto  = require('crypto')

var api_key = ""
var req = {}

/*
 *  Receives an array of string and sort it according to byte
 * values. Lowercase after uppercase
 */
var sort_bytes = function(input, cb) {
  var res_tmp = {}
  var res = {}
 
  //convert to bytes
  Object.keys(input).forEach(function(key){
    var tmp = []
    for(var i=0; i<key.length; i++) {
      tmp.push(key.charCodeAt(i)) 
    }
    res_tmp[key] = tmp
  })

  //sort by bytes
  var bytes = [] 
  for(var key in res_tmp) {
    bytes.push(res_tmp[key])
  }
   
  bytes.sort() 

  //push sorted results into dictionary
  bytes.forEach(function(chunk) {
    var tmp_str = ""
    for(var i=0; i<chunk.length; i++){
      tmp_str+=(String.fromCharCode(chunk[i]))
    }
    res[tmp_str] = req[tmp_str]
  })

  cb(res)
}

/*
 *  Creates signature based on sorted array
 */ 
var transform_str = function(input, cb) {
  var header = "GET\nwebservices.amazon.com\n/onca/xml\n"

  var keys = Object.keys(input)
  var str = ""
  for(var i = 0; i<keys.length; i++){
    str+=keys[i]+"="+input[keys[i]]
    if(i!=keys.length-1) str+="&"
  }

  //URI modifications
  str = str.replace(/,/g,'%2C').replace(/:/g,'%3A')
  var str_encode = header+str

  //encode URI
  var signature = encodeURIComponent(
    crypto.createHmac("sha256", api_key).update(str_encode).digest("base64"))
    
  cb(str+"&Signature="+signature)
}



var sign = function(_req, _key, cb) {
  api_key = _key
  req = _req

  sort_bytes(req, function(sorted){
    transform_str(sorted, function(res){
      cb(res)
    })
  })  
}

exports.sign = sign
