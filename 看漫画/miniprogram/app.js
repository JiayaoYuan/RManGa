//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  globalDatas: {
   
  },
  localManga: {
    namelist: [
          {"name" : "斗破苍穹"},
          {"name" : "绝世唐门"},
          {"name" : "斗罗大陆"},
          {"name" : "凤逆天下"},
          {"name" : "风起苍岚"},
          {"name" : "武动乾坤"},
          {"name" : "神印王座"},
          {"name" : "斗罗大陆3龙王传说"},
          {"name" : "斗破苍穹之大主宰"},
          {"name" : "穿越西元3000后"},
          {"name" : "血族禁域"},
          {"name" : "妖神记"},
          {"name" : "寻找前世之旅"},
          {"name" : "地府我开的"},
          {"name" : "X龙时代"},
          {"name" : "元尊"},
          {"name" : "完美世界"},
          {"name" : "三眼哮天录"},
          {"name" : "我被总裁黑上了！"},
          {"name" : "不嫁总裁嫁男仆"},
          {"name" : "重生豪门之强势归来"},
          {"name" : "姻缘宝典"},
          {"name" : "妃夕妍雪"},
          {"name" : "斗罗大陆外传神界传说"},
          {"name" : "王爵的恋爱物语"},
          {"name" : "网游之近战法师<"},
          {"name" : "偷星九月天"},
          {"name" : "奇怪的苏夕"},
          {"name" : "豪门天价前妻"},
          {"name" : "因爱宠你"},
          {"name" : "很纯很美好"},
          {"name" : "星武神诀"},
          {"name" : "绝世武神"},
          {"name" : "灵剑尊"},
          {"name" : "明星是血族"},
          {"name" : "逆天邪神"},
          {"name" : "皇后娘娘的五毛特效"},
          {"name" : "渣男总裁别想逃"},
          {"name" : "女子学院的男生"},
          {"name" : "帝豪老公太狂热"},
          {"name" : "国民老公带回家：偷吻55次"},
          {"name" : "中华神医"},
          {"name" : "冷情殿下：捉弄小萌妻"},
          {"name" : "神医嫡女"},
          {"name" : "万丈光芒不及你"},
          {"name" : "吸血鬼男神"},
          {"name" : "王牌校草"},
          {"name" : "骑士幻想夜"}
      ]
  },
  numRandom: function (long, geshu) {
    var num = new Array();
    var newnum = 0;
    var isok = false;
    for(var i = 0; i < geshu; i++){                 
      do{
        var count = 0;
        newnum = Math.floor((Math.random()*long));
        for(var i = 0; i < num.length; i++){              
          if(newnum != num[i]){
            count++;                
          }
        }
        if(count != num.length){
          isok = true; 
        }else if(count == num.length){
          isok = false;
        }
      }while(isok);
      num.push(newnum);         
    }
    return num;
  }
})
