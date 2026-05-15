import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Copy, CheckCircle2, Sparkles, Rocket,
  Palette, BarChart3, Globe, Gamepad2,
  ShoppingCart, Music, Camera, Users,
  Calendar, Map, Building2, Target,
  ClipboardList, TrendingUp, Monitor,
  FileText, Layout, Orbit, Flame, TreePine, Boxes
} from 'lucide-react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 shrink-0 ${
        copied
          ? 'bg-green-500/20 text-green-600 border border-green-500/30'
          : 'bg-primary/5 text-secondary hover:text-primary hover:bg-primary/10 border border-primary/10'
      }`}
    >
      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
      {copied ? '已复制' : '复制'}
    </button>
  );
}

const PROMPT_CARDS = [
  {
    category: '📊 数据看板',
    color: 'blue',
    desc: '一句话生成数据大屏，数字会动、图表会跑',
    prompts: [
      {
        icon: <BarChart3 size={18} />,
        title: '经济运行数据大屏',
        tag: '数据大屏',
        prompt: '帮我做一个区域经济运行的数据展示大屏。深色科技风格，像电影里的指挥中心那种感觉。上面要展示这些数据：GDP增速（用折线图）、财政收入（用柱状图）、规上工业产值、固定资产投资完成进度、社会消费品零售总额、招商引资到位资金。顶部放几个核心指标的大数字卡片，数字要有从0跳到目标值的动画效果。数据你帮我编一些合理的模拟数据就行。整体要大气、专业。',
      },
      {
        icon: <TrendingUp size={18} />,
        title: '民生项目进度看板',
        tag: '项目跟踪',
        prompt: '帮我做一个十件民生实事项目的进度跟踪看板。项目有：老旧小区改造、学校扩建、社区卫生服务中心建设、道路修缮、公园绿地建设、养老服务站建设、农贸市场升级、雨污分流改造、充电桩安装、智慧安防建设。每个项目要显示：负责单位、计划完成时间、当前完成百分比（用进度条）、状态（进行中、已完成、滞后）。滞后的要标红提醒。上面可以按状态筛选。',
      },
      {
        icon: <Users size={18} />,
        title: '人口数据可视化',
        tag: '数据分析',
        prompt: '帮我做一个人口数据的可视化展示页面。某区总人口68万，要展示：年龄分布（0-14岁、15-59岁、60岁以上，用饼图）、8个街道各自的人口数量（用柱状图）、近五年人口变化趋势（用折线图）、男女比例、流动人口占比。深色风格，鼠标放上去能看到具体数字。数据帮我编合理的就行。',
      },
      {
        icon: <Monitor size={18} />,
        title: '12345热线数据看板',
        tag: '服务监控',
        prompt: '帮我做一个12345市民服务热线的数据看板。要展示：今天来电总量（大数字，有跳动效果）、每小时来电趋势图、来电分类占比（城市管理、环境保护、交通出行、教育医疗、住房物业）、各街道工单数量排名、平均处理时长、群众满意度评分。整体深色科技风格，数据用模拟的。',
      },
    ],
  },
  {
    category: '🏛️ 政务应用',
    color: 'green',
    desc: '报名、签到、投票、征集——做出来就能用',
    prompts: [
      {
        icon: <Calendar size={18} />,
        title: '活动报名页面',
        tag: '在线报名',
        prompt: '帮我做一个党建主题教育活动的在线报名页面。顶部用红色横幅显示活动名称"2026年度党建主题教育活动"，下面展示活动时间、地点、主讲人、活动简介。中间放一个报名表，要填：姓名、单位、职务、手机号，都是必填的。填完提交后显示"报名成功"的动画效果，同时显示当前已有多少人报名。页面底部滚动显示最近报名的人。整体风格庄重大气，以红色为主色调。',
      },
      {
        icon: <ClipboardList size={18} />,
        title: '会议签到系统',
        tag: '会议签到',
        prompt: '帮我做一个会议签到页面。顶部大字显示会议名称"2026年度工作推进会"，下面写时间和地点。中间是签到的表单：填姓名、单位、职务。提交后整个屏幕显示一个大大的"签到成功 ✓"的动画，过两秒自动回到签到页面。页面右边实时显示已签到人数和最近签到的人的名单。风格简洁专业。',
      },
      {
        icon: <Target size={18} />,
        title: '居民意见征集',
        tag: '问卷调查',
        prompt: '帮我做一个老旧小区改造的居民意见征集页面。包含这些问题：是否支持改造（单选：支持/不支持/无所谓）、希望改造哪些项目（多选：电梯加装、外墙翻新、管道更换、绿化提升、停车位改造、智能门禁）、对当前小区环境打分（1到5分）、其他建议（可以写文字）。提交后能看到实时的统计结果，用饼图和柱状图展示大家的选择。',
      },
      {
        icon: <Map size={18} />,
        title: '在线投票',
        tag: '投票',
        prompt: '帮我做一个在线投票页面。投票主题是"2026年社区改造优先项目"，选项有：老旧电梯更换、停车位扩建、绿化升级、健身设施增设、快递柜安装、路灯改造。每人只能投一票，投完之后实时显示每个选项的票数和百分比，用柱状图展示，有动画效果。页面顶部显示总共有多少人投了票。',
      },
    ],
  },
  {
    category: '🎨 视觉展示',
    color: 'cyan',
    desc: '3D 特效、粒子动画、炫酷大屏——视觉冲击力拉满',
    prompts: [
      {
        icon: <Orbit size={18} />,
        title: '3D 太阳系',
        tag: '3D 交互',
        prompt: '帮我做一个 3D 太阳系的页面。太阳在中间发光，八大行星围绕太阳旋转，每颗行星大小和颜色不同，轨道也不同。可以用鼠标拖动旋转视角、滚轮缩放。点击某颗行星会弹出它的名字和简介（比如"地球：我们的家园，距太阳1.5亿公里"）。背景是深色星空，有闪烁的星星。整体要有科幻感。',
      },
      {
        icon: <Sparkles size={18} />,
        title: '3D 粒子流动效果',
        tag: '粒子特效',
        prompt: '帮我做一个全屏的 3D 粒子流动效果页面。几千个发光的小粒子在屏幕上缓慢流动，形成波浪一样的形状。鼠标移动的时候，附近的粒子会被吸引或推开，跟着鼠标动。粒子颜色从蓝色渐变到紫色。背景纯黑，整体效果像科幻电影里的能量场。',
      },
      {
        icon: <Globe size={18} />,
        title: '3D 旋转地球',
        tag: '3D 地球',
        prompt: '帮我做一个 3D 旋转地球的页面。地球缓慢自转，表面能看到大陆轮廓，夜晚的那一面能看到城市灯光。地球表面有几条发光的弧线连接不同城市，表示数据在全球流动。背景是深色星空。可以用鼠标拖动地球旋转。页面顶部写"全球数字化协作网络"。',
      },
      {
        icon: <Flame size={18} />,
        title: '烟花表演',
        tag: '粒子特效',
        prompt: '帮我做一个全屏烟花表演的页面。点击屏幕任意位置就会在那个位置放一个烟花，烟花升空后炸开，有不同颜色和形状（圆形、心形、柳叶形）。粒子会慢慢下落消散，有拖尾效果。如果不点击，每隔几秒也会自动放一个烟花。背景是深色夜空。',
      },
      {
        icon: <Palette size={18} />,
        title: '智慧城市指挥中心',
        tag: '数据大屏',
        prompt: '帮我做一个智慧城市指挥中心的大屏展示页面。深色科技风格，中间放一个简化的城市地图，周围环绕六个数据模块：实时人口流动、交通拥堵指数（五条主要道路）、空气质量指数、今天政务服务办了多少件事、视频监控在线数量、应急事件统计。数字要有跳动效果，图表要有动态刷新的感觉，整体看起来像科幻电影里的城市指挥中心。数据用模拟的就行。',
      },
      {
        icon: <Camera size={18} />,
        title: '城市形象宣传页',
        tag: '品牌展示',
        prompt: '帮我做一个城市形象宣传的网页。城市名叫"滨江新区"，口号是"创新之城 活力滨江"。要有那种苹果官网的感觉：大标题、滑动的时候内容一屏一屏地渐入。分几屏展示：城市概况、四大产业优势（新能源、生物医药、智能制造、数字经济）、生态环境、人才政策、核心数据（GDP 580亿、人口68万、绿化率42%、高新企业326家）。配色用蓝色系，要现代、大气。',
      },
      {
        icon: <Building2 size={18} />,
        title: '招商引资展示页',
        tag: '招商展示',
        prompt: '帮我做一个招商引资的线上展示页面。要展示：园区概况（规划面积12平方公里、已入驻企业186家、年产值320亿）、四大主导产业的介绍卡片、优惠政策摘要（税收减免、租金补贴、人才奖励、研发补助）、3家代表企业的成功案例、底部放联系方式。深色高端风格，滑动的时候有动画效果。',
      },
    ],
  },
  {
    category: '🔧 实用工具',
    color: 'purple',
    desc: '日常能用到的小工具，做出来就能解决实际问题',
    prompts: [
      {
        icon: <FileText size={18} />,
        title: '公文排版工具',
        tag: '办公工具',
        prompt: '帮我做一个在线公文排版工具。左边是输入文字的区域，右边实时显示排版后的效果。上面有四个按钮："通知"、"报告"、"请示"、"批复"，点了之后自动套用对应的公文格式模板。标题用大号黑体居中，正文用仿宋字体，行距适当加大。预览区域看起来就像一份正式的公文，可以打印。',
      },
      {
        icon: <Layout size={18} />,
        title: '值班排班表',
        tag: '排班工具',
        prompt: '帮我做一个值班排班表生成工具。可以添加值班人员的名字，选择排班周期（一周或一个月），设置每天需要几个人值班（白班和夜班）。点"自动排班"按钮后，系统自动生成排班表，保证每个人的工作量差不多、不会连续上夜班。结果用日历表格展示，不同的人用不同颜色标注，可以手动拖动调整。',
      },
      {
        icon: <Map size={18} />,
        title: '网格化管理地图',
        tag: '网格管理',
        prompt: '帮我做一个社区网格化管理的页面。画一个简化的辖区地图，分成12个网格，每个网格上显示：编号、网格员姓名、管了多少户、这个月处理了多少件事。点击某个网格弹出详细信息：网格员的联系电话、这个月处理的事件列表。右边显示整个辖区的汇总：总户数、总事件数、处理完成率。',
      },
      {
        icon: <Calendar size={18} />,
        title: '工作日程看板',
        tag: '日程管理',
        prompt: '帮我做一个领导工作日程看板。左边是本周的日历（周一到周五），每天分上午和下午。右边显示选中时段的详细安排。先帮我填一些模拟日程：周一上午"区委常委会"、周一下午"调研高新区企业"、周二上午"接待省厅检查组"、周三下午"民生项目现场办公"等等。可以点击空白的时段添加新日程，也可以拖动调整。',
      },
    ],
  },
  {
    category: '🎮 轻松一刻',
    color: 'yellow',
    desc: '有趣的小应用，几分钟就能做出来玩',
    prompts: [
      {
        icon: <Gamepad2 size={18} />,
        title: '贪吃蛇小游戏',
        tag: '小游戏',
        prompt: '帮我做一个贪吃蛇游戏。要有计分板，蛇吃到东西后速度越来越快，撞到墙或者撞到自己就游戏结束。画面要好看：蛇的身体用渐变色，食物用小星星的样子，背景用深色网格。要有开始界面和游戏结束界面，结束时显示得分。',
      },
      {
        icon: <ShoppingCart size={18} />,
        title: '抽奖大转盘',
        tag: '互动抽奖',
        prompt: '帮我做一个大转盘抽奖页面。转盘分成8个格子，奖品有：一等奖华为手机、二等奖蓝牙耳机、三等奖保温杯，还有几个参与奖是笔记本和钥匙扣。点击中间的按钮转盘开始旋转，先快后慢，最后停在某个奖品上，弹出中奖的庆祝动画和彩带特效。',
      },
      {
        icon: <Music size={18} />,
        title: '在线钢琴',
        tag: '音乐',
        prompt: '帮我做一个网页版的钢琴。显示两排黑白琴键，用鼠标点击就能弹出声音，键盘上的按键也能对应弹奏。按下琴键的时候有按压的动画和发光效果。页面下方显示当前弹的是什么音符。',
      },
    ],
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; tag: string }> = {
  blue: { border: 'border-blue-400/20', bg: 'bg-blue-400/5', text: 'text-blue-400', tag: 'bg-blue-400/10 text-blue-400' },
  green: { border: 'border-green-400/20', bg: 'bg-green-400/5', text: 'text-green-400', tag: 'bg-green-400/10 text-green-400' },
  cyan: { border: 'border-cyan-400/20', bg: 'bg-cyan-400/5', text: 'text-cyan-400', tag: 'bg-cyan-400/10 text-cyan-400' },
  purple: { border: 'border-purple-400/20', bg: 'bg-purple-400/5', text: 'text-purple-400', tag: 'bg-purple-400/10 text-purple-400' },
  yellow: { border: 'border-yellow-400/20', bg: 'bg-yellow-400/5', text: 'text-yellow-400', tag: 'bg-yellow-400/10 text-yellow-400' },
};

const EasyVibePage: React.FC = () => {
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);

  return (
    <div className="bg-background min-h-screen text-primary selection:bg-accent/20 selection:text-white">
      <main className="py-20 px-8 md:px-20">
        <div className="max-w-[1100px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <Rocket size={14} />
              AI 编程实时演示
            </div>
            <h1 className="font-bold text-4xl md:text-5xl tracking-tight text-primary mb-4">
              选一个感兴趣的场景
            </h1>
            <p className="text-secondary text-lg">
              点开看看，挑一个喜欢的，我们现场演示给您看
            </p>
          </motion.div>

          {PROMPT_CARDS.map((group, gi) => {
            const c = colorMap[group.color] || colorMap.blue;
            return (
              <div key={gi} className="mb-14">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className={`font-bold text-lg ${c.text}`}>{group.category}</span>
                </div>
                <p className="text-secondary text-sm mb-5">{group.desc}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {group.prompts.map((p, pi) => {
                    const key = `${gi}-${pi}`;
                    const isExpanded = expandedPrompt === key;
                    return (
                      <motion.div
                        key={pi}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: pi * 0.05 }}
                        className={`bento-card rounded-xl border ${c.border} overflow-hidden`}
                      >
                        <button
                          onClick={() => setExpandedPrompt(isExpanded ? null : key)}
                          className="w-full p-5 text-left hover:bg-primary/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center ${c.text}`}>
                              {p.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-primary font-semibold text-sm">{p.title}</div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${c.tag} shrink-0`}>{p.tag}</span>
                          </div>
                          <p className="text-secondary text-xs leading-relaxed line-clamp-2">{p.prompt.slice(0, 80)}...</p>
                        </button>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.15 }}
                            className="px-5 pb-5 border-t border-primary/5"
                          >
                            <div className="mt-4 bg-primary/5 rounded-lg p-4 mb-4">
                              <p className="text-primary/80 text-sm leading-relaxed">{p.prompt}</p>
                            </div>
                            <CopyButton text={p.prompt} />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bento-card rounded-2xl p-8 text-center"
          >
            <Sparkles size={20} className="text-accent mx-auto mb-4" />
            <p className="text-primary font-semibold text-lg mb-2">当然，您也可以提自己的想法</p>
            <p className="text-secondary text-sm max-w-md mx-auto">
              以上只是几个示例场景。您随时可以说出自己想要的东西，我们现场帮您实现。
            </p>
          </motion.div>

        </div>
      </main>
      <footer className="py-6 px-8 text-center text-secondary/30 text-xs border-t border-primary/5">
        会说话，就会做应用
      </footer>
    </div>
  );
};

export default EasyVibePage;
