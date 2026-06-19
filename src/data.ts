/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, WorkExperience, EducationExperience, SoftwareTool } from './types';

export const USER_INFO = {
  name: '林长源 (CHANGYUAN LIN)',
  role: '3D产品缔造师 / 包装美学研究者 / AI创意探索家',
  phone: '15625032523',
  email: '1066416052@qq.com',
  wechatQR: 'https://i.postimg.cc/4xr3cD23/wei-biao-ti-1.jpg', // Updated QR Code
  bioBrief: '专注于3D渲染、品牌包装美学与AI辅助原生创意的资深视觉设计师。致力于在极简与高感度、理智与先锋视觉之间寻找黄金平衡点，让每一个包装呈现高级的雕塑感与质感。',
  quote: '用光影雕刻产品的物理深度，用排版克制图像的过度喧嚣。'
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'w1',
    company: '广州御艾化妆品有限公司',
    role: 'Brand Strategy Department  | 品牌策略部',
    period: '2024.01 - 至今',
    description: [
      '负责整个团队的3D主视觉，产品塑造，光影渲染。',
      '负责公司每季展会场地模型效果搭建，美陈，风格设定。',
      '负责国内，国外品牌/0EM品牌代工包装设计，风格定问，成品跟踪落地。'
    ],
    tags: ['3D主视觉', '展会模型', '品牌包装设计', 'OEM风格定向']
  },
  {
    id: 'w2',
    company: '广州御艾化妆品有限公司',
    role: 'OEM代工品牌设计部',
    period: '2022.01 - 2023.12',
    description: [
      '主攻OEM品牌产品加工外包装，名片，画册，折页，说明书，等相关 物料设计，包装包括但不限于单卡盒，套盒，手提袋，纸箱等等。',
      '团队协作，深度配合，研究工艺纸制、烫金、无色差金属材料建模及模具滨染标准，精准把控产品最终效果的还原。'
    ],
    tags: ['OEM外包装', '物料设计', '物料工艺', '效果还原']
  }
];

export const EDUCATION: EducationExperience[] = [
  {
    id: 'e1',
    school: '广州华夏职业学院',
    major: '设计类/计算机网页设计类方向',
    period: '2013.09 - 2015.06',
    achievements: [
      '主修设计，网页，平面，创意排版等专业课程，夯实视觉与页面布局基础。'
    ]
  }
];

export const SOFTWARE_TOOLS: SoftwareTool[] = [
  { name: 'Cinema 4D', level: '精通 / 全能工作流', percentage: 95, category: '3D', color: '#3182CE' },
  { name: 'Adobe Lightroom', level: '精通 / 后期影调与质感调色', percentage: 90, category: 'Design', color: '#DD6B20' },
  { name: 'Redshift 3.5.24', level: '精通 / 极致品质与复杂材质渲染', percentage: 96, category: 'Rendering', color: '#1A365D' },
  { name: 'RizomUV VS RS 2024.1', level: '精通 / 硬表面与金属高精度', percentage: 88, category: 'Rendering', color: '#4A5568' },
  { name: 'Adobe Illustrator', level: '精通 / 精准刀模与矢量排版', percentage: 94, category: 'Design', color: '#E53E3E' },
  { name: 'Adobe Photoshop', level: '精通 / 三维重度调色与合成', percentage: 92, category: 'Design', color: '#3182CE' },
  { name: 'Jimeng', level: '熟练 / 概念快速提案与创意设计', percentage: 91, category: 'AI', color: '#00A3C4' },
  { name: 'ChatGPT Images 2.0', level: '熟练 / 智能生图与提示词工程', percentage: 86, category: 'AI', color: '#805AD5' }
];

