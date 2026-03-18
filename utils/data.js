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

// 商品数据 - 使用本地图片
const products = [
  // ===== 活鲜产品 - 虾蟹类 =====
  {
    id: 1,
    name: '海洋岛母飞蟹',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 180.00,
    originalPrice: 220.00,
    image: '/images/products/crab1.png',
    description: '大连海洋岛野生飞蟹，肉质鲜美，蟹黄饱满',
    buyers: 128,
    followers: 217,
    stock: 50,
    specs: [
      { id: 1, name: '中号 (约500g)', price: 180.00 },
      { id: 2, name: '大号 (约800g)', price: 280.00 },
      { id: 3, name: '特大号 (约1000g)', price: 380.00 }
    ],
    hasSpecs: true,
    tags: ['野生', '鲜活']
  },
  {
    id: 2,
    name: '鲜活大闸蟹',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 80.00,
    originalPrice: 98.00,
    image: '/images/products/crab2.png',
    description: '阳澄湖大闸蟹，膏肥黄满，正宗好蟹',
    buyers: 256,
    followers: 321,
    stock: 30,
    specs: [
      { id: 1, name: '公蟹3.5两', price: 80.00 },
      { id: 2, name: '母蟹2.5两', price: 75.00 },
      { id: 3, name: '礼盒装8只', price: 588.00 }
    ],
    hasSpecs: true,
    tags: ['阳澄湖', '鲜活']
  },
  {
    id: 3,
    name: '鲜活基围虾',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 85.00,
    originalPrice: 99.00,
    image: '/images/products/shrimp1.jpg',
    description: '南美白对虾，活蹦乱跳，口感弹牙',
    buyers: 189,
    followers: 152,
    stock: 80,
    specs: [],
    hasSpecs: false,
    tags: ['鲜活', '弹牙']
  },
  {
    id: 15,
    name: '波士顿龙虾',
    categoryId: 11,
    categoryName: '活鲜产品 - 虾蟹类',
    price: 268.00,
    originalPrice: 328.00,
    image: '/images/products/lobster1.jpg',
    description: '进口波士顿龙虾，肉质紧实，鲜甜可口',
    buyers: 86,
    followers: 198,
    stock: 15,
    specs: [
      { id: 1, name: '约500g/只', price: 268.00 },
      { id: 2, name: '约750g/只', price: 388.00 },
      { id: 3, name: '约1000g/只', price: 498.00 }
    ],
    hasSpecs: true,
    tags: ['进口', '鲜活']
  },
  // ===== 活鲜产品 - 贝类 =====
  {
    id: 4,
    name: '鲜活夏夷贝',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 35.00,
    originalPrice: 42.00,
    image: '/images/products/shell1.png',
    description: '大连夏夷贝，肉质细嫩，原汁原味',
    buyers: 95,
    followers: 88,
    stock: 100,
    specs: [],
    hasSpecs: false,
    tags: ['鲜活']
  },
  {
    id: 5,
    name: '大扇贝',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 45.00,
    originalPrice: 55.00,
    image: '/images/products/scallop1.jpg',
    description: '蒜蓉粉丝蒸扇贝必备，个大肉厚',
    buyers: 73,
    followers: 115,
    stock: 80,
    specs: [],
    hasSpecs: false,
    tags: ['个大', '鲜美']
  },
  {
    id: 6,
    name: '鲜活鲍鱼',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 120.00,
    originalPrice: 150.00,
    image: '/images/products/shell2.png',
    description: '大连野生鲍鱼，营养丰富，口感软糯',
    buyers: 110,
    followers: 230,
    stock: 20,
    specs: [
      { id: 1, name: '小号 6头/斤', price: 120.00 },
      { id: 2, name: '大号 4头/斤', price: 180.00 }
    ],
    hasSpecs: true,
    tags: ['野生', '滋补']
  },
  {
    id: 16,
    name: '鲜活生蚝',
    categoryId: 12,
    categoryName: '活鲜产品 - 贝类',
    price: 58.00,
    originalPrice: 72.00,
    image: '/images/products/oyster1.jpg',
    description: '乳山生蚝，奶油般肥美，炭烤首选',
    buyers: 205,
    followers: 312,
    stock: 150,
    specs: [
      { id: 1, name: '中号10只装', price: 58.00 },
      { id: 2, name: '大号10只装', price: 88.00 }
    ],
    hasSpecs: true,
    tags: ['肥美', '炭烤']
  },
  // ===== 活鲜产品 - 鱼类 =====
  {
    id: 7,
    name: '新鲜海鲈鱼',
    categoryId: 13,
    categoryName: '活鲜产品 - 鱼类',
    price: 55.00,
    originalPrice: 65.00,
    image: '/images/products/fish1.png',
    description: '清蒸首选，肉质细嫩，少刺鲜美',
    buyers: 168,
    followers: 222,
    stock: 40,
    specs: [],
    hasSpecs: false,
    tags: ['少刺', '清蒸']
  },
  {
    id: 8,
    name: '多宝鱼',
    categoryId: 13,
    categoryName: '活鲜产品 - 鱼类',
    price: 68.00,
    originalPrice: 82.00,
    image: '/images/products/fish2.png',
    description: '深海多宝鱼，胶原蛋白丰富，老少皆宜',
    buyers: 96,
    followers: 178,
    stock: 35,
    specs: [],
    hasSpecs: false,
    tags: ['深海', '滋补']
  },
  {
    id: 17,
    name: '活石斑鱼',
    categoryId: 13,
    categoryName: '活鲜产品 - 鱼类',
    price: 158.00,
    originalPrice: 188.00,
    image: '/images/products/fish1.jpg',
    description: '海上鲜石斑鱼，肉质弹滑，鲜味十足',
    buyers: 42,
    followers: 96,
    stock: 12,
    specs: [
      { id: 1, name: '约500g/条', price: 158.00 },
      { id: 2, name: '约750g/条', price: 228.00 }
    ],
    hasSpecs: true,
    tags: ['鲜活', '高端']
  },
  // ===== 活鲜产品 - 其他 =====
  {
    id: 9,
    name: '即食海参',
    categoryId: 14,
    categoryName: '活鲜产品 - 其他',
    price: 350.00,
    originalPrice: 420.00,
    image: '/images/products/other1.png',
    description: '大连野生海参，滋补佳品，营养丰富',
    buyers: 215,
    followers: 445,
    stock: 10,
    specs: [
      { id: 1, name: '小号 (约50g/只)', price: 350.00 },
      { id: 2, name: '大号 (约80g/只)', price: 580.00 }
    ],
    hasSpecs: true,
    tags: ['野生', '滋补']
  },
  {
    id: 18,
    name: '鲜活海胆',
    categoryId: 14,
    categoryName: '活鲜产品 - 其他',
    price: 128.00,
    originalPrice: 158.00,
    image: '/images/products/shell3.png',
    description: '大连紫海胆，入口即化，鲜甜无比',
    buyers: 68,
    followers: 145,
    stock: 25,
    specs: [],
    hasSpecs: false,
    tags: ['鲜甜', '刺身']
  },
  // ===== 冷冻产品 - 冷冻虾 =====
  {
    id: 10,
    name: '冷冻北极甜虾',
    categoryId: 21,
    categoryName: '冷冻产品 - 冷冻虾',
    price: 65.00,
    originalPrice: 79.00,
    image: '/images/products/frozen1.png',
    description: '加拿大进口北极甜虾，即食刺身级',
    buyers: 320,
    followers: 435,
    stock: 200,
    specs: [],
    hasSpecs: false,
    tags: ['进口', '刺身级']
  },
  {
    id: 19,
    name: '阿根廷红虾',
    categoryId: 21,
    categoryName: '冷冻产品 - 冷冻虾',
    price: 89.00,
    originalPrice: 108.00,
    image: '/images/products/frozen2.png',
    description: '阿根廷L1大红虾，虾肉饱满，Q弹紧实',
    buyers: 186,
    followers: 256,
    stock: 120,
    specs: [
      { id: 1, name: '2kg装(约30只)', price: 89.00 },
      { id: 2, name: '4kg装(约60只)', price: 168.00 }
    ],
    hasSpecs: true,
    tags: ['进口', 'Q弹']
  },
  // ===== 冷冻产品 - 冷冻鱼 =====
  {
    id: 11,
    name: '冷冻三文鱼',
    categoryId: 22,
    categoryName: '冷冻产品 - 冷冻鱼',
    price: 128.00,
    originalPrice: 158.00,
    image: '/images/products/salmon1.jpg',
    description: '挪威进口三文鱼，刺身级品质，入口即化',
    buyers: 212,
    followers: 328,
    stock: 60,
    specs: [
      { id: 1, name: '200g切片', price: 128.00 },
      { id: 2, name: '500g整块', price: 298.00 }
    ],
    hasSpecs: true,
    tags: ['进口', '刺身级']
  },
  {
    id: 20,
    name: '冷冻鳕鱼排',
    categoryId: 22,
    categoryName: '冷冻产品 - 冷冻鱼',
    price: 78.00,
    originalPrice: 95.00,
    image: '/images/products/frozen1.jpg',
    description: '阿拉斯加鳕鱼排，少刺适合宝宝，营养健康',
    buyers: 298,
    followers: 385,
    stock: 100,
    specs: [],
    hasSpecs: false,
    tags: ['少刺', '宝宝辅食']
  },
  // ===== 冷冻产品 - 冷冻贝 =====
  {
    id: 21,
    name: '冷冻扇贝肉',
    categoryId: 23,
    categoryName: '冷冻产品 - 冷冻贝',
    price: 48.00,
    originalPrice: 58.00,
    image: '/images/products/shell1.jpg',
    description: '去壳扇贝柱，方便烹饪，鲜甜多汁',
    buyers: 145,
    followers: 198,
    stock: 180,
    specs: [],
    hasSpecs: false,
    tags: ['免洗', '方便']
  },
  {
    id: 22,
    name: '冷冻鲍鱼仔',
    categoryId: 23,
    categoryName: '冷冻产品 - 冷冻贝',
    price: 68.00,
    originalPrice: 82.00,
    image: '/images/products/shell2.jpg',
    description: '冷冻小鲍鱼，煲汤佐餐，营养美味',
    buyers: 88,
    followers: 132,
    stock: 90,
    specs: [
      { id: 1, name: '10头装/包', price: 68.00 },
      { id: 2, name: '20头装/包', price: 128.00 }
    ],
    hasSpecs: true,
    tags: ['营养', '煲汤']
  },
  // ===== 冷冻称重类 - 称重虾 =====
  {
    id: 12,
    name: '称重基围虾',
    categoryId: 31,
    categoryName: '冷冻称重类 - 称重虾',
    price: 45.00,
    originalPrice: 55.00,
    image: '/images/products/weigh1.png',
    description: '鲜活基围虾按斤称重，现捞现卖',
    buyers: 218,
    followers: 325,
    stock: 150,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['称重', '鲜活']
  },
  {
    id: 23,
    name: '称重明虾',
    categoryId: 31,
    categoryName: '冷冻称重类 - 称重虾',
    price: 68.00,
    originalPrice: 82.00,
    image: '/images/products/shrimp1.jpg',
    description: '大个明虾，油焖白灼都好吃',
    buyers: 156,
    followers: 228,
    stock: 100,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['称重', '大个']
  },
  // ===== 冷冻称重类 - 称重蟹 =====
  {
    id: 24,
    name: '称重梭子蟹',
    categoryId: 32,
    categoryName: '冷冻称重类 - 称重蟹',
    price: 55.00,
    originalPrice: 68.00,
    image: '/images/products/crab3.png',
    description: '新鲜梭子蟹，蟹肉紧实，膏黄丰盈',
    buyers: 132,
    followers: 186,
    stock: 80,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['称重', '新鲜']
  },
  {
    id: 25,
    name: '称重花蟹',
    categoryId: 32,
    categoryName: '冷冻称重类 - 称重蟹',
    price: 48.00,
    originalPrice: 58.00,
    image: '/images/products/crab3.jpg',
    description: '海捕花蟹，肉甜膏香，煮粥绝配',
    buyers: 98,
    followers: 142,
    stock: 60,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['称重', '煮粥']
  },
  // ===== 固定包装产品 - 礼盒装 =====
  {
    id: 13,
    name: '海鲜礼盒A套餐',
    categoryId: 41,
    categoryName: '固定包装产品 - 礼盒装',
    price: 588.00,
    originalPrice: 688.00,
    image: '/images/products/gift1.png',
    description: '精选8种海鲜，送礼体面，过节必备',
    buyers: 85,
    followers: 340,
    stock: 30,
    specs: [],
    hasSpecs: false,
    tags: ['礼盒', '送礼']
  },
  {
    id: 26,
    name: '海鲜礼盒B套餐',
    categoryId: 41,
    categoryName: '固定包装产品 - 礼盒装',
    price: 888.00,
    originalPrice: 1088.00,
    image: '/images/products/seafood_gift.jpg',
    description: '豪华12种海鲜大礼包，高端大气上档次',
    buyers: 52,
    followers: 268,
    stock: 20,
    specs: [],
    hasSpecs: false,
    tags: ['礼盒', '豪华']
  },
  // ===== 固定包装产品 - 家庭装 =====
  {
    id: 27,
    name: '海鲜家庭聚餐装',
    categoryId: 42,
    categoryName: '固定包装产品 - 家庭装',
    price: 298.00,
    originalPrice: 368.00,
    image: '/images/products/pack1.png',
    description: '6种海鲜搭配，3-5人家庭一顿吃个够',
    buyers: 165,
    followers: 285,
    stock: 50,
    specs: [],
    hasSpecs: false,
    tags: ['家庭装', '实惠']
  },
  {
    id: 28,
    name: '火锅海鲜拼盘',
    categoryId: 42,
    categoryName: '固定包装产品 - 家庭装',
    price: 198.00,
    originalPrice: 238.00,
    image: '/images/products/seafood_gift.jpg',
    description: '火锅必备海鲜拼盘，虾蟹贝鱼一应俱全',
    buyers: 238,
    followers: 356,
    stock: 80,
    specs: [],
    hasSpecs: false,
    tags: ['火锅', '拼盘']
  },
  // ===== 固定包装类 - 真空包装 =====
  {
    id: 14,
    name: '真空包装鱿鱼干',
    categoryId: 51,
    categoryName: '固定包装类 - 真空包装',
    price: 38.00,
    originalPrice: 45.00,
    image: '/images/products/frozen1.png',
    description: '精选大号鱿鱼干，真空保鲜，即拆即用',
    buyers: 325,
    followers: 215,
    stock: 300,
    specs: [],
    hasSpecs: false,
    tags: ['真空', '干货']
  },
  {
    id: 29,
    name: '真空装虾仁',
    categoryId: 51,
    categoryName: '固定包装类 - 真空包装',
    price: 52.00,
    originalPrice: 65.00,
    image: '/images/products/frozen2.png',
    description: '去壳虾仁，真空锁鲜，炒菜煮面方便',
    buyers: 412,
    followers: 298,
    stock: 250,
    specs: [],
    hasSpecs: false,
    tags: ['真空', '去壳']
  },
  // ===== 固定包装类 - 冰鲜包装 =====
  {
    id: 30,
    name: '冰鲜银鲳鱼',
    categoryId: 52,
    categoryName: '固定包装类 - 冰鲜包装',
    price: 42.00,
    originalPrice: 52.00,
    image: '/images/products/fish1.png',
    description: '冰鲜银鲳鱼，清蒸红烧皆宜，鲜嫩可口',
    buyers: 178,
    followers: 156,
    stock: 120,
    specs: [],
    hasSpecs: false,
    tags: ['冰鲜', '清蒸']
  },
  {
    id: 31,
    name: '冰鲜带鱼段',
    categoryId: 52,
    categoryName: '固定包装类 - 冰鲜包装',
    price: 35.00,
    originalPrice: 42.00,
    image: '/images/products/fish2.png',
    description: '舟山带鱼段，油炸香酥，红烧入味',
    buyers: 265,
    followers: 198,
    stock: 200,
    specs: [],
    hasSpecs: false,
    tags: ['冰鲜', '油炸']
  },
  // ===== 肉类/蛋 - 猪肉 =====
  {
    id: 32,
    name: '黑猪五花肉',
    categoryId: 61,
    categoryName: '肉类/蛋 - 猪肉',
    price: 35.00,
    originalPrice: 42.00,
    image: '/images/products/meat1.jpg',
    description: '散养黑猪五花，肥瘦相间，红烧必备',
    buyers: 356,
    followers: 268,
    stock: 80,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['黑猪', '散养']
  },
  {
    id: 33,
    name: '精品猪排骨',
    categoryId: 61,
    categoryName: '肉类/蛋 - 猪肉',
    price: 32.00,
    originalPrice: 38.00,
    image: '/images/products/meat1.jpg',
    description: '新鲜猪排骨，炖汤红烧，营养美味',
    buyers: 428,
    followers: 312,
    stock: 100,
    specs: [],
    hasSpecs: false,
    unit: '斤',
    tags: ['新鲜', '炖汤']
  },
  // ===== 肉类/蛋 - 牛肉 =====
  {
    id: 34,
    name: '澳洲肥牛卷',
    categoryId: 62,
    categoryName: '肉类/蛋 - 牛肉',
    price: 58.00,
    originalPrice: 72.00,
    image: '/images/products/meat1.jpg',
    description: '进口澳洲肥牛卷，火锅涮烧必备，入口嫩滑',
    buyers: 512,
    followers: 468,
    stock: 150,
    specs: [],
    hasSpecs: false,
    tags: ['进口', '火锅']
  },
  {
    id: 35,
    name: '和牛牛排',
    categoryId: 62,
    categoryName: '肉类/蛋 - 牛肉',
    price: 168.00,
    originalPrice: 198.00,
    image: '/images/products/meat1.jpg',
    description: 'M5级和牛西冷牛排，雪花纹理，煎烤绝佳',
    buyers: 186,
    followers: 358,
    stock: 40,
    specs: [
      { id: 1, name: '200g/片', price: 168.00 },
      { id: 2, name: '300g/片', price: 238.00 }
    ],
    hasSpecs: true,
    tags: ['和牛', 'M5']
  },
  // ===== 肉类/蛋 - 鸡蛋 =====
  {
    id: 36,
    name: '农家散养土鸡蛋',
    categoryId: 63,
    categoryName: '肉类/蛋 - 鸡蛋',
    price: 28.00,
    originalPrice: 35.00,
    image: '/images/products/eggs1.jpg',
    description: '农家散养土鸡蛋30枚装，蛋黄饱满浓郁',
    buyers: 685,
    followers: 520,
    stock: 200,
    specs: [],
    hasSpecs: false,
    tags: ['散养', '土鸡蛋']
  },
  {
    id: 37,
    name: '有机谷饲鸡蛋',
    categoryId: 63,
    categoryName: '肉类/蛋 - 鸡蛋',
    price: 42.00,
    originalPrice: 52.00,
    image: '/images/products/eggs1.jpg',
    description: '有机认证谷饲鸡蛋20枚装，安全放心',
    buyers: 325,
    followers: 286,
    stock: 150,
    specs: [],
    hasSpecs: false,
    tags: ['有机', '认证']
  }
]

// 首页轮播图 - 使用本地图片
const banners = [
  {
    id: 1,
    image: '/images/products/seafood_gift.jpg',
    title: '鲜活海鲜 产地直达',
    link: ''
  },
  {
    id: 2,
    image: '/images/products/gift1.png',
    title: '新用户专享 满199减50',
    link: ''
  },
  {
    id: 3,
    image: '/images/products/pack1.png',
    title: '海鲜礼盒 送礼优选',
    link: ''
  }
]

module.exports = {
  categories,
  products,
  banners
}