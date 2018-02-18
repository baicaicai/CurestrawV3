//app.js

//var config = require('./config');

var isTest=false;

App({
  onLaunch: function () {
    //leancloud
    var AV = require('./vendor/av-weapp-min.js');
    this.globalData.AV = AV;
    AV.init({
      appId: '5E1AAuPh4XpujiDnxGNKo8t3-gzGzoHsz',
      appKey: 'TohXj4W2SNACyItgiwkAHTHg',
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    if (!isTest) {
      if (this.globalData.user == null) {
        AV.User.loginWithWeapp().then(user => {
          this.globalData.user = user.toJSON();
          this.loadWeChatInfo(this);
        }).catch(console.error);
      }
      this.globalData.userPhone = this.globalData.user ? this.globalData.user.mobilePhoneNumber : '';
    }
  },
  loadWeChatInfo: function (that) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
              success: function (res) {
                that.getSysInfo(that);
                that.checkUserInfo(res.userInfo, that);
              }, fail: function () {
                console.log("获取UserInfo失败！");
            }
          })
        }
      }, fail: function () {
        console.log("获取Setting失败！");
        wx.showModal({
          title: '警告',
          content: '您拒绝了授权,将无法正常登陆程序,点击确定重新获取授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                    wx.getUserInfo({
                      success: function (res) {
                        that.getSysInfo(that);
                        that.checkUserInfo(res.userInfo, that);
                      }
                    })
                  }
                }, fail: function (res) {
                  console.log("授权失败！")
                }
              })

            }
          }
        })
      }, complete: function () {
        // complete
        console.log("获取用户信息完成！")
      }
    })
  },

  getSysInfo: function (that) {
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.ztlH = res.statusBarHeight;
      }
    })
  },

  checkUserInfo: function (userInfo,that) {
    var AV = this.globalData.AV;
    var query = new AV.Query('user_Info');
    query.equalTo('user_id', AV.User.current().id);
    //query.equalTo('userName', 'mytest');
    query.find().then(function (otherUsers) {
      var isFind = false;
      otherUsers.forEach(function (user_Info) {
        isFind = true;
        if (that.globalData.user != null) {
          user_Info.set('phone', that.globalData.user.mobilePhoneNumber);
        }

        if (userInfo != null) {
          user_Info.set('city', userInfo.city);
          user_Info.set('nickName', userInfo.nickName);
          user_Info.set('sex', userInfo.gender);//性别 0：未知、1：男、2：女
        }

        if (AV.User.current() != null) {
          user_Info.set('user_name', AV.User.current().attributes.username);
        }
        user_Info.save().then(function (user_Info) {
          console.log('otherUserid=' + user_Info.id);
        },
          function (error) {
            console.log(error);
          });
      });
      if (!isFind) {
        var User_Info = AV.Object.extend('user_Info');
        // 新建对象
        var user_Info = new User_Info();
        if (that.globalData.user != null) {
          user_Info.set('phone', that.globalData.user.mobilePhoneNumber);
        }
        if (userInfo != null) {
          user_Info.set('city', userInfo.city);
          user_Info.set('nickName', userInfo.nickName);
          user_Info.set('sex', userInfo.gender);//性别 0：未知、1：男、2：女
        }
        if (AV.User.current() != null) {
          user_Info.set('user_name', AV.User.current().attributes.username);
          user_Info.set('user_id', AV.User.current().id);
        }
        user_Info.save().then(function (user_Info) {
          console.log('user_Info save objectId is ' + user_Info.id);
        }, function (error) {
          console.error(error);
        });
      }
    },
      function (error) {
        console.log(error);
      })
      .catch(function (error) {
        alert(JSON.stringify(error));
      });
  },

  loginByPhone: function () {
    if (this.globalData.user == null || !this.globalData.user.mobilePhoneVerified) {
     // wx.navigateTo({ url: '/pages/userinfo/userinfo?userPhone=' })
    }
    else {
    //  wx.navigateTo({ url: '/pages/userinfo/userinfo?userPhone=' + this.data.userPhone })
    }
  },
  globalData: {
    AV: null,
    user:null,
    ztlH : 0,
    userPhone: null,
  }
})