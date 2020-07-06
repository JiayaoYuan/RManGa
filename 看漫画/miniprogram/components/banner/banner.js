// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList: {
      type: Array,
      default: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 在组件实例刚刚被创建时执行
 created: function () {
   
 },
 // 在组件实例进入页面节点树时执行
 attached: function () {
   
 },

 // 在组件在视图层布局完成后执行
 ready: function () {

 },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
