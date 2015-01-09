var request = require('request'),
cred        = require('./credentials/cred.js'),
utils       = require('./src/amazon_utils.js')

var req_url = 'http://webservices.amazon.com/onca/xml?Service=AWSECommerceService'+
  '&AWSAccessKeyId='+cred.api_key+'&Operation=ItemLookup&ItemId=0679722769'+
  '&ResponseGroup=ItemAttributes,Offers,Images,Reviews&Version=2009-01-06'+
  '&Timestamp=2009-01-01T12:00:00Z'

utils.sign(req_url, function(url_sign){
  request.get(url_sign).
    on('response', function(res) {
      console.log(res.statusCode)
    }).
    on('error', function(err) {
      console.log(err)
  })
})


