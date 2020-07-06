// pages/comic/comic.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comicdata: null,
    chapterdata: [],
    arrdatas: [],
    mhurl1: "",
    mhurl2: "",
    allpage: 0
  },
  getMhnameDatas: function(name){
    wx.cloud.callFunction({
      name: "manga_detail",
      data: {
        mhurl1: name
      }
    }).then((res) => {
      wx.setNavigationBarTitle({
        title: res.result.data.name
      })
      this.setData({
        comicdata: res.result.data,
        chapterdata: res.result.list,
        allpage: res.result.list.length,
        mhurl2: res.result.list[0].url
      })
    }).catch(err => {
      console.log(err);
    })
  },
  getYouLikeDatas: function(name){
    wx.cloud.callFunction({
      name: "manga_search",
      data: {
        mhname: name
      }
    }).then((res) => {      
      this.setData({
        arrdatas : this.data.arrdatas.concat(res.result[0])
      })
    }).catch(err => {
      console.log(err);
    })
  },
  //点击阅读
  readClick: function(){
    wx.redirectTo({
      url: `../../pages/chapter/chapter?mhurl2=${
        this.data.mhurl2
      }&page=0&mhurl1=${
        this.data.mhurl1
      }&allpage=${
        this.data.allpage
      }`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.mhurl1;
    this.setData({
      mhurl1: name
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getMhnameDatas(name);
    //推荐
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: "new"
      }
    }).then(res => {  
      wx.hideLoading();    
      const rn = app.numRandom(res.result.length, 6);
      for(let i = 0; i < rn.length; i++){
        this.getYouLikeDatas(res.result[rn[i]]);
      }      
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