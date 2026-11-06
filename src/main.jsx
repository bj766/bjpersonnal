import React, {useEffect, useRef, useState} from 'react'
import {createRoot} from 'react-dom/client'
import {profile, projects, strengths} from './content'
import './style.css'
import NeuralTunnel from './NeuralTunnel'
import GlimmerWrap from './GlimmerWrap'
import ContactFunnel from './ContactFunnel'
import HeroWorkStrip from './HeroWorkStrip'
import {ParallaxPanel, TileReveal, TileWorks} from './ParallaxWorks'

const Arrow = () => <span aria-hidden="true">↗</span>
function DominoLetters({text, start=0}) {
  let order = start
  return <span aria-hidden="true">{text.split(' ').map((word,index)=><React.Fragment key={index}>
    {index>0?' ':null}<span className={text.includes(' ')?'domino-word':undefined}>{Array.from(word, (letter,i)=><span className="domino-letter" key={i} style={{'--domino-order':order++}}>{letter}</span>)}</span>
  </React.Fragment>)}</span>
}
function App(){
  const [category,setCategory]=useState('全部作品'),[active,setActive]=useState(null),[playing,setPlaying]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches),[notice,setNotice]=useState('')
  const [videoStatus,setVideoStatus]=useState('')
  const dialogRef=useRef(null), returnFocus=useRef(null), contactDialog=useRef(null)
  const playerRef=useRef(null), previewTimer=useRef(null)
  useEffect(()=>{if(!active)return; const dialog=dialogRef.current; dialog.showModal(); return()=>{dialog.close(); returnFocus.current?.focus()}},[active])
  useEffect(()=>()=>clearTimeout(previewTimer.current),[])
  useEffect(()=>{if(!notice)return; const timer=setTimeout(()=>setNotice(''),3500);return()=>clearTimeout(timer)},[notice])
  async function contact(type){const value=profile[type]; if(!value){setNotice(`${type==='email'?'邮箱':type==='phone'?'电话':'微信号'}待补充，请在 src/content.js 中填写`);return}if(type==='email'){window.location.href=`mailto:${value}`;return}if(type==='phone'){window.location.href=`tel:${value}`;return}try{await navigator.clipboard.writeText(value);setNotice('微信号已复制')}catch{setNotice(`微信号：${value}`)}}
  function cancelPreview(){clearTimeout(previewTimer.current)}
  function previewProject(project,event){
    cancelPreview()
    const connection=navigator.connection
    if(active||event.pointerType!=='mouse'||connection?.saveData||connection?.effectiveType?.includes('2g'))return
    previewTimer.current=setTimeout(()=>{
      const player=playerRef.current
      if(player.getAttribute('src')!==project.video){
        player.preload='metadata'
        player.src=project.video
      }
    },240)
  }
  function startVideo(){
    const player=playerRef.current
    setVideoStatus('loading')
    player.play().catch(error=>{
      if(error.name==='NotAllowedError')setVideoStatus('')
      else if(error.name!=='AbortError')setVideoStatus('error')
    })
  }
  function openProject(project,event){
    cancelPreview()
    const player=playerRef.current
    returnFocus.current=event.currentTarget
    setActive(project)
    if(player.getAttribute('src')!==project.video)player.src=project.video
    else if(player.error)player.load()
    startVideo()
  }
  function closeProject(){
    const player=playerRef.current
    player.pause()
    player.removeAttribute('src')
    player.load()
    setVideoStatus('')
    setActive(null)
  }
  return <>
    <div className="site-backdrop" aria-hidden="true"><NeuralTunnel playing={playing&&!active}/></div>
    <header className="nav-wrap"><nav className="nav page-width" aria-label="主导航"><a className="wordmark" href="#home">DIRECTOR’S CUT<span>®</span></a><div className="nav-links"><a href="#about">关于我</a><a href="#projects">精选作品</a><a href="#strengths">我的优势</a></div><a className="button dark small" href="#contact">聊聊你的想法 <Arrow/></a></nav></header>
    <main>
      <section className="hero hero-glimmer" id="home"><GlimmerWrap/>
        <div className="hero-intro page-width"><div className="eyebrow"><span className="status-dot"/> INDEPENDENT VIDEO DIRECTOR · 短视频编导</div><h1 className="hero-domino" aria-label="让好故事，发生在镜头里。 Stories worth telling."><DominoLetters text="让好故事，"/><br/><span className="hero-title-indent"><DominoLetters text="发生在镜头里。" start={5}/></span><i><DominoLetters text="Stories worth telling." start={12}/></i></h1><div className="hero-bottom"><p>从一个灵感，到一次共鸣。<br/>用内容表达观点，用影像留下感受。</p><a href="#projects" className="text-link">探索我的作品 <span>↓</span></a></div><div className="round-stamp" aria-hidden="true">IDEA INTO STORY<br/><b>✳</b><br/>STORY INTO FRAME</div></div>
        <HeroWorkStrip items={projects} onOpen={openProject} onPreview={previewProject} onPreviewEnd={cancelPreview} videoOpen={!!active}/>
      </section>
      <section className="about section" id="about"><div className="page-width"><div className="section-top"><span className="eyebrow">01 / ABOUT ME</span><span className="micro">好内容，从认真观察开始。</span></div><div className="about-grid"><div className="portrait"><img src={profile.portrait} alt="边江个人照片" loading="lazy"/><div className="portrait-label">BEHIND<br/>THE STORIES.<span>边江 / 短视频编导 ↗</span></div></div><div className="about-copy"><span className="eyebrow">你好，我是 {profile.name}。</span><h2>既写故事，<br/>也让故事<span className="serif">发生。</span></h2><p>{profile.introduction}</p><div className="role-row"><span>✳ {profile.role}</span><span>策划 / 脚本 / 拍摄 / 剪辑</span></div><div className="stats">{profile.stats.map(s=><div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div><div className="experience-list">{profile.experience.map(item=><div className="experience-item" key={item.date}><span>{item.date}</span><h3>{item.title}</h3><p>{item.text}</p>{item.url&&<a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">查看抖音项目：{item.project} <Arrow/></a>}</div>)}</div><button onClick={()=>contact('email')} className="text-link contact-inline">{profile.email||'联系邮箱待补充'} <Arrow/></button></div></div></div></section>
      <section className="works section" id="projects"><div className="page-width"><div className="section-top"><span className="eyebrow">02 / SELECTED WORK</span><button type="button" className="works-motion" onClick={()=>setPlaying(value=>!value)}>{playing?"Ⅱ 暂停背景动画":"▶ 播放背景动画"}</button></div><TileReveal items={projects}/><div className="filters" aria-label="作品分类">{['全部作品',...new Set(projects.map(p=>p.category))].map(c=><button key={c} className={category===c?'selected':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}{c==='全部作品'&&<sup>{projects.length}</sup>}</button>)}</div><TileWorks items={projects.filter(p=>category==='全部作品'||p.category===category)} onOpen={openProject} onPreview={previewProject} onPreviewEnd={cancelPreview}/></div></section>
      <section className="strengths section page-width" id="strengths"><div className="section-top"><span className="eyebrow">03 / WHAT I BRING</span><span className="micro">从想法到成片，把每一环做好。</span></div><div className="section-heading"><h2>有想法，也有办法<span className="pink">.</span></h2><span className="large-star" aria-hidden="true">✳</span></div><div className="strengths-parallax"><ParallaxPanel label="个人优势视差卡片"><div className="strength-grid parallax-stage">{strengths.map((s,index)=><div className="parallax-item" key={s.n} style={{'--depth':[.4,1,.65][index],'--angle':`${[-1.8,1.5,-1][index]}deg`,'--offset':`${[4,25,10][index]}px`}}><article className={`strength strength-${s.n}`}><div className="strength-head"><span>{s.n} / {s.en}</span><Arrow/></div><div className="strength-symbol" aria-hidden="true">{s.n==='01'?'◎':s.n==='02'?'“':'✳'}</div><h3>{s.title}</h3><p>{s.text}</p><div className="strength-tags">{s.tags}</div></article></div>)}</div></ParallaxPanel></div><p className="outro-line">让内容有<span>方向</span>，让故事有<span>情绪</span>，让表达有<span>记忆点</span>。</p></section>
      <footer className="contact section" id="contact"><ContactFunnel/><div className="page-width"><div className="section-top"><a className="wordmark" href="#home">DIRECTOR’S CUT<span>®</span></a><span className="availability"><span className="status-dot"/> OPEN TO COLLABORATION</span></div><div className="thanks"><span className="eyebrow">下一个故事，和你一起。</span><h2>Let’s talk<span className="pink">.</span><i>Thanks for watching.</i></h2><span className="pink-strip">感谢观看，期待与你共创。</span><p>有一个想法？让我们把它变成下一支好作品。</p><button className="button dark" aria-haspopup="dialog" onClick={()=>contactDialog.current.showModal()}>开启一次合作 <Arrow/></button></div><div className="contact-details"><button onClick={()=>contact('phone')}><span>PHONE / 电话</span><strong>{profile.phone||'待补充'}</strong></button><button onClick={()=>contact('email')}><span>EMAIL / 邮箱</span><strong>{profile.email||'待补充'}</strong></button><button onClick={()=>contact(profile.wechat?'wechat':'email')}><span>{profile.wechat?'WECHAT / 微信':'CONTACT / 合作沟通'}</span><strong>{profile.wechat||'通过邮件联系'} <Arrow/></strong></button><a className="back-top" href="#home" aria-label="返回顶部">↑</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name} · 短视频编导</span><span>MADE WITH INTENTION. / 用心构思，认真表达。</span></div></div></footer>
    </main>
    <dialog ref={contactDialog} className="project-dialog contact-card" aria-labelledby="contact-card-title" onClick={event=>{if(event.target===event.currentTarget)contactDialog.current.close()}}>
      <div className="dialog-head"><h2 id="contact-card-title">联系边江</h2><button type="button" onClick={()=>contactDialog.current.close()} aria-label="关闭联系卡">✕</button></div>
      <div className="contact-card-body">
        <p>打开微信扫一扫，添加我聊聊合作。</p>
        <img className="contact-card-qr" src="./media/wechat-contact.jpg" alt="边江的微信二维码" loading="lazy"/>
        <div className="contact-card-links"><a href={`mailto:${profile.email}`}>发邮件 ↗</a><a href={`tel:${profile.phone}`}>打电话 ↗</a></div>
      </div>
    </dialog>
    {notice&&<div className="toast" role="status">{notice}</div>}
    <dialog ref={dialogRef} className="project-dialog" aria-label={active?.title} onCancel={event=>{event.preventDefault();closeProject()}} onClick={event=>{if(event.target===event.currentTarget)closeProject()}}>
      {active&&<div className="dialog-head"><span>{active.category} / {active.duration}</span><button onClick={closeProject} aria-label="关闭视频">✕</button></div>}
      <div className="project-player">
        <video ref={playerRef} controls playsInline preload="metadata" poster={active?.image}
          onWaiting={()=>{if(active)setVideoStatus('loading')}} onPlaying={()=>setVideoStatus('')}
          onPause={()=>{if(active&&!playerRef.current.error)setVideoStatus('')}} onError={()=>{if(active)setVideoStatus('error')}}/>
        {active&&videoStatus==='loading'&&<span className="video-status" role="status">正在加载视频…</span>}
        {active&&videoStatus==='error'&&<div className="video-status video-error"><span>视频暂时无法加载</span><button onClick={()=>{playerRef.current.load();startVideo()}}>重试</button></div>}
      </div>
      {active&&<div className="dialog-copy"><h2>{active.title}</h2><p>{active.description}</p><small>{active.roles}</small></div>}
    </dialog>
  </>
}
createRoot(document.getElementById('root')).render(<App/>);
