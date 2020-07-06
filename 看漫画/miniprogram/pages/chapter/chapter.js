// pages/chapter/chapter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterdata: [],
    page: 0,
    allpage: 0,
    topClass: "downtop",
    bottomClass: "downbottom",
    imgnum: 0,
    pageindex: 0,
    isShow: false,
    comicBox: "comichide",
    prevpage: 0,
    nextpage:  0,
    prevchapter: "",  //上一章节
    nextchapter: "",  //下一章节
    mhurl1: ""        //漫画详情
  },
  getContentDatas: function(name){  
    wx.cloud.callFunction({
      name: "manga_content",
      data: {
        mhurl2: name
      }
    }).then((res) => {
      if(res.result != null || res.result != false){
        this.setData({
          chapterdata : this.data.chapterdata.concat(res.result),
          imgnum: res.result.length
        })    
      }
    }).catch(err => {
      console.log(err);
    })
  },
  getMhnameDatas: function(name, page, allpage){
    wx.cloud.callFunction({
      name: "manga_detail",
      data: {
        mhurl1: name
      }
    }).then((res) => {
      let prevpage = 0;
      let nextpage = 0;

      wx.setNavigationBarTitle({
        title: res.result.list[page].num,
      })

      if((page - 1) <= 0){
        prevpage = 0
      }else{
        prevpage = page - 1;
      }
      if((page + 1) >= allpage){
        nextpage = allpage - 1;
      }else{
        nextpage = page + 1;
      }
      this.setData({
        prevchapter: res.result.list[prevpage],
        nextchapter: res.result.list[nextpage],
        prevpage: prevpage,
        nextpage: nextpage,
        page: page
      })
    }).catch(err => {
      console.log(err);
    })
  },
  //控制面板开关
  toggleShow: function(){
    if(this.data.isShow){
      this.setData({
        isShow: false,
        topClass: "downtop",
        bottomClass: "downbottom",
        comicBox: "comichide"
      })
    }else{
      this.setData({
        isShow: true,
        topClass: "ontop",
        bottomClass: "onbottom",
        comicBox: "comicshow"
      })
    }
  },
  //上一页的数据
  prevpagedata: function(){
    this.setData({
      chapterdata: [],      
    })
    this.getMhnameDatas(this.data.mhurl1, this.data.prevpage, this.data.allpage);
    this.getContentDatas(this.data.prevchapter.url);
  },
   //下一页的数据
  nextpagedata: function(){
    this.setData({
      chapterdata: [],
    })
    this.getMhnameDatas(this.data.mhurl1, this.data.nextpage, this.data.allpage);
    this.getContentDatas(this.data.nextchapter.url);
  },
 //返回 详情页
 gobackcomic: function(){
   wx.redirectTo({
     url: '../../pages/comic/comic?mhurl1='+this.data.mhurl1,
   })
 },
 //返回 首页
 gobackhome: function(){
   wx.switchTab({
     url: '../../pages/index/index',
   })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let name = options.mhurl2;
    let page = Number(options.page);
    let mhurl1 = options.mhurl1;
    let allpage = Number(options.allpage);

    this.setData({
      page: page,
      mhurl1: mhurl1,
      allpage: allpage
    })
    this.getMhnameDatas(mhurl1, page, allpage);
    this.getContentDatas(name);
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