// Helper to generate distinct gradients programmatically so we have 50 items per group, each fully structured
const GRADIENTS_LIGHT_BLUE = [
  { s: '#E0F2FE', e: '#BAE6FD', a: '#0284C7' }, // Sky 100/200/600
  { s: '#F0F9FF', e: '#E0F2FE', a: '#0369A1' }, // Sky 50/100/700
  { s: '#ECFDF5', e: '#D1FAE5', a: '#059669' }, // Emerald soft (touch of teal)
  { s: '#F0FDFA', e: '#CCFBF1', a: '#0D9488' }, // Teal soft
  { s: '#EFF6FF', e: '#DBEAFE', a: '#2563EB' }, // Blue soft
  { s: '#F5F3FF', e: '#EDE9FE', a: '#7C3AED' }, // Violet soft
  { s: '#E0F7FA', e: '#B2EBF2', a: '#00ACC1' }, // Cyan light
  { s: '#E8EAF6', e: '#C5CAE9', a: '#3F51B5' }, // Indigo light
];

const PACKAGING_CATEGORIES = [
  '美妆礼盒', '极简烈酒瓶', '科技产品包装', '环保冷塑纸袋', '晶体香水瓶', 
  '轻餐饮罐', '香氛蜡烛木盒', '手工极简皂盒', '未来机能胶囊', '复古唱片纸卡'
];

const PACKAGING_PRODUCTS = [
  '黑曜石系列肌底液瓶', '「纯净之域」无菌乳液', '冷冽琴酒 限量磨砂瓶', '磁吸无线耳机 浮雕纸盒', '重构能量 胶囊瓶',
  '极简精油 滴管玻璃舱', '古树单丛 极简竹浆罐', '野奢雪松 扩香石木器', '折叠模块化 精致首饰盒', '气味实验室 试管试用装',
  '深海珍珠 提取胶质液', '高纬精酿 铝罐极简浮雕', '手工燕麦皂 模约束带', '低干预起泡酒 空白艺术标', '固态香膏 铝合金拉丝壳',
  '降解淀粉 3C配件防震托', '精奢机械表 无缝磁吸包装', '微胶囊面霜 双层悬浮悬空罐', '寒冷山脊 冰川威士忌瓶', '黑卡纸 奢华多边形提袋'
];

const RENDERING_PRODUCTS = [
  '高光钛金属 表盘折光', '真空液态悬浮 几何体', '无缝陶瓷 模块化花器', '磨砂水晶 异形棱镜折射', '不锈钢几何 建筑托盘',
  '重力感应 金属唱机', '解构主义 弯曲曲褶单椅', '雾面白陶瓷 水龙头流体', '多维镜面 数码充电方砖', '极简硅胶 便携多功能灯',
  '吹制双层玻璃 烛台晕染', '太空铝 合金拼接键盘', '真空电镀 炫彩反射玻璃球', '火山岩肌理 香薰扩散盘', '大理石榫卯 结构实验台',
  '聚碳酸酯 充气透明躺椅', '磨砂树脂 阶梯艺术雕塑', '悬吊电磁 永动黄铜指针', '波浪拉丝阳极氧化 电脑箱', '温润白玉 质感无线充面板'
];

const AI_PRODUCTS = [
  '生物机械 仿生菌落雕塑', '新未来主义 降解材料服装', '星尘微光 抽象光流纤维', '极寒重力 浮空矿石建筑', '后人类 异形流线机能头盔',
  '神经突触 光纤编织地毯', '概念钛合金 超凡概念运动鞋', '赛博温室 活性叶脉太阳能板', '深海发光 凝胶净化质感瓶', '多维时空 粒子坍缩沙漏',
  '星际苔藓 培养舱阵列', '暗物质 水晶聚光透镜', '重力倒置 液体悬垂面霜构想', '智能液态 触感自适应背包', '光合作用 仿生多叶片吊灯'
];

const SHAPES: PortfolioItem['shapeType'][] = ['bottle', 'box', 'cylinder', 'abstract', 'sphere', 'poly', 'organic', 'donut'];

