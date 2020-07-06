// pages/rank/rank.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankdatas: [],
    show: false
  },
  getMhnameDatas: function(name){
    wx.cloud.callFunction({
      name: "manga_search",
      data: {
        mhname: name
      }
    }).then((res) => {      
      if(res.result != null || res.result != false){
        this.setData({
          rankdatas : this.data.rankdatas.concat(res.result[0]),
          show: true
        });
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
    //排行
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: "hot"
      }
    }).then(res => {      
      const rn = app.numRandom(res.result.length, 10);
      for(let i = 0; i < rn.length; i++){
        this.getMhnameDatas(res.result[rn[i]]);
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