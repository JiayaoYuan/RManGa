// 云函数入口文件
const cloud = require('wx-server-sdk')
const rq = require('request-promise')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let arrdatas = new Array();

  return rq(`https://api.pingcc.cn/?mhname=${
    encodeURI(event.mhname)}
    `).then(res => {
    res = JSON.parse(res);
    if(res.code == 0){
      if(res.list.length > 0){
        res.list.forEach(item => {
          if(item.url != null){
            arrdatas.push(item);
          }
        });
        return arrdatas;
      }
    }else{
      return false;
    }
  }).catch(err => {
    console.log(err);
  })
}