export const REAL_PACKAGING_IMAGES = [
  'https://i.postimg.cc/5tSQWwG5/1.jpg',
  'https://i.postimg.cc/MGmfJy4q/1-1.jpg',
  'https://i.postimg.cc/QCyWnhzn/1-2.jpg',
  'https://i.postimg.cc/d3xTSwXY/1-3.jpg',
  'https://i.postimg.cc/5yRFkbrL/1-AOV-yuan.jpg',
  'https://i.postimg.cc/VNW0PjTW/1-AOV-yuan.png',
  'https://i.postimg.cc/m2KHYZCr/10.jpg',
  'https://i.postimg.cc/W4vqy99P/100-1.jpg',
  'https://i.postimg.cc/JhLHFTT1/112.jpg',
  'https://i.postimg.cc/d1W7LJwz/1226.jpg',
  'https://i.postimg.cc/CKsnpjtG/132.jpg',
  'https://i.postimg.cc/Pf3ZqQqy/2.jpg',
  'https://i.postimg.cc/3rSpwFwc/2-AOV-yuan.jpg',
  'https://i.postimg.cc/qMW3sBy6/25.jpg',
  'https://i.postimg.cc/MpRjdkmR/29.jpg',
  'https://i.postimg.cc/qMNK66tW/3.jpg',
  'https://i.postimg.cc/yYDR33Jn/3-1.jpg',
  'https://i.postimg.cc/L6JPggY9/3-3.jpg',
  'https://i.postimg.cc/CKsnpjtN/336.jpg',
  'https://i.postimg.cc/9MXRmD5t/445.png',
  'https://i.postimg.cc/FHcJDtVP/55.jpg',
  'https://i.postimg.cc/6pRGYsfF/66.png',
  'https://i.postimg.cc/zBDbzyZC/661.jpg',
  'https://i.postimg.cc/NMG9sKqk/666.jpg',
  'https://i.postimg.cc/85kJp7QK/771.jpg',
  'https://i.postimg.cc/DZCW87nM/868.png',
  'https://i.postimg.cc/25DLtH0X/88.jpg',
  'https://i.postimg.cc/ydfJk7sG/888.jpg',
  'https://i.postimg.cc/8Px6RkMT/9.jpg',
  'https://i.postimg.cc/WzChwSDw/liang-ge-zhi-he-AOV-yuan.jpg',
  'https://i.postimg.cc/ZRf9CJJK/dong-ling-huan-cai2.jpg',
  'https://i.postimg.cc/44S7G48c/tao-zhuang-AOV-yuan.jpg',
  'https://i.postimg.cc/TY5y38FG/xiao-guo-tu.jpg',
  'https://i.postimg.cc/MKfcpk43/xiao-guo-tu-(2).jpg',
  'https://i.postimg.cc/hPQJtF64/xiao-guo-tu-(3).jpg',
  'https://i.postimg.cc/jdnWSVm5/xiao-guo-tu2.jpg',
  'https://i.postimg.cc/bwXZGCfr/xiao-guo-tu-tu.png',
  'https://i.postimg.cc/52cXH7Wv/xiao-guo-tu-xuan-ran.jpg',
  'https://i.postimg.cc/V67SdzzN/ban.jpg',
  'https://i.postimg.cc/DfMJhfCR/wei-biao-ti-2.jpg',
  'https://i.postimg.cc/jqFwTq8p/wei-biao-ti-2-AOV-yuan.jpg',
  'https://i.postimg.cc/PJ9PQKLc/hua-ban-1.png',
  'https://i.postimg.cc/qqzNKW7n/hua-ban-1-kao-bei.png',
  'https://i.postimg.cc/vZR41qw6/yan-tie-mo.jpg',
  'https://i.postimg.cc/jSVDWgY6/zu-he1.jpg',
  'https://i.postimg.cc/44S7G48h/shu-min-xiu-hu.jpg',
  'https://i.postimg.cc/DfMJhfCS/shi-jiao2.jpg',
  'https://i.postimg.cc/DZCW877w/gui-fu-gao.jpg',
  'https://i.postimg.cc/MZFMwZsP/tie-guan2-AOV-yuan.jpg',
  'https://i.postimg.cc/yxkDR2Np/mian-mo-he.jpg'
];

