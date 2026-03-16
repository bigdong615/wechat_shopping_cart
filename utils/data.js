// 商品分类数据
const categories = [
  {
    id: 1,
    name: '活鲜产品',
    children: [
      { id: 11, name: '虾蟹类', parentId: 1 },
      { id: 12, name: '贝类', parentId: 1 },
      { id: 13, name: '鱼类', parentId: 1 },
      { id: 14, name: '其他', parentId: 1 }
    ]
  },
  {
    id: 2,
    name: '冷冻产品',
    children: [
      { id: 21, name: '冷冻虾', parentId: 2 },
      { id: 22, name: '冷冻鱼', parentId: 2 },
      { id: 23, name: '冷冻贝', parentId: 2 }
    ]
  },
  {
    id: 3,
    name: '冷冻称重类',
    children: [
      { id: 31, name: '称重虾', parentId: 3 },
      { id: 32, name: '称重蟹', parentId: 3 }
    ]
  },
  {
    id: 4,
    name: '固定包装产品',
    children: [
      { id: 41, name: '礼盒装', parentId: 4 },
      { id: 42, name: '家庭装', parentId: 4 }
    ]
  },
  {
    id: 5,
    name: '固定包装类',
    children: [
      { id: 51, name: '真空包装', parentId: 5 },
      { id: 52, name: '冰鲜包装', parentId: 5 }
    ]
  },
  {
    id: 6,
    name: '肉类/蛋',
    children: [
      { id: 61, name: '猪肉', parentId: 6 },
      { id: 62, name: '牛肉', parentId: 6 },
      { id: 63, name: '鸡蛋', parentId: 6 }
    ]
  }
]

// 商品数据
const products = [
  {
    id: 1,
    name: '海洋岛母飞蟹',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 180.00,
    image: '/images/products/crab1.png',
    buyers: 0,
    followers: 17,
    stock: 50,
    specs: [
      { id: 1, name: '中号 (约500g)', price: 180.00 },
      { id: 2, name: '大号 (约800g)', price: 280.00 },
      { id: 3, name: '特大号 (约1000g)', price: 380.00 }
    ],
    hasSpecs: true
  },
  {
    id: 2,
    name: '大花盖甲红',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 80.00,
    image: '/images/products/crab2.png',
    buyers: 2,
    followers: 21,
    stock: 30,
    specs: [],
    hasSpecs: false
  },
  {
    id: 3,
    name: '特大花盖甲红',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 85.00,
    image: '/images/products/crab3.png',
    buyers: 2,
    followers: 12,
    stock: 0,
    specs: [],
    hasSpecs: false
  },
  {
    id: 4,
    name: '中夏夷贝',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 35.00,
    image: '/images/products/shell1.png',
    buyers: 5,
    followers: 8,
    stock: 100,
    specs: [],
    hasSpecs: false
  },
  {
    id: 5,
    name: '大扇贝',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 45.00,
    image: '/images/products/shell2.png',
    buyers: 3,
    followers: 15,
    stock: 80,
    specs: [],
    hasSpecs: false
  },
  {
    id: 6,
    name: '鲍鱼',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 120.00,
    image: '/images/products/shell3.png',
    buyers: 10,
    followers: 30,
    stock: 20,
    specs: [
      { id: 1, name: '小号 6头', price: 120.00 },
      { id: 2, name: '大号 4头', price: 180.00 }
    ],
    hasSpecs: true
  },
  {
    id: 7,
    name: '新鲜海鲈鱼',
    categoryId: 13,
    categoryName: '活鲜产品 - 鱼类',
    price: 55.00,
    image: '/images/products/fish1.png',
    buyers: 8,
    followers: 22,
    stock: 40,
    specs: [],
    hasSpecs: false
  },
  {
    id: 8,
    name: '多宝鱼',
    categoryId: 13,
    categoryName: '活鲜产品 - 鱼类',
    price: 68.00,
    image: '/images/products/fish2.png',
    buyers: 6,
    followers: 18,
    stock: 35,
    specs: [],
    hasSpecs: false
  },
  {
    id: 9,
    name: '海参',
    categoryId: 14,
    categoryName: '活鲜产品 - 其他',
    price: 350.00,
    image: '/images/products/other1.png',
    buyers: 15,
    followers: 45,
    stock: 10,
    specs: [
      { id: 1, name: '小号 (约50g/只)', price: 350.00 },
      { id: 2, name: '大号 (约80g/只)', price: 580.00 }
    ],
    hasSpecs: true
  },
  {
    id: 10,
    name: '冷冻北极甜虾',
    categoryId: 21,
    categoryName: '冷冻产品 - 冷冻虾',
    price: 65.00,
    image: '/images/products/frozen1.png',
    buyers: 20,
    followers: 35,
    stock: 200,
    specs: [],
    hasSpecs: false
  },
  {
    id: 11,
    name: '冷冻三文鱼',
    categoryId: 22,
    categoryName: '冷冻产品 - 冷冻鱼',
    price: 128.00,
    image: '/images/products/frozen2.png',
    buyers: 12,
    followers: 28,
    stock: 60,
    specs: [
      { id: 1, name: '200g切片', price: 128.00 },
      { id: 2, name: '500g整块', price: 298.00 }
    ],
    hasSpecs: true
  },
  {
    id: 12,
    name: '称重基围虾',
    categoryId: 31,
    categoryName: '冷冻称重类 - 称重虾',
    price: 45.00,
    image: '/images/products/weigh1.png',
    buyers: 18,
    followers: 25,
    stock: 150,
    specs: [],
    hasSpecs: false,
    unit: '斤'
  },
  {
    id: 13,
    name: '海鲜礼盒A套餐',
    categoryId: 41,
    categoryName: '固定包装产品 - 礼盒装',
    price: 588.00,
    image: '/images/products/gift1.png',
    buyers: 5,
    followers: 40,
    stock: 30,
    specs: [],
    hasSpecs: false
  },
  {
    id: 14,
    name: '真空包装鱿鱼干',
    categoryId: 51,
    categoryName: '固定包装类 - 真空包装',
    price: 38.00,
    image: '/images/products/pack1.png',
    buyers: 25,
    followers: 15,
    stock: 300,
    specs: [],
    hasSpecs: false
  }
]

module.exports = {
  categories,
  products
}