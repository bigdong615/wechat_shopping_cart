const util = require('../../utils/util')

Page({
  data: {
    userInfo: {
      nickName: '海鲜爱好者',
      avatarUrl: ''
    },
    orderCounts: { paid: 0, shipped: 0, completed: 0 },
    cartCount: 0
  },

  onLoad() {
    const app = getApp()
    if (app.globalData.userInfo) {
      this.setData({ userInfo: app.globalData.userInfo })
    }
  },

  onShow() {
    this.updateCounts()
  },

  updateCounts() {
    const orders = util.getOrders()
    this.setData({
      orderCounts: {
        paid: orders.filter(o => o.status === 'paid').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        completed: orders.filter(o => o.status === 'completed').length
      },
      cartCount: util.getCartTotalCount()
    })
  },

  goAllOrders() { wx.switchTab({ url: '/pages/order/order' }) },
  goOrders(e) {
    const app = getApp()
    app.globalData.orderTab = e.currentTarget.dataset.tab
    wx.switchTab({ url: '/pages/order/order' })
  },
  goAddress() { wx.navigateTo({ url: '/pages/address/address' }) },
  goCart() { wx.navigateTo({ url: '/pages/cart/cart' }) },

  showAbout() {
    wx.showModal({
      title: '关于海鲜商城',
      content: '海鲜商城 v1.0.0\n\n专注提供新鲜优质的海鲜产品\n产地直采 冷链配送 品质保障',
      showCancel: false, confirmText: '知道了'
    })
  },

  callService() {
    wx.showActionSheet({
      itemList: ['拨打客服电话 400-888-8888', '在线留言'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.makePhoneCall({ phoneNumber: '4008888888', fail() {} })
        } else {
          wx.showToast({ title: '留言功能开发中', icon: 'none' })
        }
      }
    })
  },

  clearData() {
    wx.showModal({
      title: '提示', content: '确定清除所有缓存数据吗？',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          this.updateCounts()
          wx.showToast({ title: '清除成功', icon: 'success' })
        }
      }
    })
  }
})