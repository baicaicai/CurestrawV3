// pages/medicineDetai/medicineDetai.js
var AV = getApp().globalData.AV;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/img-17.jpg',
      '../../images/img-17.jpg',
      '../../images/img-17.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 300,
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44,

    objectId: "",
    product: {},
    productorther:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      objectId: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var query = new AV.Query('Products');
    query.get(this.data.objectId).then(function (results) {
      return results.toJSON();
    }).then(function (results) {
      that.setData({
        product: results
      })
      //console.log(that.data.product);
      that.sreachOrher(that, results);
    });
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
  sreachOrher: function (that, results) {
    var query = new AV.Query('Products');
    query.descending('createdAt');
    query.notEqualTo("manufactor", results.manufactor);
    query.equalTo("cName", results.cName);
    query.limit(2)// 返回 2 条数据
    query.find().then(function (productorther) {
      that.setData({productorther});
     // console.log(productorther);
    })
      .catch(console.error);
  }
})