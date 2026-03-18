const { products } = require('../../utils/data')
const util = require('../../utils/util')

Page({
  data: {
    product: null,
    cartQuantity: 0,
    cartTotalCount: 0,
    // 规格弹窗
    showSpecModal: false,
    selectedSpecId: null,
    selectedSpecPrice: '0.00',
    specQuantity: 1
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const product = products.find(p => p.id === id)
    if (product) {
      product.priceText = util.formatPrice(product.price)
      product.originalPriceText = product.originalPrice ? util.formatPrice(product.originalPrice) : ''
      this.setData({ 
        product,
        cartQuantity: util.getCartQuantity(id)
      })
      wx.setNavigationBarTitle({ title: product.name })
    }
  },

  onShow() {
    if (this.data.product) {
      this.setData({
        cartQuantity: util.getCartQuantity(this.data.product.id),
        cartTotalCount: util.getCartTotalCount()
      })
    }
  },

  // 增加数量
  onPlus() {
    const product = this.data.product
    if (!product || product.stock <= 0) {
      wx.showToast({ title: '库存不足', icon: 'none' })
      return
    }
    const currentQty = util.getCartQuantity(product.id)
    if (currentQty >= product.stock) {
      wx.showToast({ title: '已达库存上限', icon: 'none' })
      return
    }
    util.addToCart(product)
    this.setData({ 
      cartQuantity: util.getCartQuantity(product.id),
      cartTotalCount: util.getCartTotalCount()
    })
  },

  // 减少数量
  onMinus() {
    const product = this.data.product
    if (!product) return
    util.removeFromCart(product.id)
    this.setData({ 
      cartQuantity: util.getCartQuantity(product.id),
      cartTotalCount: util.getCartTotalCount()
    })
  },

  // 选择规格
  onSelectSpec() {
    const product = this.data.product
    if (!product || !product.hasSpecs) return
    const firstSpec = product.specs[0]
    this.setData({
      showSpecModal: true,
      selectedSpecId: firstSpec.id,
      selectedSpecPrice: util.formatPrice(firstSpec.price),
      specQuantity: util.getCartQuantity(product.id, firstSpec.id) || 1
    })
  },

  closeSpecModal() {
    this.setData({ showSpecModal: false })
  },

  onSpecSelect(e) {
    const spec = e.currentTarget.dataset.spec
    this.setData({
      selectedSpecId: spec.id,
      selectedSpecPrice: util.formatPrice(spec.price),
      specQuantity: util.getCartQuantity(this.data.product.id, spec.id) || 1
    })
  },

  onSpecMinus() {
    if (this.data.specQuantity > 1) {
      this.setData({ specQuantity: this.data.specQuantity - 1 })
    }
  },

  onSpecPlus() {
    this.setData({ specQuantity: this.data.specQuantity + 1 })
  },

  onSpecConfirm() {
    const product = this.data.product
    const { selectedSpecId, specQuantity } = this.data
    const spec = product.specs.find(s => s.id === selectedSpecId)
    if (!spec) return

    let cart = util.getCart()
    const key = `${product.id}_${spec.id}`
    cart = cart.filter(item => item.key !== key)
    util.saveCart(cart)

    for (let i = 0; i < specQuantity; i++) {
      util.addToCart(product, spec)
    }

    this.setData({ 
      cartQuantity: util.getCartQuantity(product.id),
      cartTotalCount: util.getCartTotalCount()
    })
    this.closeSpecModal()
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },

  // 加入购物车
  addToCart() {
    const product = this.data.product
    if (!product) return

    if (product.hasSpecs) {
      this.onSelectSpec()
      return
    }

    if (product.stock <= 0) {
      wx.showToast({ title: '库存不足', icon: 'none' })
      return
    }

    util.addToCart(product)
    this.setData({ 
      cartQuantity: util.getCartQuantity(product.id),
      cartTotalCount: util.getCartTotalCount()
    })
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },

  // 跳转到购物车
  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  preventBubble() {}
})