//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  getUserInfo: function(e) {
  },

  homeClick: function (e) {
    wx.switchTab({ url: '/pages/home/home' })
  },
  medicineListClick: function (e) {
    wx.switchTab({ url: '/pages/medicineList/medicineList' })
  },
  myClick: function (e) {
    wx.switchTab({ url: '/pages/my/my' })
  }
})
