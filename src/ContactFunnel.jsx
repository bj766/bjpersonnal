import React, {useEffect, useRef} from 'react'

export default function ContactFunnel() {
  const ref = useRef(null)
  useEffect(()=>{
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const turn = Math.PI*2
    let width = 1, height = 1, spread = 1, frame = 0, visible = false, last = 0, time = 0
    let ink

    function point(i, u) {
      const rise = Math.max(0,(u-.32)/.68)
      const ground = Math.max(0,1-u/.32)
      const angle = i*turn/48+u*turn*1.5-time*.32
      const radius = spread*(.09+.91*ground**1.25+.74*rise**1.65)
      return [width*.53+rise*width*.06+Math.cos(angle)*radius,
        height*(.77-.74*rise)+Math.sin(angle)*radius*(.13+.07*rise)]
    }
    function draw() {
      ctx.clearRect(0,0,width,height)
      ctx.strokeStyle = ink
      ctx.lineWidth = .85
      for(let i=0;i<48;i++) {
        ctx.beginPath()
        for(let n=0;n<=84;n++) {
          const [x,y] = point(i,n/84)
          if(n===0) ctx.moveTo(x,y)
          else ctx.lineTo(x,y)
        }
        ctx.globalAlpha = .42+.18*Math.sin(i*2.4+time*.6)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      ctx.fillStyle = ink
      for(let i=0;i<144;i++) {
        const u = (i*.61803398875+time*(.045+(i%5)*.008))%1
        const [x,y] = point(i%48,u)
        ctx.beginPath()
        ctx.arc(x,y,i%7===0?1.65:.9,0,turn)
        ctx.fill()
      }
    }
    function sync() {
      cancelAnimationFrame(frame)
      last = 0
      if (visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick)
    }
    function tick(now) {
      if (!last || now-last>=32) {
        time += last?Math.min((now-last)/1000,.06):0
        last = now
        draw()
      }
      frame = requestAnimationFrame(tick)
    }
    function resize() {
      width = Math.max(1,canvas.clientWidth)
      height = Math.max(1,canvas.clientHeight)
      spread = Math.min(width*.52,height*.86)
      const ratio = Math.min(devicePixelRatio||1,1.5)
      canvas.width = Math.round(width*ratio)
      canvas.height = Math.round(height*ratio)
      ctx.setTransform(ratio,0,0,ratio,0,0)
      ink = ctx.createLinearGradient(0,0,0,height)
      ink.addColorStop(0,'#ae518000')
      ink.addColorStop(.2,'#ae518072')
      ink.addColorStop(.53,'#9977ad80')
      ink.addColorStop(.79,'#735ba98a')
      ink.addColorStop(1,'#735ba900')
      draw()
    }
    const size = new ResizeObserver(resize)
    const view = new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()})
    size.observe(canvas)
    view.observe(canvas)
    reduced.addEventListener('change',sync)
    document.addEventListener('visibilitychange',sync)
    resize()
    return()=>{
      cancelAnimationFrame(frame)
      size.disconnect()
      view.disconnect()
      reduced.removeEventListener('change',sync)
      document.removeEventListener('visibilitychange',sync)
    }
  },[])
  return <canvas className="contact-funnel" ref={ref} aria-hidden="true"/>
}