// Programmatically generate exactly 50 packaging design items
export const PACKAGING_PORTFOLIO: PortfolioItem[] = Array.from({ length: 50 }).map((_, i) => {
  const index = i + 1;
  const prodName = PACKAGING_PRODUCTS[i % PACKAGING_PRODUCTS.length];
  const cat = PACKAGING_CATEGORIES[i % PACKAGING_CATEGORIES.length];
  const grad = GRADIENTS_LIGHT_BLUE[i % GRADIENTS_LIGHT_BLUE.length];
  const shape = SHAPES[i % SHAPES.length];
  
  return {
    id: `pack-${index}`,
    index,
    title: `${prodName} v${1.0 + (i % 3) * 0.2}`,
    category: `[${cat}]`,
    software: i % 2 === 0 ? ['Cinema 4D', 'Octane Render', 'Illustrator'] : ['Blender', 'KeyShot', 'Photoshop'],
    year: `${2024 + Math.floor(i / 18)}.${String((i % 12) + 1).padStart(2, '0')}`,
    description: `一款融合极简网格结构与温润触觉材质的精品包装。专注于在精密度与空灵感之间寻找张力，第 ${index} 号打样探索实验。`,
    gradientStart: grad.s,
    gradientEnd: grad.e,
    accentColor: grad.a,
    shapeType: shape,
    complexity: 4 + (i % 5),
    imageUrl: REAL_PACKAGING_IMAGES[i % REAL_PACKAGING_IMAGES.length]
  };
});

// Programmatically generate exactly 50 3D rendering items
export const RENDERING_PORTFOLIO: PortfolioItem[] = Array.from({ length: 50 }).map((_, i) => {
  const index = i + 1;
  const prodName = RENDERING_PRODUCTS[i % RENDERING_PRODUCTS.length];
  const grad = GRADIENTS_LIGHT_BLUE[(i + 3) % GRADIENTS_LIGHT_BLUE.length];
  const shape = SHAPES[(i + 2) % SHAPES.length];
  
  return {
    id: `render-${index}`,
    index,
    title: `${prodName} - 触感研习 ${index}`,
    category: '[3D静物构想]',
    software: i % 3 === 0 ? ['Blender', 'Cycles'] : i % 3 === 1 ? ['Cinema 4D', 'Octane Render'] : ['Rhino 3D', 'KeyShot'],
    year: `${2024 + Math.floor(i / 15)}.${String((i % 11) + 1).padStart(2, '0')}`,
    description: `探索物理世界真实折射与微褶皱的漫反射效果。通过局部弱光与强烈焦散渲染，打造带有哲学沉思氛围的几何解构，重构纯粹静物张力。`,
    gradientStart: grad.s,
    gradientEnd: grad.e,
    accentColor: grad.a,
    shapeType: shape,
    complexity: 6 + (i % 4)
  };
});

// Programmatically generate exactly 50 AI portfolio items
export const AI_PORTFOLIO: PortfolioItem[] = Array.from({ length: 50 }).map((_, i) => {
  const index = i + 1;
  const prodName = AI_PRODUCTS[i % AI_PRODUCTS.length];
  const grad = GRADIENTS_LIGHT_BLUE[(i + i % 4) % GRADIENTS_LIGHT_BLUE.length];
  const shape = SHAPES[(i + 5) % SHAPES.length];
  
  return {
    id: `ai-${index}`,
    index,
    title: `${prodName} - 神经突触 ${String(index + 320).padStart(3, '0')}`,
    category: '[AI生成物态]',
    software: i % 2 === 0 ? ['Midjourney V6', 'Photoshop AI'] : ['Stable Diffusion XL', 'ControlNet', 'Magnific AI'],
    year: `2025.${String((i % 12) + 1).padStart(2, '0')}`,
    description: `基于扩散模型的潜空间图像计算，运用严谨的控制贴图引导（ControlNet），实现有机形态、异质编织流光与钛合金装甲的超现实拼贴。`,
    gradientStart: grad.s,
    gradientEnd: grad.e,
    accentColor: grad.a,
    shapeType: shape,
    complexity: 5 + (i % 5)
  };
});
