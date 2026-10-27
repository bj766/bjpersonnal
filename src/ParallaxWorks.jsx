import React from 'react'

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

export default function ParallaxWorks({items, onOpen}) {
  return <div className="parallax-works">
    <div className="parallax-heading"><span>IN FOCUS / {String(items.length).padStart(2,'0')} FILMS</span><span><span className="pointer-hint">移动光标，探索层次 · </span>点击播放作品 ↗</span></div>
    <ParallaxPanel label="视差作品卡片">
      <div className="parallax-stage">
        {items.map((project,index)=><div className="parallax-item" key={project.id} style={{'--depth':[.35,.8,.5,1][index%4],'--angle':`${[-1.8,1.4,-.8,1.8][index%4]}deg`,'--offset':`${[4,26,12,34][index%4]}px`}}>
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
    </ParallaxPanel>
    <div className="parallax-footnote"><span>每一帧，都是一次表达。</span><span>SELECT A FRAME. DISCOVER A STORY.</span></div>
  </div>
}
