// pages/index/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [],
    rhdatas: [],
    gtdatas:[],
    gcdatas: []
  },
  getMhnameDatas: function(name, listname){
    wx.cloud.callFunction({
      name: "manga_search",
      data: {
        mhname: name
      }
    }).then((res) => {      
      if(res.result != null || res.result != false){
        switch(listname){
          case "rh":
            this.setData({
              rhdatas : this.data.rhdatas.concat(res.result[0])
            })
            break;
          case "gc":
            this.setData({
              gcdatas : this.data.gcdatas.concat(res.result[0])
            })
            break;
          case "gt":
            this.setData({
              gtdatas : this.data.gtdatas.concat(res.result[0])
            })
            break;
        }        
      }
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    const randomNum = app.numRandom(app.localManga.namelist.length, 5);
    for(let i = 0; i < randomNum.length; i++){
      wx.cloud.callFunction({
        name: 'manga_search',
        data: {
          mhname: app.localManga.namelist[randomNum[i]].name
        }
      }).then(res => {
        this.setData({
          bannerList: this.data.bannerList.concat(res.result[0])
        })
      }).catch(err => {
        console.log(err);
      })
    }
    //日韩
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: "riben"
      }
    }).then(res => {      
      const rn = app.numRandom(res.result.length, 6);
      for(let i = 0; i < rn.length; i++){
        this.getMhnameDatas(res.result[rn[i]], "rh");
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
    })
    //国产
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: "dalu"
      }
    }).then(res => {      
      const rn = app.numRandom(res.result.length, 6);
      for(let i = 0; i < rn.length; i++){
        this.getMhnameDatas(res.result[rn[i]], "gc");
      }
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
    })
    //港台
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: "gangtai"
      }
    }).then(res => {      
      const rn = app.numRandom(res.result.length, 6);
      for(let i = 0; i < rn.length; i++){
        this.getMhnameDatas(res.result[rn[i]], "gt");
      };
      wx.hideLoading();
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})