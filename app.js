// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    wx.cloud.init()
    const db = wx.cloud.database({
      env: "cloud1-6goql39af90fcd31"
    });
  },
  globalData: {
    userInfo: null
  }
})
