// components/search/search.js
var myBehavior = require('../behavior/ma-behavior')
Component({
  behaviors: [myBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    searchShow: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchdata: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getMhnameDatas: function(e){
      //赋值前清空
      this.setData({
        searchdata: []
      })
      const name = e.detail.value;   
      wx.cloud.callFunction({
        name: "manga_search",
        data: {
          mhname: name
        }
      }).then((res) => {      
        if(res.result != null || res.result != false){
          this.setData({
            searchdata : this.data.searchdata.concat(res.result[0])
          })    
        }
      }).catch(err => {
        console.log(err);
      })
    },
    searchhide: function(){
      this.setData({
        searchShow: false
      })
    }
  }
})
