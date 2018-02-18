// pages/medicineAsk/medicineAsk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/img-18.jpg',
      '../../images/img-18.jpg',
      '../../images/img-18.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  specialistScheme: function () {
    if (getApp().globalData.user == null || getApp().globalData.user.mobilePhoneVerified != true) {
      // console.log(getApp().globalData.user);
      wx.navigateTo({
        url: '/pages/telVerification/telVerification'
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/casesMy/casesMy'
      })
    }
  },
})