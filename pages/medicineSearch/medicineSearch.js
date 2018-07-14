// pages/medicineSearch/medicineSearch.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44,
    fSearch1: false,
    fSearch2: '',
    fnoSeatch: false,
    numberCount: 0
  },
  fSearch1: function (e) {
    var i;
    if (e.detail.value == '') {
      i = false;
    } else {
      i = true;
    }
    this.setData({
      fSearch1: i,
      fSearch2: e.detail.value 
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
    this.setData({
      fSearch2: options.selectrText
    });
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

    this.myQueryData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  userSubmitInput: function () {
    this.data.numberCount = 0;
   // this.myQueryData();
  },
  myQueryData: function () {
    var that = this;
    // var query = new AV.Query('Products');
    // query.descending('createdAt');
    // query.limit(10)// 返回 10 条数据
    var query = new AV.Query('Products');
    var cql = "select * from Products where title like '%" + this.data.fSearch2 + "%' or cName like '%" + this.data.fSearch2 + "%' or eName like '%" + this.data.fSearch2 + "%' order by showOrder limit " + this.data.numberCount + ",5";
    console.log("查询记录条数的【cql】：" + cql);
    AV.Query.doCloudQuery(cql).then(function (data) {
      //console.log(data);
      //var bean = new Page();
      //bean.setPageNo(pageNo); //设置当前页  
      var products = data.results;
      //console.log(products);
      if (that.data.numberCount == 0) {
        that.checkNodata(products);
        that.setData({ products });
      }
      else {
        wx.showToast({
          title: '努力加载中',
          icon: 'loading',
          duration: 2000
        });
        //追加
        that.data.numberCount += products.length;
        var old_list = that.data.products;
        for (var i = 0; i < products.length; i++) {
          old_list.push(products[i]);
        };
        that.setData({
          products: that.data.products
        });
        //wx.hideToast();
      }
    }, function (error) {
      console.log(error);
    });

    // query.skip = 2
    // query.find().then(function (products) {
    //  that.setData({ products });
    // console.log(products);
    // })
    //  .catch(console.error);
  },
  checkNodata: function (data) {
    this.data.numberCount += data.length;
    if (data.length > 0) {
      this.setData({
        fnoSeatch: false
      });
    }
    else {
      this.setData({
        fnoSeatch: true
      });
    }
  }
})