const util = require('../../utils/util')

Page({
  data: {
    form: {
      id: null,
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      detail: '',
      isDefault: false
    }
  },

  onLoad(options) {
    if (options.id) {
      const list = util.getAddressList()
      const address = list.find(a => a.id === parseInt(options.id))
      if (address) {
        this.setData({ form: address })
        wx.setNavigationBarTitle({ title: '编辑地址' })
      }
    } else {
      wx.setNavigationBarTitle({ title: '新增地址' })
    }
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onDefaultChange(e) {
    this.setData({ 'form.isDefault': e.detail.value })
  },

  onSave() {
    const { name, phone, province, city, district, detail } = this.data.form

    if (!name) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' })
      return
    }
    if (!phone || phone.length !== 11) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    if (!province || !city || !district) {
      wx.showToast({ title: '请输入完整的地区信息', icon: 'none' })
      return
    }
    if (!detail) {
      wx.showToast({ title: '请输入详细地址', icon: 'none' })
      return
    }

    util.saveAddress(this.data.form)
    wx.showToast({ title: '保存成功', icon: 'success' })
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})