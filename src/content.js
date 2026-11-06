export const profile = {
  name: '边江', role: '短视频编导', email: '1529547087@qq.com', wechat: '', phone: '18147163761',
  introduction: '我是边江，短视频编导，参与过「包放历史讲堂」和「沈奕斐」两个知识类 IP 的抖音内容制作。我从育儿、婚恋和家庭沟通中的真实问题找选题，用历史故事或影视片段引出专业观点，再通过脚本和剪辑把一条视频的核心观点讲清楚。',
  portrait: './media/portrait.jpg', avatar: './media/avatar.png',
  heroPoster: './media/works/03.jpg', heroVideo: './media/showreel.mp4',
  stats: [{value:'2',label:'个知识类 IP 项目'},{value:'295',label:'条 · 包放历史讲堂账号作品'},{value:'19.8万',label:'赞 · 包放历史讲堂代表作'}],
  experience: [
    {date:'2025.04 — 2026.10',title:'深圳市远见优识文化有限公司 · IP 编导',project:'包放历史讲堂',url:'https://www.douyin.com/user/MS4wLjABAAAA4k8-XAm-5cosv5SfRQP9J-vW9HUbjnzYGWzhckI3UHs',text:'负责历史知识与家庭教育 IP 的选题、脚本、剪辑和发布，用历史故事回应孩子沉迷手机、青春期沟通等育儿问题。参与高赞内容复盘，通过视频结尾、置顶内容和评论答疑承接课程咨询。项目账号累计发布 295 条作品，两条代表作分别获赞 19.8 万和 12.3 万。'},
    {date:'2023.10 — 2025.02',title:'世间万相 · 短视频编导实习生',project:'沈奕斐',url:'https://www.douyin.com/user/MS4wLjABAAAAdN0o_YrFmXWxpwe8wnTRozgW_hs7hgocDz19_zxj2tiJdxIRNgf_yr-aAje2_MYO',text:'协助搜集婚恋、家庭教育等领域的选题，整理影视与综艺素材，参与口播和素材剪辑、抖音发布与账号维护。剪辑时保留观点的上下文。项目账号三条置顶作品分别获赞 34.7 万、34 万和 12.5 万。'},
    {date:'2020 — 2024',title:'内蒙古科技大学 · 本科',text:'计算机科学与技术专业。把对用户认知和内容交互的理解用在短视频创作中，从观众视角设计开场和叙事节奏。'},
  ],
}
const work = (id,title,english,category,duration,description) => ({id,title,english,category,duration,description,image:`./media/works/${id}.jpg`,video:`./media/works/${id}.mp4`,roles:`全流程创作 / 选题 · 脚本 · 拍摄 · 出镜 · 剪辑`})
// 标题和分类按视频画面整理，不推测具体项目职责或播放成绩。
export const projects = [
  work('03','走进日常，记录生活的片刻。','LIFE, IN FRAMES','生活记录','00:55','从户外景色到餐桌与室内片段，用日常画面记录生活。'),
  work('02','街头烟火里的生活切片。','AFTER HOURS','生活记录','01:12','夜间街市、摊位与行人，组成一次街头生活记录。'),
  work('08','把对话，放到真实场景里。','A CONVERSATION','街头互动','00:39','在户外场景中展开人物互动，以现场对话带动内容。'),
  work('05','镜头前，把观点讲清楚。','SPEAK TO CAMERA','IP口播','01:20','结合人物口播、聊天截图和字幕，组织观点与信息。'),
  work('06','让表达有变化，让信息有节奏。','WORDS IN MOTION','IP口播','00:51','人物在不同景别与场景中讲述，用画面变化配合内容推进。'),
  work('11','围绕一个问题，展开一次表达。','ONE POINT OF VIEW','IP口播','01:04','以人物正面口播为主体，搭配字幕与画面信息传达内容。'),
  work('07','从镜头前，走到剪辑时间线。','BEHIND THE EDIT','内容教程','01:11','结合出镜讲解、电脑操作与剪辑界面，展示内容制作过程。'),
  work('10','办公室里的一段小插曲。','OFFICE SCENE','场景短剧','00:30','围绕办公室内的人物对话展开，用切换镜头呈现互动。'),
  work('04','跟着一个动作，进入故事。','FOLLOW THE MOMENT','场景短剧','00:21','以人物动作与场景转换串联片段，呈现轻量化情节。'),
  work('09','把聊天记录，变成叙事线索。','BETWEEN THE LINES','IP口播','00:36','人物出镜与聊天界面交替出现，以屏幕信息辅助讲述。'),
  work('01','从一段屏幕信息开始。','ON THE SCREEN','内容教程','00:23','通过手机界面录屏与字幕呈现操作和信息。'),
]
export const strengths = [
  {n:'01',title:'从真实问题里找选题。',en:'CONTENT STRATEGY',text:'从婚恋、育儿和家庭沟通中提炼选题，用历史故事或影视片段引出观点。拆解对标账号的标题、开头和叙事结构，找到适合自身 IP 的表达。',tags:'知识类 IP · 选题策划 · 内容复盘'},
  {n:'02',title:'用一个故事讲清一个观点。',en:'SCRIPT & EDITING',text:'把历史和社会学内容写成通俗的口播脚本，前三秒切入观众关心的问题。能用微单拍摄，并在剪辑中精简铺垫、把控节奏、保留观点的上下文。',tags:'口播脚本 · 微单拍摄 · 视频剪辑'},
  {n:'03',title:'让内容接得住观众的需求。',en:'CONTENT OPERATIONS',text:'通过视频结尾、置顶内容和评论答疑承接课程咨询。使用 ChatGPT、WorkBuddy、即梦和 Lib TV 辅助创作，把常用提示词和步骤整理为可复用的技能包。',tags:'抖音运营 · 课程引导 · AI 辅助创作'},
]
