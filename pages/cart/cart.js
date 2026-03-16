const util = require('../../utils/util')

Page({
  data: {
    cartItems: [],
    allChecked: true,
    totalPriceText: '0.00',
    checkedCount: 0
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const cart = util.getCart()
    const items = cart.map(item => ({
      ...item,
      priceText: util.formatPrice(item.price),
      checked: true
    }))
    this.setData({ cartItems: items })
    this.calcTotal()
  },

  // 切换选中
  toggleCheck(e) {
    const key = e.currentTarget.dataset.key
    const items = this.data.cartItems.map(item => {
      if (item.key === key) {
        item.checked = !item.checked
      }
      return item
    })
    this.setData({ cartItems: items })
    this.calcTotal()
  },

  // 全选/取消全选
  toggleSelectAll() {
    const allChecked = !this.data.allChecked
    const items = this.data.cartItems.map(item => ({
      ...item,
      checked: allChecked
    }))
    this.setData({ cartItems: items, allChecked })
    this.calcTotal()
  },

  // 增加数量
  onPlus(e) {
    const key = e.currentTarget.dataset.key
    const items = this.data.cartItems.map(item => {
      if (item.key === key) {
        item.quantity += 1
      }
      return item
    })
    this.setData({ cartItems: items })
    this.syncCart()
    this.calcTotal()
  },

  // 减少数量
  onMinus(e) {
    const key = e.currentTarget.dataset.key
    const items = this.data.cartItems.map(item => {
      if (item.key === key && item.quantity > 1) {
        item.quantity -= 1
      }
      return item
    })
    this.setData({ cartItems: items })
    this.syncCart()
    this.calcTotal()
  },

  // 删除
  onDelete(e) {
    const key = e.currentTarget.dataset.key
    wx.showModal({
      title: '提示',
      content: '确定删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          const items = this.data.cartItems.filter(item => item.key !== key)
          this.setData({ cartItems: items })
          this.syncCart()
          this.calcTotal()
        }
      }
    })
  },

  // 同步到存储
  syncCart() {
    const cart = this.data.cartItems.map(({ checked, priceText, ...item }) => item)
    util.saveCart(cart)
  },

  // 计算合计
  calcTotal() {
    const checked = this.data.cartItems.filter(item => item.checked)
    const total = checked.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const count = checked.reduce((sum, item) => sum + item.quantity, 0)
    const allChecked = this.data.cartItems.length > 0 && checked.length === this.data.cartItems.length

    this.setData({
      totalPriceText: util.formatPrice(total),
      checkedCount: count,
      allChecked
    })
  },

  // 结算
  onSettle() {
    const checked = this.data.cartItems.filter(item => item.checked)
    if (checked.length === 0) {
      wx.showToast({ title: '请选择商品', icon: 'none' })
      return
    }

    // 保存选中的商品到临时存储
    wx.setStorageSync('checkoutItems', checked)
    wx.navigateTo({ url: '/pages/payment/payment' })
  },

  // 去逛逛
  goShopping() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})