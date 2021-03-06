// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return rq(`https://api.pingcc.cn/?mhurl2=${
    encodeURI(event.mhurl2)
  }`).then(res => {
    res = JSON.parse(res);
    if(res.code == 0){
      if(res.list.length > 0){
        return res.list;
      }else{
        return false;
      }
    }
  }).catch(err => {
    console.log(err);
  })
}