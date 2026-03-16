const { categories, products } = require('../../utils/data')
const util = require('../../utils/util')

Page({
  data: {
    categories: categories,
    activeCategoryGroup: 1,
    activeCategory: 11,
    productGroups: [],
    searchKeyword: '',
    cartTotalCount: 0,
    cartTotalPriceText: '0.00',
    selectedAddress: null,
    scrollIntoProduct: '',
    scrollIntoCategory: '',
    // 规格弹窗
    showSpecModal: false,
    specProduct: null,
    selectedSpecId: null,
    selectedSpecPrice: '0.00',
    specQuantity: 1
  },

  onLoad() {
    this.allProducts = products
    this.buildProductGroups()
    this.updateCartInfo()
  },

  onShow() {
    this.updateCartInfo()
    this.updateProductCartQuantities()
    // 获取选择的地址
    const app = getApp()
    this.setData({
      selectedAddress: app.globalData.selectedAddress || util.getDefaultAddress()
    })
  },

  // 构建商品分组
  buildProductGroups(keyword = '') {
    let filtered = this.allProducts
    if (keyword) {
      filtered = filtered.filter(p => p.name.includes(keyword))
    }

    // 按分类分组
    const groupMap = {}
    filtered.forEach(p => {
      if (!groupMap[p.categoryId]) {
        groupMap[p.categoryId] = {
          categoryId: p.categoryId,
          categoryName: p.categoryName,
          products: []
        }
      }
      groupMap[p.categoryId].products.push({
        ...p,
        priceText: util.formatPrice(p.price),
        cartQuantity: util.getCartQuantity(p.id)
      })
    })

    const groups = Object.values(groupMap).sort((a, b) => a.categoryId - b.categoryId)
    this.setData({ productGroups: groups })
  },

  // 更新商品购物车数量
  updateProductCartQuantities() {
    const groups = this.data.productGroups.map(group => ({
      ...group,
      products: group.products.map(p => ({
        ...p,
        cartQuantity: util.getCartQuantity(p.id)
      }))
    }))
    this.setData({ productGroups: groups })
  },

  // 更新购物车信息
  updateCartInfo() {
    this.setData({
      cartTotalCount: util.getCartTotalCount(),
      cartTotalPriceText: util.formatPrice(util.getCartTotalPrice())
    })
  },

  // 分类组点击
  onCategoryGroupTap(e) {
    const id = e.currentTarget.dataset.id
    const category = categories.find(c => c.id === id)
    const firstChild = category && category.children && category.children[0]

    this.setData({
      activeCategoryGroup: id,
      activeCategory: firstChild ? firstChild.id : null,
      scrollIntoProduct: firstChild ? `cate-${firstChild.id}` : ''
    })
  },

  // 子分类点击
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      activeCategory: id,
      scrollIntoProduct: `cate-${id}`
    })
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
  },

  // 搜索
  onSearch() {
    this.buildProductGroups(this.data.searchKeyword)
  },

  // 增加数量
  onPlus(e) {
    const id = e.currentTarget.dataset.id
    const product = this.allProducts.find(p => p.id === id)
    if (!product) return

    if (product.stock <= 0) {
      wx.showToast({ title: '库存不足', icon: 'none' })
      return
    }

    util.addToCart(product)
    this.updateCartInfo()
    this.updateProductCartQuantities()
  },

  // 减少数量
  onMinus(e) {
    const id = e.currentTarget.dataset.id
    util.removeFromCart(id)
    this.updateCartInfo()
    this.updateProductCartQuantities()
  },

  // 选择规格
  onSelectSpec(e) {
    const product = e.currentTarget.dataset.product
    const firstSpec = product.specs[0]
    this.setData({
      showSpecModal: true,
      specProduct: product,
      selectedSpecId: firstSpec.id,
      selectedSpecPrice: util.formatPrice(firstSpec.price),
      specQuantity: util.getCartQuantity(product.id, firstSpec.id) || 1
    })
  },

  // 关闭规格弹窗
  closeSpecModal() {
    this.setData({ showSpecModal: false })
  },

  // 选择规格项
  onSpecSelect(e) {
    const spec = e.currentTarget.dataset.spec
    this.setData({
      selectedSpecId: spec.id,
      selectedSpecPrice: util.formatPrice(spec.price),
      specQuantity: util.getCartQuantity(this.data.specProduct.id, spec.id) || 1
    })
  },

  // 规格数量减
  onSpecMinus() {
    if (this.data.specQuantity > 1) {
      this.setData({ specQuantity: this.data.specQuantity - 1 })
    }
  },

  // 规格数量加
  onSpecPlus() {
    this.setData({ specQuantity: this.data.specQuantity + 1 })
  },

  // 确认规格
  onSpecConfirm() {
    const { specProduct, selectedSpecId, specQuantity } = this.data
    const spec = specProduct.specs.find(s => s.id === selectedSpecId)
    if (!spec) return

    // 先移除旧的该规格商品
    let cart = util.getCart()
    const key = `${specProduct.id}_${spec.id}`
    cart = cart.filter(item => item.key !== key)
    util.saveCart(cart)

    // 添加新的
    for (let i = 0; i < specQuantity; i++) {
      util.addToCart(specProduct, spec)
    }

    this.updateCartInfo()
    this.updateProductCartQuantities()
    this.closeSpecModal()

    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },

  // 跳转到购物车
  goToCart() {
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  // 跳转到地址
  goToAddress() {
    wx.navigateTo({ url: '/pages/address/address' })
  },

  // 结算
  onCheckout() {
    if (this.data.cartTotalCount <= 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  onProductScroll() {
    // 滚动时可以更新左侧分类高亮（简化处理）
  }
})