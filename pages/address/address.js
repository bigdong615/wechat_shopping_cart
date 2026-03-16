const util = require('../../utils/util')

Page({
  data: {
    addressList: [],
    isSelect: false
  },

  onLoad(options) {
    this.setData({ isSelect: options.select === '1' })
  },

  onShow() {
    this.loadAddresses()
  },

  loadAddresses() {
    this.setData({ addressList: util.getAddressList() })
  },

  onSelect(e) {
    if (!this.data.isSelect) return

    const id = e.currentTarget.dataset.id
    const address = this.data.addressList.find(a => a.id === id)
    if (address) {
      const app = getApp()
      app.globalData.selectedAddress = address
      wx.navigateBack()
    }
  },

  onAdd() {
    wx.navigateTo({ url: '/pages/address/edit' })
  },

  onEdit(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/address/edit?id=${id}` })
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定删除该地址吗？',
      success: (res) => {
        if (res.confirm) {
          util.deleteAddress(id)
          this.loadAddresses()
        }
      }
    })
  }
})