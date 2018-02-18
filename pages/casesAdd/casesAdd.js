// pages/casesAdd/casesAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44,
    picBox: [],
    date: '请选择',
    index1:0,
    array1: ['请选择', '癌症', '感冒', '破皮'],
    index2: 0,
    array2: ['请选择', 'I', 'II', 'III','IV'],
    taNum : 0
  },
  bindPickerChange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  ta1:function(e){
    this.setData({
      taNum: e.detail.value.length
    })
  },
  picUpload:function(event){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        var i ;
        if (that.data.picBox.length >= 3){
          i = that.data.picBox;
          i.unshift(res.tempFilePaths);
          i.pop();

        }else{
          i = that.data.picBox;
          i.unshift(res.tempFilePaths);
        }

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          picBox: i
        });
      }
    })
  },
  picDel:function(e){

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
  
  }
})