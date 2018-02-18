// pages/telVerification/telVerification.js
var AV = getApp().globalData.AV;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ztlH: getApp().globalData.ztlH,
    ztlH2: getApp().globalData.ztlH + 44,
    showSMBtn:true,
    userPhone: '',
    userPhoneCheck: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (getApp().globalData.user != null) {
      this.setData({
        userPhone: getApp().globalData.user.mobilePhoneNumber
      });
    } 
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

  userPhoneInput: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userPhone: value
    });
  },

  userPhoneCheckInput: function ({
    detail: {
      value
    }
  }) {
    this.setData({
      userPhoneCheck: value
    });
  },


  wechatLogin: function (e) {
    wx.showToast({
      title: '请等待..',
      icon: 'loading',
      duration: 5000
    })
    AV.User.loginWithWeapp().then(user => {
      getApp().globalData.user = user.toJSON();
      user.setMobilePhoneNumber(this.data.userPhone);
      //console.log(user.save());
      return user.save();
    }).then(user => {
      var isSuc = true;
      AV.User.requestMobilePhoneVerify(user.getMobilePhoneNumber()).then(user => {
        isSuc = true;
        this.setData({
          showSMBtn: false
        });
        var that=this;
        wx.hideToast();
        setTimeout(function () {
          that.setData({
            showSMBtn: true
          });
        }, 60000)
      }).catch(
        isSuc = false
        );
      return user;
    }).then(
      {
      }).catch(console.error);
  },

  wechatPhoneCheck: function (e) {
    console.log("发送验证码" + this.data.userPhoneCheck);
    wx.showToast({
      title: '请等待..',
      icon: 'loading',
      duration: 5000
    })
    if (this.data.userPhoneCheck != null && this.data.userPhoneCheck != '')
      AV.User.verifyMobilePhone(this.data.userPhoneCheck).then(user => {
        wx.hideToast();
        wx.showToast({
          title: '验证成功',
          duration: 5000
        })
        //重登陆刷新数据
        AV.User.loginWithWeapp().then(user => {
          getApp().globalData.user = user.toJSON();
          setTimeout(function () {
            wx.navigateTo({
              url: '/pages/casesMy/casesMy'
            })
            //wx.switchTab({ url: '/pages/casesMy/casesMy'})
          }, 2000)
        }).catch(console.error);
      }).catch(
        console.error
        );
  },
})