const util = require('../../utils/util')

Page({
  data: {
    items: [],
    address: null,
    deliveryType: 'express',
    deliveryFee: '10.00',
    deliveryFeeText: '10.00',
    paymentMethod: 'wechat',
    remark: '',
    goodsTotalText: '0.00',
    totalPriceText: '0.00'
  },

  onLoad() {
    const items = wx.getStorageSync('checkoutItems') || []
    const itemsWithPrice = items.map(item => ({
      ...item,
      priceText: util.formatPrice(item.price)
    }))
    this.setData({ items: itemsWithPrice })
    this.calcPrice()
  },

  onShow() {
    // 获取地址
    const app = getApp()
    const address = app.globalData.selectedAddress || util.getDefaultAddress()
    this.setData({ address })
  },

  // 选择地址
  selectAddress() {
    wx.navigateTo({ url: '/pages/address/address?select=1' })
  },

  // 选择配送方式
  selectDelivery(e) {
    const type = e.currentTarget.dataset.type
    const fee = type === 'express' ? 10 : 0
    this.setData({
      deliveryType: type,
      deliveryFee: util.formatPrice(fee),
      deliveryFeeText: util.formatPrice(fee)
    })
    this.calcPrice()
  },

  // 选择支付方式
  selectPayment(e) {
    const method = e.currentTarget.dataset.method
    this.setData({ paymentMethod: method })
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  // 计算价格
  calcPrice() {
    const goodsTotal = this.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryFee = this.data.deliveryType === 'express' ? 10 : 0
    const total = goodsTotal + deliveryFee

    this.setData({
      goodsTotalText: util.formatPrice(goodsTotal),
      deliveryFeeText: util.formatPrice(deliveryFee),
      totalPriceText: util.formatPrice(total)
    })
  },

  // 提交订单
  onSubmit() {
    if (!this.data.address && this.data.deliveryType === 'express') {
      wx.showToast({ title: '请选择收货地址', icon: 'none' })
      return
    }

    if (this.data.items.length === 0) {
      wx.showToast({ title: '没有可结算的商品', icon: 'none' })
      return
    }

    const paymentName = this.data.paymentMethod === 'wechat' ? '微信支付' : '支付宝'

    wx.showModal({
      title: '确认支付',
      content: `使用${paymentName}支付 ¥${this.data.totalPriceText}`,
      confirmText: '确认支付',
      confirmColor: '#4A90D9',
      success: (res) => {
        if (res.confirm) {
          this.createOrder()
        }
      }
    })
  },

  // 创建订单
  createOrder() {
    wx.showLoading({ title: '支付中...' })

    // 模拟支付过程
    setTimeout(() => {
      const order = {
        orderNo: util.generateOrderNo(),
        items: this.data.items,
        address: this.data.address,
        deliveryType: this.data.deliveryType,
        deliveryFee: this.data.deliveryType === 'express' ? 10 : 0,
        paymentMethod: this.data.paymentMethod,
        remark: this.data.remark,
        goodsTotal: this.data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        totalPrice: parseFloat(this.data.totalPriceText),
        status: 'paid', // paid, shipped, delivered, completed
        statusText: '已支付'
      }

      util.saveOrder(order)

      // 清空已结算的商品
      let cart = util.getCart()
      const checkedKeys = this.data.items.map(item => item.key)
      cart = cart.filter(item => !checkedKeys.includes(item.key))
      util.saveCart(cart)

      wx.hideLoading()

      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          setTimeout(() => {
            wx.redirectTo({ url: `/pages/orderDetail/orderDetail?id=${order.id}` })
          }, 1500)
        }
      })
    }, 1500)
  }
})