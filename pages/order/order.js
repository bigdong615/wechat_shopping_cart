const util = require('../../utils/util')

Page({
  data: {
    activeTab: 'all',
    orders: [],
    allOrders: []
  },

  onShow() {
    // 检查是否从个人中心传来的tab切换
    const app = getApp()
    if (app.globalData.orderTab) {
      this.setData({ activeTab: app.globalData.orderTab })
      app.globalData.orderTab = null
    }
    this.loadOrders()
  },

  loadOrders() {
    const orders = util.getOrders().map(order => ({
      ...order,
      totalCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      totalPriceText: util.formatPrice(order.totalPrice),
      items: order.items.map(item => ({
        ...item,
        priceText: util.formatPrice(item.price)
      }))
    }))
    this.setData({ allOrders: orders })
    this.filterOrders()
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
    this.filterOrders()
  },

  filterOrders() {
    const { activeTab, allOrders } = this.data
    let filtered = allOrders
    if (activeTab !== 'all') {
      filtered = allOrders.filter(o => o.status === activeTab)
    }
    this.setData({ orders: filtered })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/orderDetail/orderDetail?id=${id}` })
  },

  // 模拟发货
  onConfirmShip(e) {
    const id = e.currentTarget.dataset.id
    let orders = wx.getStorageSync('orders') || []
    const index = orders.findIndex(o => o.id === id)
    if (index > -1) {
      orders[index].status = 'shipped'
      orders[index].statusText = '已发货'
      wx.setStorageSync('orders', orders)
      this.loadOrders()
      wx.showToast({ title: '已发货', icon: 'success' })
    }
  },

  // 确认收货
  onConfirmReceive(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确认已收到商品？',
      success: (res) => {
        if (res.confirm) {
          let orders = wx.getStorageSync('orders') || []
          const index = orders.findIndex(o => o.id === id)
          if (index > -1) {
            orders[index].status = 'completed'
            orders[index].statusText = '已完成'
            wx.setStorageSync('orders', orders)
            this.loadOrders()
            wx.showToast({ title: '已确认收货', icon: 'success' })
          }
        }
      }
    })
  }
})