import React, {useEffect, useRef, useState} from 'react'

export default function HeroWorkStrip({items, onOpen, videoOpen}) {
  const trackRef = useRef(null), drag = useRef(null)
  const interaction = useRef({hover:false, focus:false, resumeAt:0})
  const [paused,setPaused] = useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(()=>{
    if (paused || videoOpen) return
    let frame, previous = 0, remainder = 0
    function tick(time) {
      const track = trackRef.current, state = interaction.current
      const elapsed = previous ? Math.min(time-previous,50) : 0
      previous = time
      if (!document.hidden && !state.hover && !state.focus && time>state.resumeAt) {
        const first = track.children[0], repeat = track.children[items.length]
        if (first && repeat) {
          const width = repeat.getBoundingClientRect().left-first.getBoundingClientRect().left
          remainder += elapsed*.035
          const distance = Math.floor(remainder)
          remainder -= distance
          if (width>0) track.scrollLeft = (track.scrollLeft+distance)%width
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return()=>cancelAnimationFrame(frame)
  },[paused,videoOpen,items.length])
  function rest() { interaction.current.resumeAt = performance.now()+3000 }
  function move(event) {
    const state = drag.current
    if (!state || state.ended) return
    const distance = event.clientX-state.x
    if (!state.moved && Math.abs(distance)>7) {
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    if (state.moved) event.currentTarget.scrollLeft = state.scroll-distance
  }
  function step(direction) {
    rest()
    const track = trackRef.current
    track.scrollBy({left:direction*track.clientWidth*.75, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  }
  return <div className="hero-reel page-width" role="region" aria-label="首屏作品轮播"
    onMouseEnter={()=>{interaction.current.hover=true}}
    onMouseLeave={()=>{interaction.current.hover=false}}
    onFocusCapture={()=>{interaction.current.focus=true}}
    onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget)) interaction.current.focus=false}}>
    <div className="hero-reel-label"><span>THE WORK / {String(items.length).padStart(2,'0')}</span><strong>故事，向右展开。</strong><small>拖动浏览 · 点击播放</small></div>
    <div className="hero-reel-track" ref={trackRef}
      onPointerDown={event=>{rest();drag.current=event.pointerType==='mouse'&&event.button===0?{x:event.clientX,scroll:event.currentTarget.scrollLeft,moved:false}:null}}
      onWheel={rest} onTouchMove={rest}
      onPointerMove={move}
      onPointerUp={()=>{if(drag.current) drag.current.ended=true}}
      onPointerCancel={()=>{drag.current=null}}
      onClickCapture={event=>{if(drag.current?.moved){event.preventDefault();event.stopPropagation();drag.current=null}}}>
      {[...items,...items].map((project,index)=><button className="hero-reel-card" key={`${index}-${project.id}`} tabIndex={index>=items.length?-1:0} aria-hidden={index>=items.length?true:undefined} onClick={event=>onOpen(project,event)} aria-label={`播放作品：${project.title}`}>
        <img src={project.image} alt="" draggable="false"/>
        <span className="hero-reel-number">{project.id} / {project.category}</span><span className="hero-reel-play" aria-hidden="true">↗</span>
        <span className="hero-reel-title">{project.english}<small>{project.title}</small></span><span className="hero-reel-duration">{project.duration}</span>
      </button>)}
    </div>
    <div className="hero-reel-controls"><button onClick={()=>setPaused(value=>!value)} aria-label={paused?'开启作品自动滚动':'暂停作品自动滚动'} aria-pressed={!paused}>{paused?'▶':'Ⅱ'}</button><button onClick={()=>step(-1)} aria-label="上一组作品">←</button><button onClick={()=>step(1)} aria-label="下一组作品">→</button></div>
  </div>
}
