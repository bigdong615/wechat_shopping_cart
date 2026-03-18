const { categories, products, banners } = require('../../utils/data')
const util = require('../../utils/util')

Page({
  data: {
    banners: banners,
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
    showBanner: true,
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
      filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || 
        (p.description && p.description.includes(keyword)) ||
        (p.tags && p.tags.some(t => t.includes(keyword))))
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
        originalPriceText: p.originalPrice ? util.formatPrice(p.originalPrice) : '',
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

    if (!firstChild) return

    // 找到该分类组下第一个有商品的子分类
    const targetCategoryId = this._findFirstCategoryWithProducts(category.children)

    this.setData({
      activeCategoryGroup: id,
      activeCategory: firstChild.id,
      showBanner: false
    })

    // 滚动到对应商品区域
    this._scrollToCategory(targetCategoryId || firstChild.id)
  },

  // 子分类点击
  onCategoryTap(e) {
    const id = e.currentTarget.dataset.id
    this.setData({
      activeCategory: id,
      showBanner: false
    })

    // 滚动到对应商品区域
    this._scrollToCategory(id)
  },

  // 找到分类列表中第一个有商品的子分类ID
  _findFirstCategoryWithProducts(children) {
    if (!children || children.length === 0) return null
    const productGroups = this.data.productGroups
    for (let i = 0; i < children.length; i++) {
      const group = productGroups.find(g => g.categoryId === children[i].id)
      if (group && group.products.length > 0) {
        return children[i].id
      }
    }
    return null
  },

  // 滚动到指定分类的商品区域
  _scrollToCategory(categoryId) {
    const target = `cate-${categoryId}`
    this.setData({ scrollIntoProduct: '' }, () => {
      setTimeout(() => {
        this.setData({ scrollIntoProduct: target })
      }, 50)
    })
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value })
    // 实时搜索
    if (!e.detail.value) {
      this.buildProductGroups()
    }
  },

  // 搜索
  onSearch() {
    this.buildProductGroups(this.data.searchKeyword)
  },

  // 搜索确认（键盘确认键）
  onSearchConfirm() {
    this.buildProductGroups(this.data.searchKeyword)
  },

  // 清除搜索
  onClearSearch() {
    this.setData({ searchKeyword: '' })
    this.buildProductGroups()
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

    // 检查购物车中已有数量
    const currentQty = util.getCartQuantity(id)
    if (currentQty >= product.stock) {
      wx.showToast({ title: '已达库存上限', icon: 'none' })
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

  // 阻止冒泡
  preventBubble() {},

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
    wx.navigateTo({ url: '/pages/address/address?select=1' })
  },

  // 商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/productDetail/productDetail?id=${id}` })
  },

  // 结算
  onCheckout() {
    if (this.data.cartTotalCount <= 0) {
      wx.showToast({ title: '请先选择商品', icon: 'none' })
      return
    }
    wx.navigateTo({ url: '/pages/cart/cart' })
  },

  onProductScroll(e) {
    // 滚动超过banner高度时隐藏banner
    if (e.detail.scrollTop > 10) {
      if (this.data.showBanner) {
        this.setData({ showBanner: false })
      }
    }
  }
})