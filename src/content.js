export const profile = {
  name: '边江', role: '短视频编导', email: '1529547087@qq.com', wechat: '', phone: '18147163761',
  introduction: '我是边江，计算机科学与技术专业本科毕业。做过家政垂类账号的新媒体运营，独立完成从选题、脚本、分镜到现场拍摄、后期剪辑与发布的完整流程。我关注观众为什么停下来，也关注一句话如何变成有节奏、有情绪的画面。',
  portrait: './media/portrait.jpg', avatar: './media/avatar.png',
  heroPoster: './media/works/03.jpg', heroVideo: './media/showreel.mp4',
  stats: [{value:'10+',label:'条垂类短视频产出'},{value:'11',label:'支作品收录'},{value:'本科',label:'计算机科学与技术'}],
  experience: [
    {date:'2024.08 — 2024.12',title:'锋艳家政 · 新媒体运营',text:'独立负责家政垂类账号内容：选题策划、脚本、分镜、拍摄、剪辑与发布；累计产出 10+ 条短视频，并辅助准备直播素材。'},
    {date:'2020 — 2024',title:'内蒙古科技大学 · 本科',text:'计算机科学与技术专业。从用户视角理解内容交互，将技术背景用于视频制作工具的学习与内容落地。'},
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
  {n:'01',title:'从用户需求里找选题。',en:'CONTENT STRATEGY',text:'有家政垂类账号实操经历，围绕真实生活场景做选题，关注开场钩子、信息结构与观众的观看理由。',tags:'垂类账号 · 选题策划 · 内容钩子'},
  {n:'02',title:'从脚本，一直跟到成片。',en:'END-TO-END PRODUCTION',text:'独立完成脚本撰写、分镜设计、现场拍摄、剪辑、字幕配乐与发布，理解每个环节如何影响最终表达。',tags:'脚本分镜 · 拍摄剪辑 · 上线发布'},
  {n:'03',title:'用技术背景，提高落地效率。',en:'TECH & EXECUTION',text:'计算机专业背景，能够学习并运用视频制作工具；结合观众视角调整叙事节奏，让创意落实为可执行的内容。',tags:'工具应用 · 视听节奏 · 执行落地'},
]
