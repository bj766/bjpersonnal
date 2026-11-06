import React from 'react'

const inks = ['#dfc9ff','#efa8c4','#c6d7bd']
const layers = Array.from({length:4},(_,layer)=>Array.from({length:58},(_,i)=>{
  const n = layer*58+i+1
  const angle = n*2.399963
  const depth = .18+Math.sqrt((n*.618034)%1)*.96
  return {x:600+Math.cos(angle)*depth*650,y:400+Math.sin(angle)*depth*460,
    size:.6+(n*.31%1)*1.4,color:inks[n%inks.length],flash:i%8===0}
}))

export default function GlimmerWrap(){
  return <svg className="glimmer-wrap" aria-hidden="true" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
    {layers.map((layer,index)=><g className="glimmer-layer" key={index} style={{animationDelay:`${index*-3.5}s`}}>
      {layer.map(({x,y,size,color,flash},i)=>flash
        ? <path className="glimmer-flash" key={i} d={`M${x-size*2.6},${y}h${size*5.2}M${x},${y-size*2.6}v${size*5.2}`} stroke={color} strokeWidth=".9" style={{animationDelay:`${(i+index)*-.17}s`}}/>
        : <circle key={i} cx={x} cy={y} r={size} fill={color} opacity=".5"/>)}
    </g>)}
  </svg>
}
