let settings = {
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "cache": "no-cache",
    "X-PAYPAL-SECURITY-USERID": "leslieliang9838-facilitator_api1.g.ucla.edu",
    "X-PAYPAL-SECURITY-PASSWORD": "J84RNPTVRD4SQQJJ",
    "X-PAYPAL-SECURITY-SIGNATURE": "AgbTXNob8HdpRCh-juxF8LVsYo-IA0apfP8pJevw.CtWNXDvA0nCcJe-",
    "X-PAYPAL-REQUEST-DATA-FORMAT": "JSON",
    "X-PAYPAL-RESPONSE-DATA-FORMAT": "JSON",  
    "X-PAYPAL-APPLICATION-ID": "APP-80W284485P519543T" 
  },
  "body": JSON.stringify({
      "actionType": "PAY",
      "currencyCode": "USD",
      "receiverList": {
        "receiver": [{
          "amount": "20.00",
          "email": "preetham@hotmail.com"
        }]
      },
      "returnUrl": "https://google.com",
      "cancelUrl": "https://example.com/failure.html",
      "requestEnvelope": {
        "errorLanguage": "en_US",
        "detailLevel": "ReturnAll"
      }
  })
}

fetch('https://svcs.sandbox.paypal.com/AdaptivePayments/Pay', settings).then(function (response) {
  console.log(response.json())
}, function(error) {
  alert('Error: Failed to complete transaction with PayPal')
})