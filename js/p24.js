
  const p24UserId = 115535;
  const p24RaportKey = "713094fe364449974cd01642543bef89";
  const p24CRC = "60f684f52934f8cb";
  var p24Token = null;
  var p24Error = null;
  var p24ErrorCode = null;

  const p24MerchantId = p24UserId;
  const p24PosId = p24UserId;
  var p24SessionId = "session_1568013055025";
  var p24Amount = 1000;
  var p24Currency = 'PLN';
  var p24Description = 'Some test description';
  var p24ClientEmail = 'client@email.com';
  var p24Client = 'ClientName ClientSurnames';
  var p24ClientAddress = 'adres 99'
  var p24Zip = '00-000';
  var p24City = 'City';
  var p24ClientCountry = 'PL';//ISO
  var p24ClientPhone = '48222323232132';
  var p24ClientLanguage = 'pl';//ISO
  var p24Method = 32;
  var p24UrlReturn ='https://bronda.pl';
  var p24UrlStatus = 'https://meble-bronda.pl?status=HELLO';
  const p24TimeLimit = 0;
  const p24Channel = 16;
  var p24Shipping = 0;
  var p24TransferLabel = 'My Transfer label';
  var p24SDKVersion = '';
  const p24Sign = generateSign();
  var p24Encoding = 'UTF-8';
  var p24MethodRefId = '';
function sendTx(p24SessionId,p24Amount,p24Currency,p24Description,p24ClientEmail,p24Client,p24ClientAddress,p24Zip,p24City,p24ClientCountry,p24ClientPhonep,p24ClientLanguage,p24TransferLabel){
  var p24Cart = [
    {
    "sellerId": "cotam.pl",
    "sellerCategory": "abonamenty",
    "name": "abonament 40",
    "description": "abonament 40 dla otrzymanja 40 ogoszen",
    "quantity": 1,
    "price": p24Amount,
    "number": "1"
    }
  ]

  var data = JSON.stringify({
    "merchantId":p24MerchantId,
    "posId":p24PosId,
    "sessionId":p24SessionId,
    "amount":p24Amount,
    "currency":p24Currency,
    "description":p24Description,
    "email":p24ClientEmail,
    "client":p24Client,
    "address":p24ClientAddress,
    "zip":p24Zip,
    "city":p24City,
    "country":p24ClientCountry,
    "phone":p24ClientPhone,
    "language":p24ClientLanguage,
    // "method":p24Method,
    "urlReturn":p24UrlReturn,
    "urlStatus":p24UrlStatus,
    "timeLimit":p24TimeLimit,
    "channel":p24Channel,
    "shipping":p24Shipping,
    "transferLabel":p24TransferLabel,
    "sdkVersion":p24SDKVersion,
    "sign":generateSign(p24SessionId,p24Amount,p24Currency),
    "encoding":p24Encoding,
    "methodRefId":p24MethodRefId,
    "cart":p24Cart,
  });

  var settings = {
  "async": false,
  "crossDomain": true,
  "url": "https://sandbox.przelewy24.pl/api/v1/transaction/register",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(p24UserId + ":" + p24RaportKey),
  },
  "processData": false,
  "data":data,
};

  $.ajax(settings)
  .fail(function(error){
    console.log(error);
    setP24Error(error.responseJSON.error);
    setP24ErrorCode(error.responseJSON.code);
  })
  .done(function(response) {
    setP24Token(response.data.token);
    // console.log(window.p24Token);
    redirectToP24();
  });
}

  function allPaymentMethods(){
    var settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://sandbox.przelewy24.pl/api/v1/payment/methods/"+p24ClientLanguage,
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Basic " + btoa(p24UserId + ":" + p24RaportKey),
    },
    "processData": false,
    "data":"some data",
    }
    $.ajax(settings)
    .fail(function(error){
      console.log(error);
    })
    .done(function(response) {
      // console.log(response);
    });
  }

  function redirectToP24(){
    window.location.href = "https://sandbox.przelewy24.pl/trnRequest/" + window.p24Token;
  };
  function setP24Token(p24Token){
    window.p24Token = p24Token;
  };

  function setP24Error(p24Error){
    window.p24Error = p24Error;
  };

  function setP24ErrorCode(p24ErrorCode){
    window.p24ErrorCode = p24ErrorCode;
  };
  function setP24SessionId(p24ErrorCode){
    window.p24SessionId = p24SessionId;
  };
  function generateSign(p24SessionId,p24Amount,p24Currency){
    const shaObj = new jsSHA("SHA-384", "TEXT", { encoding: "UTF8" });
    var strToHash = '{"sessionId":"' + p24SessionId + '","merchantId":' + p24MerchantId + ',"amount":' + p24Amount + ',"currency":"' + p24Currency + '","crc":"' + p24CRC + '"}';
    shaObj.update(strToHash);
    var sign = shaObj.getHash("HEX");
    return sign;
  };
