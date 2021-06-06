// pages/user/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionKey: null,
    hasUserInfo: false,
    userInfo: null
  },

  /**
   * 获取登陆消息
   */
  getUserProfile(e) {
    var that = this;
    // 执行登录操作
    wx.login({
      success: (res) => {
        that.setData({
          sessionKey: res.code
        })
        wx.setStorageSync('sessionKey', res.code)
      },
    });
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', res.userInfo)
      }
    })
  },
  /**
   * 手机号码登陆
   */
  getPhoneNumber: function (e){
    var msg = e.detail.errMsg;
    if ('getPhoneNumber:ok' == msg){
      console.log(this.data.sessionKey)
      console.log(this.data.userInfo)
      console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
    }

  },

  /**
   * 判断登陆状态
   */
  checkPrefsession: function () {
    var that = this;
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        that.setData({
          sessionKey: wx.getStorageSync('sessionKey'),
          userInfo: wx.getStorageSync('userInfo')
        });
        that.setData({
          hasUserInfo: true
        });
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        that.setData({
          hasUserInfo: false
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkPrefsession();
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