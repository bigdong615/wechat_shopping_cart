Page({
  data: {
    userInfo: {
      nickName: '海鲜爱好者',
      avatarUrl: ''
    }
  },

  onLoad() {
    const app = getApp()
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo })
    }
  },

  goAllOrders() {
    wx.switchTab({ url: '/pages/order/order' })
  },

  goOrders(e) {
    wx.switchTab({ url: '/pages/order/order' })
  },

  goAddress() {
    wx.navigateTo({ url: '/pages/address/address' })
  },

  goCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  clearData() {
    wx.showModal({
      title: '提示',
      content: '确定清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '清除成功', icon: 'success' })
        }
      }
    })
  }
})