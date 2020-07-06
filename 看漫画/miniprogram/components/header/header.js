// components/header/header.js
var myBehavior = require('../behavior/ma-behavior')
Component({
  behaviors: [myBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
 
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    addSearch: function(){      
      this.setData({
        searchShow: true
      })
      if(wx.pageScrollTo){
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    }    
  }
})
