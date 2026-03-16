// 格式化价格
const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

// 获取购物车
const getCart = () => {
  return wx.getStorageSync('cart') || []
}

// 保存购物车
const saveCart = (cart) => {
  wx.setStorageSync('cart', cart)
}

// 添加到购物车
const addToCart = (product, spec = null) => {
  let cart = getCart()
  const key = spec ? `${product.id}_${spec.id}` : `${product.id}`
  const existIndex = cart.findIndex(item => item.key === key)

  if (existIndex > -1) {
    cart[existIndex].quantity += 1
  } else {
    cart.push({
      key: key,
      productId: product.id,
      name: product.name,
      image: product.image,
      price: spec ? spec.price : product.price,
      specId: spec ? spec.id : null,
      specName: spec ? spec.name : null,
      quantity: 1,
      stock: product.stock
    })
  }
  saveCart(cart)
  return cart
}

// 从购物车减少
const removeFromCart = (productId, specId = null) => {
  let cart = getCart()
  const key = specId ? `${productId}_${specId}` : `${productId}`
  const existIndex = cart.findIndex(item => item.key === key)

  if (existIndex > -1) {
    if (cart[existIndex].quantity > 1) {
      cart[existIndex].quantity -= 1
    } else {
      cart.splice(existIndex, 1)
    }
  }
  saveCart(cart)
  return cart
}

// 获取商品在购物车中的数量
const getCartQuantity = (productId, specId = null) => {
  const cart = getCart()
  const key = specId ? `${productId}_${specId}` : `${productId}`
  const item = cart.find(item => item.key === key)
  return item ? item.quantity : 0
}

// 获取购物车总数量
const getCartTotalCount = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}

// 获取购物车总价
const getCartTotalPrice = () => {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

// 清空购物车
const clearCart = () => {
  wx.setStorageSync('cart', [])
}

// 获取地址列表
const getAddressList = () => {
  return wx.getStorageSync('addressList') || []
}

// 保存地址
const saveAddress = (address) => {
  let list = getAddressList()
  if (address.id) {
    const index = list.findIndex(a => a.id === address.id)
    if (index > -1) {
      list[index] = address
    }
  } else {
    address.id = Date.now()
    list.push(address)
  }
  // 如果设为默认地址，取消其他默认
  if (address.isDefault) {
    list.forEach(a => {
      if (a.id !== address.id) a.isDefault = false
    })
  }
  wx.setStorageSync('addressList', list)
  return list
}

// 删除地址
const deleteAddress = (id) => {
  let list = getAddressList()
  list = list.filter(a => a.id !== id)
  wx.setStorageSync('addressList', list)
  return list
}

// 获取默认地址
const getDefaultAddress = () => {
  const list = getAddressList()
  return list.find(a => a.isDefault) || (list.length > 0 ? list[0] : null)
}

// 保存订单
const saveOrder = (order) => {
  let orders = wx.getStorageSync('orders') || []
  order.id = Date.now().toString()
  order.createTime = new Date().toLocaleString()
  orders.unshift(order)
  wx.setStorageSync('orders', orders)
  return order
}

// 获取订单列表
const getOrders = () => {
  return wx.getStorageSync('orders') || []
}

// 生成订单号
const generateOrderNo = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${year}${month}${day}${Date.now().toString().slice(-6)}${random}`
}

module.exports = {
  formatPrice,
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  getCartQuantity,
  getCartTotalCount,
  getCartTotalPrice,
  clearCart,
  getAddressList,
  saveAddress,
  deleteAddress,
  getDefaultAddress,
  saveOrder,
  getOrders,
  generateOrderNo
}