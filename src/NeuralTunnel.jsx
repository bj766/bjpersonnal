import React, {useEffect, useRef} from 'react'

// Original perspective filament animation, rendered with the browser's Canvas API.
export default function NeuralTunnel({playing}) {
  const canvasRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const panel = canvas.parentElement
    let width = 0, height = 0, frame = 0, last = 0, visible = true
    let pointerX = 0, pointerY = 0, shiftX = 0, shiftY = 0
    const colors = ['#ed7da6', '#b2a2df', '#b7ccae']

    function project(strand, depth, time) {
      const angle = strand / 42 * Math.PI * 2 + depth * .34 + time * .08
      const ripple = Math.sin(depth * 3.2 - time * .8 + strand * .67)
      const radius = (.8 + ripple * .09 + Math.cos(depth * 5 + strand) * .035)
        * Math.min(width, height * 1.8) * .72 / (depth + .18)
      return [
        width * .56 + shiftX + Math.cos(angle) * radius,
        height * .46 + shiftY + Math.sin(angle) * radius * .73,
      ]
    }

    function draw() {
      const time = timeRef.current
      shiftX += (pointerX - shiftX) * .045
      shiftY += (pointerY - shiftY) * .045
      context.globalCompositeOperation = 'source-over'
      context.globalAlpha = 1
      context.fillStyle = '#101612'
      context.fillRect(0, 0, width, height)
      const glow = context.createRadialGradient(width * .56, height * .46, 0, width * .56, height * .46, width * .6)
      glow.addColorStop(0, '#42303f')
      glow.addColorStop(.4, '#21251f')
      glow.addColorStop(1, '#101612')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'screen'
      for (let strand = 0; strand < 42; strand++) {
        context.beginPath()
        for (let step = 0; step <= 96; step++) {
          const point = project(strand, .12 + step / 96 * 6.5, time)
          if (step === 0) context.moveTo(...point)
          else context.lineTo(...point)
        }
        context.strokeStyle = colors[strand % colors.length]
        context.lineWidth = strand % 4 === 0 ? 1.5 : .65
        context.globalAlpha = .24 + Math.sin(time * .7 + strand * .8) * .12
        context.stroke()

        // A luminous signal travels from the vanishing point towards the viewer.
        const depth = .2 + ((strand * .173 - time * .22) % 1 + 1) % 1 * 5.8
        const point = project(strand, depth, time)
        context.beginPath()
        context.arc(...point, Math.max(.8, 2.4 / (depth + .5)), 0, Math.PI * 2)
        context.fillStyle = colors[strand % colors.length]
        context.globalAlpha = .8
        context.fill()
        for (let link = 0; link < 5; link++) {
          const z = .6 + link * 1.1 + Math.sin(strand * 3) * .16
          const start = project(strand, z, time)
          const end = project(strand + 1, z + .12, time)
          context.beginPath()
          context.moveTo(...start)
          context.lineTo(...end)
          context.strokeStyle = colors[strand % colors.length]
          context.lineWidth = .5
          context.globalAlpha = .13
          context.stroke()
        }
      }
      context.globalAlpha = 1
    }

    function resume() {
      if (playing && visible && !document.hidden && !frame) frame = requestAnimationFrame(tick)
    }
    function tick(now) {
      frame = 0
      if (!playing || !visible || document.hidden) { last = 0; return }
      if (now - last >= 1000 / 30) {
        timeRef.current += last ? Math.min((now - last) / 1000, .05) : 0
        last = now
        draw()
      }
      resume()
    }
    function resize() {
      const bounds = panel.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw()
    }
    function move(event) {
      const bounds = panel.getBoundingClientRect()
      pointerX = ((event.clientX - bounds.left) / width - .5) * 45
      pointerY = ((event.clientY - bounds.top) / height - .5) * 35
    }
    function leave() { pointerX = 0; pointerY = 0 }
    function visibilityChange() { last = 0; resume() }
    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      last = 0
      resume()
    })
    resizeObserver.observe(panel)
    intersectionObserver.observe(panel)
    panel.addEventListener('pointermove', move)
    panel.addEventListener('pointerleave', leave)
    document.addEventListener('visibilitychange', visibilityChange)
    resize()
    resume()
    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      panel.removeEventListener('pointermove', move)
      panel.removeEventListener('pointerleave', leave)
      document.removeEventListener('visibilitychange', visibilityChange)
    }
  }, [playing])

  return <canvas ref={canvasRef} className="neural-tunnel" aria-hidden="true" />
}
