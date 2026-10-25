import React, {useRef, useState} from 'react'

export default function WorkReel({items, onOpen}) {
  const [selected, setSelected] = useState(0)
  const trackRef = useRef(null)
  const buttons = useRef([])
  const gesture = useRef(null)
  const ignoreClick = useRef(false)
  const current = items[selected]

  function choose(index, focus = false) {
    const next = Math.max(0, Math.min(items.length - 1, index))
    setSelected(next)
    if (focus) buttons.current[next]?.focus({preventScroll:true})
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    buttons.current[next]?.scrollIntoView({block:'nearest', inline:'center', behavior:reducedMotion?'auto':'smooth'})
  }
  function keyDown(event, index) {
    const keys = {ArrowRight:index + 1, ArrowLeft:index - 1, Home:0, End:items.length - 1}
    if (!(event.key in keys)) return
    event.preventDefault()
    choose(keys[event.key], true)
  }
  function pointerDown(event) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    ignoreClick.current = false
    gesture.current = {x:event.clientX, scroll:trackRef.current.scrollLeft, moved:false}
  }
  function pointerMove(event) {
    const drag = gesture.current
    if (!drag) return
    const distance = event.clientX - drag.x
    if (Math.abs(distance) > 7) {
      drag.moved = true
      trackRef.current.setPointerCapture(event.pointerId)
      trackRef.current.scrollLeft = drag.scroll - distance
    }
  }
  function pointerUp() {
    ignoreClick.current = Boolean(gesture.current?.moved)
    gesture.current = null
  }

  return <div className="work-reel">
    <div className="reel-heading"><span>THE EDIT / 作品胶片</span><span>悬停展开 · 点击播放 <span aria-hidden="true">↔</span></span></div>
    <div className="reel-track" ref={trackRef} role="group" aria-label="作品封面胶片，可左右滑动"
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp}
      onPointerCancel={()=>{gesture.current=null}}
      onClickCapture={event=>{if(ignoreClick.current){event.preventDefault();event.stopPropagation();ignoreClick.current=false}}}>
      <div className="reel-dock">
        {items.map((project,index)=><button key={project.id} ref={element=>{buttons.current[index]=element}}
          className={`reel-slice ${index===selected?'is-current':''} ${Math.abs(index-selected)===1?'is-neighbor':''}`}
          aria-label={`播放作品：${project.title}`} aria-pressed={index===selected}
          onMouseEnter={()=>{if(!gesture.current)setSelected(index)}} onFocus={()=>setSelected(index)}
          onKeyDown={event=>keyDown(event,index)} onClick={event=>onOpen(project,event)}>
          <img src={project.image} alt="" loading="lazy" draggable="false"/>
          <span className="reel-tint"/>
          <span className="reel-number">{project.id}</span>
          <span className="reel-category">{project.category}</span>
          <span className="reel-play" aria-hidden="true">▶</span>
          <span className="reel-caption"><span>{project.english}</span><small>{project.duration} / {project.category}</small></span>
        </button>)}
      </div>
    </div>
    <div className="reel-details">
      <div className="reel-description" aria-live="polite"><span className="eyebrow">{current.category} / {current.duration}</span><h3>{current.title}</h3><p>{current.description}</p><small>{current.roles}</small></div>
      <div className="reel-actions"><span className="reel-count">{String(selected+1).padStart(2,'0')} <span>/ {String(items.length).padStart(2,'0')}</span></span><div className="reel-arrows"><button aria-label="上一支作品" disabled={selected===0} onClick={()=>choose(selected-1)}>←</button><button aria-label="下一支作品" disabled={selected===items.length-1} onClick={()=>choose(selected+1)}>→</button></div><button className="button dark" onClick={event=>onOpen(current,event)}>播放完整作品 <span aria-hidden="true">↗</span></button></div>
    </div>
  </div>
}
