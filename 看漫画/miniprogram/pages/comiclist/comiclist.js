// pages/comiclist/comiclist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comiclist: [],
    show: false,
    page: 1  //页数
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
          comiclist : this.data.comiclist.concat(res.result[0])
        })       
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getComicList: function(name){
    wx.showLoading({
      title: "加载中..."
    });
    wx.cloud.callFunction({
      name: 'manga_list',
      data: {
        mhlb: name+ '-' + this.data.page
      }
    }).then(res => {
      wx.hideLoading();
      for(let i = this.data.comiclist.length; i < (this.data.comiclist.length + 10); i++){
        if(i < res.result.length){
          this.getMhnameDatas(res.result[i]);
        }else if(i >= res.result.length){
          this.setData({
            show: true
          })
        }
      }      
    }).catch(err => {
      wx.hideLoading();
      console.log(err);
    })
  },
  //点击加载下一页
  getAddPage: function(){
    this.setData({
      page: (this.data.page + 1),
      comiclist: [],
      show: false
    });
    this.getComicList();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.mhname;
    let title = options.title;

    wx.setNavigationBarTitle({
      title: title
    })

    this.getComicList(name);     
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
    this.getComicList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})