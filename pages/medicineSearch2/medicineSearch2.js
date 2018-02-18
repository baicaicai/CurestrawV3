// pages/medicineSearch2/medicineSearch2.js
var AV = getApp().globalData.AV;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44,
    fSearch1: false,
    fSearch2: '',
    products: []
  },
  fSearch1: function (e) {
    var i;
    if (e.detail.value == '') {
      i = false;
    } else {
      i = true;
    }
    this.setData({
      fSearch1: i
    });
  },
  fSearch2: function (e) {
    this.setData({
      fSearch2: '',
      fSearch1: false
    });
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
    var that = this;
    var query = new AV.Query('Products');
    query.descending('createdAt');
    query.limit(10)// 返回 10 条数据
    // query.skip = 2
    query.find().then(function (products) {
      that.setData({ products });
      // console.log(products);
    })
      .catch(console.error);
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