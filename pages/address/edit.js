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
    },
    regionValue: [],
    regionText: ''
  },

  onLoad(options) {
    if (options.id) {
      const list = util.getAddressList()
      const address = list.find(a => a.id === parseInt(options.id))
      if (address) {
        this.setData({ 
          form: address,
          regionText: `${address.province} ${address.city} ${address.district}`,
          regionValue: [address.province, address.city, address.district]
        })
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

  onRegionChange(e) {
    const region = e.detail.value
    this.setData({
      'form.province': region[0],
      'form.city': region[1],
      'form.district': region[2],
      regionText: `${region[0]} ${region[1]} ${region[2]}`,
      regionValue: region
    })
  },

  onDefaultChange(e) {
    this.setData({ 'form.isDefault': e.detail.value })
  },

  onSave() {
    const { name, phone, province, city, district, detail } = this.data.form

    if (!name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' })
      return
    }
    if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' })
      return
    }
    if (!province || !city || !district) {
      wx.showToast({ title: '请选择所在地区', icon: 'none' })
      return
    }
    if (!detail.trim()) {
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