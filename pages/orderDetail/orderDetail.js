const util = require('../../utils/util')

Page({
  data: {
    order: {}
  },

  onLoad(options) {
    const orders = util.getOrders()
    const order = orders.find(o => o.id === options.id)
    if (order) {
      order.goodsTotalText = util.formatPrice(order.goodsTotal)
      order.deliveryFeeText = util.formatPrice(order.deliveryFee)
      order.totalPriceText = util.formatPrice(order.totalPrice)
      order.items = order.items.map(item => ({
        ...item,
        priceText: util.formatPrice(item.price)
      }))
      this.setData({ order })
    }
  }
})