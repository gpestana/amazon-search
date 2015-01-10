var request = require('request'),
cred        = require('./credentials/cred.js'),
utils       = require('./src/amazon_utils.js')

var key = cred.api_key
var ts = generateTimestamp()

var req_test = {
  'Service':'AWSECommerceService',
  'AWSAccessKeyId': 'AKIAIOSFODNN7EXAMPLE',
  'Operation': 'ItemLookup',
  'ItemId':'0679722769',
  'ResponseGroup': 'ItemAttributes,Offers,Images,Reviews',
  'Version':'2009-01-06',
  'Timestamp':'2009-01-01T12:00:00Z'
}


var req = {
  'Service':'AWSECommerceService',
  'AWSAccessKeyId': key,
  'Operation': 'ItemSearch',
  'Keywords': 'Rocket',
  'SearchIndex':'Toys',
  'Timestamp': ts
}



//key = "1234567890"
utils.sign(req, key, function(url_sign){

  var path = "http://webservices.amazon.com/onca/xml?"

  request.get(path+url_sign).
    on('response', function(res) {
      console.log(res.statusCode)
    }).
    on('error', function(err) {
      console.log(err)
  })

})


