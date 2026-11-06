import React, {useEffect, useRef} from 'react'

export function ParallaxPanel({children, label}) {
  function move(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--scene-x', `${((event.clientX-bounds.left)/bounds.width-.5)*38}px`)
    event.currentTarget.style.setProperty('--scene-y', `${((event.clientY-bounds.top)/bounds.height-.5)*28}px`)
  }
  function reset(event) {
    event.currentTarget.style.setProperty('--scene-x', '0px')
    event.currentTarget.style.setProperty('--scene-y', '0px')
  }

  return <div className="parallax-gallery" onPointerMove={move} onPointerLeave={reset} role="group" aria-label={label}>{children}</div>
}

export function TileReveal({items}) {
  const scene = useRef(null), stage = useRef(null), tiles = useRef(null)
  useEffect(()=>{
    let frame = 0
    const clamp = value=>Math.max(0,Math.min(1,value))
    const smooth = value=>value*value*(3-2*value)
    function draw() {
      frame = 0
      const bounds = scene.current.getBoundingClientRect()
      const height = stage.current.offsetHeight
      const p = clamp((innerHeight*.68-bounds.top)/(bounds.height-height+innerHeight*.6))
      Array.from(tiles.current.children).forEach((tile,i)=>{
        const col = i%3, row = Math.floor(i/3)
        const enter = smooth(clamp((p-i*.018)/.38))
        const exit = smooth(clamp((p-.49-i*.009)/.39))
        const x = (col-1)*exit*145
        const y = (col%2===0?-1:1)*(1-enter)*200+(row-1)*exit*165
        tile.style.transform = `translate(${x}%,${y}%) scale(${.86+enter*.14+exit*.42})`
        tile.style.opacity = enter*(1-exit)
      })
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(draw) }
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    function configure() {
      window.removeEventListener('scroll',schedule)
      window.removeEventListener('resize',schedule)
      if (motion.matches) { cancelAnimationFrame(frame); frame=0; return }
      schedule()
      window.addEventListener('scroll',schedule,{passive:true})
      window.addEventListener('resize',schedule)
    }
    configure()
    motion.addEventListener('change',configure)
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);motion.removeEventListener('change',configure)}
  },[])
  return <div className="tile-reveal" ref={scene}>
    <div className="tile-reveal-stage" ref={stage}>
      <div className="tile-reveal-images" ref={tiles} aria-hidden="true">
        {items.slice(0,9).map(project=><img key={project.id} src={project.image} alt="" loading="lazy"/>) }
      </div>
      <div className="tile-reveal-title"><span className="eyebrow">SELECTED FILMS / {String(items.length).padStart(2,'0')}</span><h2>作品，比介绍更直接<span className="pink">.</span></h2></div>
    </div>
  </div>
}

export function TileWorks({items, onOpen}) {
  return <div className="parallax-works">
    <div className="parallax-heading"><span>IN FOCUS / {String(items.length).padStart(2,'0')} FILMS</span><span>点击播放作品 ↗</span></div>
      <div className="tile-work-grid">
        {items.map(project=><div key={project.id}>
          <button className="parallax-card" aria-label={`播放作品：${project.title}`} onClick={event=>onOpen(project,event)}>
            <img src={project.image} alt="" loading="lazy" draggable="false"/>
            <span className="parallax-shade"/>
            <span className="parallax-meta"><span>{project.id} / {project.category}</span><span>{project.duration}</span></span>
            <span className="parallax-play" aria-hidden="true">▶</span>
            <span className="parallax-caption"><span>{project.english}</span><strong>{project.title}</strong><small>观看完整作品 <span aria-hidden="true">↗</span></small></span>
          </button>
          <p className="parallax-role">{project.roles}</p>
        </div>)}
      </div>
    <div className="parallax-footnote"><span>每一帧，都是一次表达。</span><span>SELECT A FRAME. DISCOVER A STORY.</span></div>
  </div>
}
