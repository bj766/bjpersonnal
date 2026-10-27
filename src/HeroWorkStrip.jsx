import React, {useRef} from 'react'

export default function HeroWorkStrip({items, onOpen}) {
  const trackRef = useRef(null), drag = useRef(null)
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
    const track = trackRef.current
    track.scrollBy({left:direction*track.clientWidth*.75, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})
  }
  return <div className="hero-reel page-width" role="region" aria-label="首屏作品轮播">
    <div className="hero-reel-label"><span>THE WORK / {String(items.length).padStart(2,'0')}</span><strong>故事，向右展开。</strong><small>拖动浏览 · 点击播放</small></div>
    <div className="hero-reel-track" ref={trackRef}
      onPointerDown={event=>{drag.current=event.pointerType==='mouse'&&event.button===0?{x:event.clientX,scroll:event.currentTarget.scrollLeft,moved:false}:null}}
      onPointerMove={move}
      onPointerUp={()=>{if(drag.current) drag.current.ended=true}}
      onPointerCancel={()=>{drag.current=null}}
      onClickCapture={event=>{if(drag.current?.moved){event.preventDefault();event.stopPropagation();drag.current=null}}}>
      {items.map(project=><button className="hero-reel-card" key={project.id} onClick={event=>onOpen(project,event)} aria-label={`播放作品：${project.title}`}>
        <img src={project.image} alt="" draggable="false"/>
        <span className="hero-reel-number">{project.id} / {project.category}</span><span className="hero-reel-play" aria-hidden="true">↗</span>
        <span className="hero-reel-title">{project.english}<small>{project.title}</small></span><span className="hero-reel-duration">{project.duration}</span>
      </button>)}
    </div>
    <div className="hero-reel-controls"><button onClick={()=>step(-1)} aria-label="上一组作品">←</button><button onClick={()=>step(1)} aria-label="下一组作品">→</button></div>
  </div>
}
