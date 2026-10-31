/**
 * 演示数据注入脚本（可选）
 *
 * 用法：在浏览器打开工作台后，按 F12 打开控制台，
 *      把本文件内容整段粘贴进去回车，然后刷新页面即可看到示例数据。
 *
 * 清除演示数据：控制台执行 localStorage.clear() 后刷新。
 */
(function seedWorkspaceDemo() {
  const pad = (n) => String(n).padStart(2, '0');
  const day = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7;
  const weekKey = day(-mondayOffset);

  const data = {
    todos: [
      { id: 't1', title: '整理季度报表并发给主管', priority: 'high', due: day(0), done: false, createdAt: day(0) + 'T08:00:00.000Z' },
      { id: 't2', title: '预约牙科复诊', priority: 'mid', due: day(1), done: false, createdAt: day(-1) + 'T08:00:00.000Z' },
      { id: 't3', title: '给绿植换盆', priority: 'low', done: false, createdAt: day(-2) + 'T08:00:00.000Z' },
      { id: 't4', title: '读完《深度工作》第 3 章', priority: 'mid', due: day(-1), done: false, createdAt: day(-3) + 'T08:00:00.000Z' },
      { id: 't5', title: '整理手机相册', priority: 'low', done: true, doneAt: day(-1) + 'T10:22:00.000Z', createdAt: day(-5) + 'T08:00:00.000Z' },
      { id: 't6', title: '续费宽带', priority: 'high', done: true, doneAt: day(-3) + 'T15:00:00.000Z', createdAt: day(-6) + 'T08:00:00.000Z' },
      { id: 't7', title: '买猫粮', priority: 'mid', done: true, doneAt: day(-6) + 'T19:00:00.000Z', createdAt: day(-8) + 'T08:00:00.000Z' },
    ],
    reminders: [
      { id: 'r1', title: '交房租', category: 'life', date: day(0), time: '09:00', done: false, note: '转账给房东', createdAt: day(-5) + 'T08:00:00Z' },
      { id: 'r2', title: '周会 · 项目进度同步', category: 'work', date: day(0), time: '14:30', done: false, createdAt: day(-4) + 'T08:00:00Z' },
      { id: 'r3', title: '取快递（丰巢）', category: 'life', date: day(0), time: '19:00', done: false, createdAt: day(-2) + 'T08:00:00Z' },
      { id: 'r4', title: '健身私教课', category: 'health', date: day(1), time: '20:00', done: false, createdAt: day(-3) + 'T08:00:00Z' },
      { id: 'r5', title: '给爸妈打电话', category: 'life', date: day(-1), time: '21:00', done: false, createdAt: day(-6) + 'T08:00:00Z' },
      { id: 'r6', title: '提交报销单', category: 'work', date: day(-2), time: '18:00', done: false, createdAt: day(-7) + 'T08:00:00Z' },
      { id: 'r7', title: '英语打卡营结课', category: 'study', date: day(3), time: '10:00', done: false, createdAt: day(-9) + 'T08:00:00Z' },
    ],
    habits: [
      { id: 'h1', name: '早起', emoji: '🌅', color: '#F97362', createdAt: day(-40), records: [day(-1), day(-2), day(-3), day(-4), day(-5), day(-8)] },
      { id: 'h2', name: '阅读 30 分钟', emoji: '📖', color: '#7C9EE8', createdAt: day(-40), records: [day(-1), day(-2), day(-3), day(-5), day(-6), day(-7)] },
      { id: 'h3', name: '运动', emoji: '🏃', color: '#4FB286', createdAt: day(-40), records: [day(-2), day(-3), day(-4), day(-6)] },
      { id: 'h4', name: '喝够 8 杯水', emoji: '💧', color: '#5EB8D6', createdAt: day(-40), records: [day(-1), day(-2), day(-4), day(-5), day(-6), day(-9)] },
      { id: 'h5', name: '早睡', emoji: '🌙', color: '#9A86D6', createdAt: day(-40), records: [day(-2), day(-3), day(-5), day(-8)] },
    ],
    ledger: [
      { id: 'e1', amount: 32, type: 'expense', category: 'food', note: '午餐 沙拉', date: day(0) },
      { id: 'e2', amount: 6, type: 'expense', category: 'transport', note: '地铁', date: day(0) },
      { id: 'e3', amount: 128, type: 'expense', category: 'shopping', note: '猫粮', date: day(-1) },
      { id: 'e4', amount: 58, type: 'expense', category: 'food', note: '晚饭 火锅', date: day(-1) },
      { id: 'e5', amount: 19.9, type: 'expense', category: 'fun', note: '视频会员', date: day(-2) },
      { id: 'e6', amount: 2400, type: 'expense', category: 'home', note: '房租', date: day(-5) },
      { id: 'e7', amount: 45, type: 'expense', category: 'medical', note: '感冒药', date: day(-6) },
      { id: 'e8', amount: 99, type: 'expense', category: 'study', note: '英语课', date: day(-7) },
      { id: 'e9', amount: 12000, type: 'income', category: 'other', note: '工资', date: day(-8) },
    ],
    storage: [
      { id: 's1', name: '充电宝', category: '书房', location: '书桌第二层抽屉', qty: 1, note: '20000mAh', createdAt: day(-20) },
      { id: 's2', name: '护照', category: '卧室', location: '衣柜顶层收纳盒', qty: 1, createdAt: day(-30) },
      { id: 's3', name: '螺丝刀套装', category: '储物间', location: '蓝色工具箱', qty: 1, createdAt: day(-25) },
      { id: 's4', name: '备用数据线', category: '客厅', location: '电视柜右侧抽屉', qty: 3, createdAt: day(-15) },
      { id: 's5', name: '单反相机', category: '卧室', location: '床下收纳箱', qty: 1, lentTo: '小李', lentAt: day(-3), createdAt: day(-10) },
    ],
    ideas: [
      { id: 'i1', text: '做一个「每周只做三件事」的方法论，减少决策疲劳。', tag: 'idea', starred: true, createdAt: day(0) + 'T09:00:00Z' },
      { id: 'i2', text: '《人类简史》—— 待读，先看第 4 部分。', tag: 'read', starred: false, createdAt: day(-1) + 'T20:00:00Z' },
      { id: 'i3', text: '纪录片《地球脉动》第三季，周末看。', tag: 'watch', starred: true, createdAt: day(-2) + 'T21:00:00Z' },
      { id: 'i4', text: '把阳台改造成小书角：一把椅子 + 一盏落地灯 + 一个小书架。', tag: 'idea', starred: false, createdAt: day(-4) + 'T14:00:00Z' },
    ],
    reviews: {
      [weekKey]: {
        good: '这周早起坚持了 5 天，阅读也基本没断。',
        bad: '晚上刷手机太久，导致睡晚了。',
        next: '1. 22:30 前放下手机\n2. 完成季度报表\n3. 周末去爬山',
        updatedAt: day(-2) + 'T22:00:00Z',
      },
    },
    meta: { lastOpen: day(0), nickname: '我' },
  };

  Object.entries(data).forEach(([k, v]) => {
    localStorage.setItem('wb.v1.' + k, JSON.stringify(v));
  });
  console.log('✅ 演示数据已写入，请刷新页面');
})();
