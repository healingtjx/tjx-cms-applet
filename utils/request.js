// var ajax_domain = "https://other.chsgw.com";
var ajax_domain = "http://127.0.0.1:8081";

//基础请求
function httpRequest(type, url, data, authorised, disposeError, callback, errFun, token) {
  var requsetObj = {
    url: url,
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: type,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      res = res.data;
      if (disposeError && res.code != 200) {
        //提示错误消息
        wx.showToast({
          title: res.message,
        });
        return;
      }
      callback(res.data);
    },
    fail: function(err) {
      errFun(err);
    }
  }
  if (authorised){
    requsetObj.header['Authorization'] ='Bearer 1eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjM1OTEzNTMsInN1YiI6IjEiLCJjcmVhdGVkIjoxNjIyOTg2NTUzOTI5fQ.geXRUkbG0LMW8x8GxfXoC-sh5ZXRpi-anGWBVeMaVjBbaUDtYA_H3vextf2kXsOhv76gKI9qqdvqxQes1TWSVQ';
  }
  wx.request(requsetObj);
}


//GET基础请求
function baseGET(url, data, authorised, disposeError, callback, errFun) {
  url = ajax_domain + url;
  httpRequest("GET", url, data, authorised, disposeError, callback, errFun)
}
//POST基础请求
function basePOST(url, data, authorised, disposeError, callback, errFun) {
  url = ajax_domain + url;
  httpRequest("POST", url, data, callback, errFun)
}
//GET
function GET(url,data,callBack){
  baseGET(url,data,false,true,callBack,null)
}
//POST
function POST(url, data, callBack){
  basePOST(url, data, false, true, callBack, null)
}
//需要带登陆信息的GET
function securityGET(url, data, callBack){
  baseGET(url, data, true, true, callBack, null)
}
//需要带登陆信息的POST
function securityPOST(url, data, callBack) {
  basePOST(url, data, true, true, callBack, null)
}

exports.GET = GET;
exports.POST = POST;
exports.securityGET = securityGET;
exports.securityPOST = securityPOST;
exports.ajax_domain = ajax_domain;