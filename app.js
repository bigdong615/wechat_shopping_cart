App({
  onLaunch() {
    // 初始化购物车
    if (!wx.getStorageSync('cart')) {
      wx.setStorageSync('cart', [])
    }
    // 初始化地址列表
    if (!wx.getStorageSync('addressList')) {
      wx.setStorageSync('addressList', [])
    }
    // 初始化订单列表
    if (!wx.getStorageSync('orders')) {
      wx.setStorageSync('orders', [])
    }
  },
  globalData: {
    userInfo: null,
    selectedAddress: null
  }
})