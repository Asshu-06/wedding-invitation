import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE_OUT  = [0.16, 1, 0.3, 1]
const EASE_BACK = [0.34, 1.56, 0.64, 1]

// Gold dust
const DUST = Array.from({ length: 28 }, (_, i) => ({
  id: i, x: Math.random() * 100, y: 10 + Math.random() * 80,
  size: 1.5 + Math.random() * 2.5, dur: 5 + Math.random() * 6,
  delay: Math.random() * 5, drift: (Math.random() - 0.5) * 70,
}))
function GoldDust() {
  return DUST.map(d => (
    <motion.div key={d.id} style={{
      position:'absolute', left:`${d.x}%`, top:`${d.y}%`,
      width:d.size, height:d.size, borderRadius:'50%',
      background:'radial-gradient(circle,#f5d060,#d4af37)',
      pointerEvents:'none', zIndex:1,
    }}
      animate={{ y:[0,-45,0], opacity:[0,0.75,0], x:[0,d.drift,0] }}
      transition={{ duration:d.dur, delay:d.delay, repeat:Infinity, ease:'easeInOut' }}
    />
  ))
}

// Petals
const PC = ['#ff8c00','#ffd700','#ff6b8a','#ffb347','#fff0c0','#d4af37','#ff4500']
const PETALS = Array.from({ length: 50 }, (_, i) => ({
  id:i, x:Math.random()*100, delay:Math.random()*3,
  dur:3+Math.random()*3, size:8+Math.random()*9,
  color:PC[i%PC.length], drift:(Math.random()-0.5)*90, rot:Math.random()*360,
}))
function Petals() {
  return PETALS.map(p => (
    <motion.div key={p.id} style={{
      position:'absolute', top:-20, left:`${p.x}%`,
      width:p.size, height:p.size*1.4,
      borderRadius:'50% 0 50% 0', background:p.color,
      pointerEvents:'none', zIndex:20,
    }}
      initial={{ y:-30, opacity:0, rotate:p.rot, x:0 }}
      animate={{ y:'115vh', opacity:[0,0.95,0.95,0], rotate:p.rot+600, x:[0,p.drift,-p.drift*0.4,0] }}
      transition={{ duration:p.dur, delay:p.delay, ease:'linear', repeat:Infinity }}
    />
  ))
}

// Music bars — standalone, no overlap with arch
function MusicBars() {
  const h = [0.4,0.7,1,0.8,0.6,1,0.9,0.5,0.8,1,0.7,0.4,0.9,0.6,1]
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:'2px', height:'20px' }}>
      {h.map((v,i) => (
        <motion.div key={i} style={{
          width:'2.5px', borderRadius:'2px',
          background:'linear-gradient(to top,#b8860b,#f5d060)',
          height:`${v*18}px`,
        }}
          animate={{ scaleY:[v*0.3,v,v*0.5,v*0.9,v*0.3] }}
          transition={{ duration:0.55, repeat:Infinity, delay:i*0.045, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
}

// Arch — perfectly centred, spans full width of its container
function Arch() {
  return (
    <svg viewBox="0 0 400 110" style={{ width:'100%', height:'auto', display:'block', overflow:'visible' }} fill="none">
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d060"/><stop offset="100%" stopColor="#8b6914"/>
        </linearGradient>
      </defs>
      {/* Main arch — starts and ends at exact edges */}
      <path d="M4 106 L4 64 Q200 -10 396 64 L396 106" stroke="url(#ag)" strokeWidth="2.5" fill="none"/>
      <path d="M18 106 L18 72 Q200 8 382 72 L382 106" stroke="#d4af37" strokeWidth="1" fill="none" opacity="0.35"/>
      {/* Kalash — exactly at centre top */}
      <ellipse cx="200" cy="14" rx="15" ry="10" fill="url(#ag)"/>
      <ellipse cx="200" cy="5" rx="10" ry="8" fill="url(#ag)"/>
      <circle cx="200" cy="0" r="5.5" fill="#f5d060"/>
      {/* Marigold garland — evenly spaced across full width */}
      {Array.from({length:17},(_,i)=>{
        const t=i/16, x=4+t*392, y=64-Math.sin(t*Math.PI)*68
        return <circle key={i} cx={x} cy={y} r="5" fill={i%2===0?'#ff8c00':'#ffd700'} opacity="0.9"/>
      })}
      {Array.from({length:17},(_,i)=>{
        const t=i/16, x=4+t*392, y=69-Math.sin(t*Math.PI)*68
        return <circle key={i+17} cx={x} cy={y} r="3" fill={i%2===0?'#ffd700':'#ff8c00'} opacity="0.65"/>
      })}
      {/* Side lamps */}
      <motion.g animate={{opacity:[0.5,1,0.5]}} transition={{duration:0.9,repeat:Infinity}}>
        <ellipse cx="16" cy="96" rx="6" ry="9" fill="#ff8c00" opacity="0.85"/>
        <ellipse cx="16" cy="91" rx="4" ry="6" fill="#ffd700"/>
        <ellipse cx="384" cy="96" rx="6" ry="9" fill="#ff8c00" opacity="0.85"/>
        <ellipse cx="384" cy="91" rx="4" ry="6" fill="#ffd700"/>
      </motion.g>
    </svg>
  )
}

// Kolam strip
function Kolam() {
  return (
    <svg viewBox="0 0 320 28" style={{ width:'100%', maxWidth:'400px', height:'24px', display:'block' }} fill="none">
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const r=(a*Math.PI)/180
        return <ellipse key={i} cx={160+Math.cos(r)*13} cy={14+Math.sin(r)*8}
          rx="5.5" ry="3" fill="#d4af37" opacity="0.6"
          transform={`rotate(${a},${160+Math.cos(r)*13},${14+Math.sin(r)*8})`}/>
      })}
      <circle cx="160" cy="14" r="5.5" fill="#d4af37" opacity="0.85"/>
      <circle cx="160" cy="14" r="2.5" fill="#f5d060"/>
      {[18,48,78,108,212,242,272,302].map((x,i)=>(
        <g key={i}>
          <circle cx={x} cy="14" r="2.2" fill="#d4af37" opacity="0.5"/>
          <circle cx={x} cy="7" r="1.3" fill="#d4af37" opacity="0.3"/>
          <circle cx={x} cy="21" r="1.3" fill="#d4af37" opacity="0.3"/>
        </g>
      ))}
      <path d="M18 14 Q89 4 160 14 Q231 24 302 14" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.3"/>
      <path d="M18 14 Q89 24 160 14 Q231 4 302 14" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.3"/>
    </svg>
  )
}

// Heart burst
function HeartBurst() {
  return (
    <div style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center', width:60, height:60 }}>
      <motion.div style={{
        position:'absolute', width:70, height:70, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(212,175,55,0.45),transparent)',
      }}
        animate={{ scale:[1,2,1], opacity:[0.8,0,0.8] }}
        transition={{ duration:1.4, repeat:Infinity }}
      />
      {[0,60,120,180,240,300].map((angle,i)=>{
        const r=(angle*Math.PI)/180
        return (
          <motion.div key={i} style={{ position:'absolute', width:4, height:4, borderRadius:'50%', background:'#f5d060' }}
            animate={{ x:[0,Math.cos(r)*32,Math.cos(r)*48], y:[0,Math.sin(r)*32,Math.sin(r)*48], opacity:[1,0.5,0], scale:[1,0.7,0] }}
            transition={{ duration:1.1, repeat:Infinity, delay:i*0.06 }}
          />
        )
      })}
      <motion.svg viewBox="0 0 40 36" width="40" height="40" fill="#d4af37"
        animate={{ scale:[1,1.25,1] }} transition={{ duration:0.85, repeat:Infinity, ease:'easeInOut' }}>
        <path d="M20 34C20 34 2 22 2 11C2 5.5 6.5 2 11 2C14.5 2 17.5 4 20 7C22.5 4 25.5 2 29 2C33.5 2 38 5.5 38 11C38 22 20 34 20 34Z"/>
      </motion.svg>
    </div>
  )
}

// Photo frame — fixed size, no overflow, no bob/dance
function PhotoFrame({ src, name, side, phase }) {
  const isGroom = side === 'left'
  const isWalking = phase === 'walk'
  const frameSize = 'clamp(110px, 22vw, 150px)'

  return (
    <motion.div
      style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}
      // Slide in from off-screen edge, then stay put — NO continuous animation
      initial={{ x: isGroom ? '-100vw' : '100vw', opacity:0 }}
      animate={{ x:0, opacity:1 }}
      transition={{ duration:1.4, ease:EASE_OUT, delay: isGroom ? 0 : 0.12 }}    >
      {/* Frame wrapper — padding ensures ring is never clipped */}
      <div style={{ padding:'12px', position:'relative' }}>

        {/* Animated glow behind frame */}
        <motion.div style={{
          position:'absolute', inset:0, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(212,175,55,0.3),transparent)',
          zIndex:0,
        }}
          animate={{ opacity:[0.4,0.9,0.4], scale:[0.95,1.05,0.95] }}
          transition={{ duration:2.2, repeat:Infinity, ease:'easeInOut' }}
        />

        {/* Dashed decorative ring — sized to frame, padding keeps it visible */}
        <svg style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', width:'100%', height:'100%' }}
          viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="47" stroke="#d4af37" strokeWidth="1.5"
            strokeDasharray="7 4" fill="none" opacity="0.75"/>
          <circle cx="50" cy="50" r="42" stroke="#d4af37" strokeWidth="0.7"
            fill="none" opacity="0.3"/>
          {[0,90,180,270].map((a,i)=>{
            const r=(a*Math.PI)/180
            return <circle key={i} cx={50+Math.cos(r)*47} cy={50+Math.sin(r)*47}
              r="3.5" fill="#d4af37" opacity="0.9"/>
          })}
        </svg>

        {/* Photo circle */}
        <div style={{
          width:frameSize, height:frameSize,
          borderRadius:'50%', overflow:'hidden',
          border:'3px solid #d4af37',
          boxShadow:'0 0 20px rgba(212,175,55,0.45), 0 6px 24px rgba(0,0,0,0.55)',
          position:'relative', zIndex:2,
          background:'#1a0510',
          flexShrink:0,
        }}>
          <img src={src} alt={name} style={{
            width:'100%', height:'100%',
            objectFit:'cover', objectPosition:'top center',
            display:'block',
          }}/>
        </div>

        {/* Walking feet dots — only during walk, no body bob */}
        {isWalking && (
          <div style={{ position:'absolute', bottom:2, left:'50%', transform:'translateX(-50%)', display:'flex', gap:'5px', zIndex:3 }}>
            {[0,1].map(i=>(
              <motion.div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'#d4af37', opacity:0.7 }}
                animate={{ y:[0,-5,0] }}
                transition={{ duration:0.5, repeat:Infinity, delay:i*0.25, ease:'easeInOut' }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Name pill */}
      <motion.div style={{
        background:'linear-gradient(135deg,rgba(212,175,55,0.2),rgba(212,175,55,0.07))',
        border:'1px solid rgba(212,175,55,0.55)',
        borderRadius:'999px', padding:'5px 18px',
        backdropFilter:'blur(8px)',
      }}
        initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
        transition={{ delay:0.7, duration:0.5 }}>
        <span style={{
          color:'#f5e6d0', fontFamily:'Cormorant Garamond,serif',
          fontSize:'clamp(12px,2.8vw,16px)', fontStyle:'italic', letterSpacing:'0.04em',
          whiteSpace:'nowrap',
        }}>
          {name}
        </span>
      </motion.div>
    </motion.div>
  )
}

// Curtain scene
function CurtainScene({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="curtain"
          style={{ position:'absolute', inset:0, zIndex:10, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}
          initial={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.8 }}>
          {/* Left curtain */}
          <motion.div style={{
            position:'absolute', top:0, left:0, width:'50%', height:'100%',
            background:'linear-gradient(to right,#3d0a1e,#8b1a2f 70%,#a02040)',
            transformOrigin:'left center', zIndex:2,
            boxShadow:'inset -20px 0 40px rgba(0,0,0,0.4)',
          }}
            initial={{ scaleX:1 }} animate={{ scaleX:0 }}
            transition={{ duration:1.4, delay:0.8, ease:EASE_OUT }}>
            {[15,30,45,60,75].map((x,i)=>(
              <div key={i} style={{ position:'absolute', top:0, left:`${x}%`, width:'2px', height:'100%', background:'rgba(0,0,0,0.15)' }}/>
            ))}
            <div style={{ position:'absolute', top:0, right:0, width:'5px', height:'100%', background:'linear-gradient(to bottom,#f5d060,#b8860b,#f5d060)' }}/>
          </motion.div>
          {/* Right curtain */}
          <motion.div style={{
            position:'absolute', top:0, right:0, width:'50%', height:'100%',
            background:'linear-gradient(to left,#3d0a1e,#8b1a2f 70%,#a02040)',
            transformOrigin:'right center', zIndex:2,
            boxShadow:'inset 20px 0 40px rgba(0,0,0,0.4)',
          }}
            initial={{ scaleX:1 }} animate={{ scaleX:0 }}
            transition={{ duration:1.4, delay:0.8, ease:EASE_OUT }}>
            {[15,30,45,60,75].map((x,i)=>(
              <div key={i} style={{ position:'absolute', top:0, left:`${x}%`, width:'2px', height:'100%', background:'rgba(0,0,0,0.15)' }}/>
            ))}
            <div style={{ position:'absolute', top:0, left:0, width:'5px', height:'100%', background:'linear-gradient(to bottom,#f5d060,#b8860b,#f5d060)' }}/>
          </motion.div>
          {/* Centre text */}
          <motion.div style={{ textAlign:'center', zIndex:3, position:'relative', padding:'0 24px' }}
            initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.2, duration:0.7 }}>
            <motion.p style={{ color:'#e8a0b0', fontFamily:'Lato,sans-serif', fontSize:'clamp(9px,2vw,12px)', letterSpacing:'0.5em', textTransform:'uppercase', marginBottom:'14px' }}
              animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}>
              ✦ You Are Invited ✦
            </motion.p>
            <p className="font-playfair" style={{ color:'#f5e6d0', fontSize:'clamp(1.4rem,5vw,2.8rem)', lineHeight:1.2 }}>
              A Wedding Celebration
            </p>
            <div style={{ width:'60px', height:'1.5px', background:'linear-gradient(90deg,transparent,#d4af37,transparent)', margin:'14px auto' }}/>
            <p className="font-cormorant" style={{ color:'#d4af37', fontSize:'clamp(0.9rem,2.5vw,1.2rem)', fontStyle:'italic' }}>
              29 May 2026 · Coimbatore
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Title card
function TitleCard({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="title"
          style={{
            position:'absolute', inset:0, zIndex:25,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            padding:'0 28px',
            background:'radial-gradient(ellipse 80% 70% at 50% 50%,rgba(26,5,16,0.94),rgba(13,2,8,0.97))',
          }}
          initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          transition={{ duration:1 }}>
          {/* Couple photo */}
          <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ duration:0.8, ease:EASE_BACK }} style={{ marginBottom:'18px', position:'relative' }}>
            <motion.div style={{ position:'absolute', inset:-14, borderRadius:'50%', background:'radial-gradient(circle,rgba(212,175,55,0.3),transparent)' }}
              animate={{ scale:[1,1.15,1], opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity }}/>
            <div style={{ width:'clamp(88px,15vw,116px)', height:'clamp(88px,15vw,116px)', borderRadius:'50%', overflow:'hidden', border:'3px solid #d4af37', boxShadow:'0 0 28px rgba(212,175,55,0.5)', position:'relative', zIndex:1 }}>
              <img src="/couple.PNG" alt="Couple" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} onError={e=>{e.target.style.display='none'}}/>
            </div>
          </motion.div>
          <motion.div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}
            initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.7, delay:0.3 }}>
            <div style={{ width:'48px', height:'1px', background:'linear-gradient(90deg,transparent,#d4af37)' }}/>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="#d4af37"><path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"/></svg>
            <div style={{ width:'48px', height:'1px', background:'linear-gradient(90deg,#d4af37,transparent)' }}/>
          </motion.div>
          <motion.p style={{ color:'#e8a0b0', fontFamily:'Lato,sans-serif', fontSize:'clamp(9px,1.8vw,11px)', letterSpacing:'0.45em', textTransform:'uppercase', marginBottom:'10px' }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}>Wedding Invitation</motion.p>
          <motion.h1 className="font-playfair" style={{ color:'#fdf8ee', fontSize:'clamp(1.6rem,5vw,3rem)', lineHeight:1.15, textAlign:'center', marginBottom:'4px' }}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.55, ease:EASE_OUT }}>A. Selvaraja</motion.h1>
          <motion.p className="font-playfair" style={{ color:'#d4af37', fontSize:'clamp(1.3rem,4vw,2.2rem)', margin:'5px 0', textAlign:'center' }}
            initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:0.75, ease:EASE_BACK }}>&amp;</motion.p>
          <motion.h1 className="font-playfair" style={{ color:'#fdf8ee', fontSize:'clamp(1.6rem,5vw,3rem)', lineHeight:1.15, textAlign:'center', marginBottom:'14px' }}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.9, ease:EASE_OUT }}>R. Rathna</motion.h1>
          <motion.div style={{ width:'76px', height:'1.5px', background:'linear-gradient(90deg,transparent,#d4af37,transparent)', margin:'0 auto 12px' }}
            initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.6, delay:1.1 }}/>
          <motion.p className="font-cormorant" style={{ color:'#e8a0b0', fontSize:'clamp(0.9rem,2.5vw,1.2rem)', fontStyle:'italic', textAlign:'center' }}
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.25 }}>
            29 May 2026 · Bellezza Event Hall, Coimbatore
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }) {
  const [scene, setScene] = useState('curtain')

  useEffect(() => {
    const t = [
      setTimeout(() => setScene('walk'),   3000),
      setTimeout(() => setScene('meet'),   6200),
      setTimeout(() => setScene('title'), 10000),
      setTimeout(() => setScene('done'),  12500),
      setTimeout(() => onComplete(),      12900),
    ]
    return () => t.forEach(clearTimeout)
  }, [onComplete])

  const showStage  = ['walk','meet'].includes(scene)
  const showHeart  = scene === 'meet'
  const showPetals = ['meet','title'].includes(scene)

  return (
    <AnimatePresence>
      {scene !== 'done' && (
        <motion.div key="splash" style={{
          position:'fixed', inset:0, zIndex:50, overflow:'hidden',
          background:'radial-gradient(ellipse at 50% 40%,#2a0818 0%,#1a0510 55%,#0d0208 100%)',
          display:'flex', flexDirection:'column',
        }}
          exit={{ opacity:0 }} transition={{ duration:0.9 }}>

          <GoldDust />
          {showPetals && <Petals />}
          <CurtainScene visible={scene === 'curtain'} />

          {/* ── STAGE: walk + meet ── */}
          <AnimatePresence>
            {showStage && (
              <motion.div key="stage"
                style={{ position:'absolute', inset:0 }}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:0.8 }}>

                {/* 3. Nadaswaram + Arch + Photos — one centred block */}
                <div style={{
                  position:'absolute', inset:0,
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  zIndex:5,
                }}>
                  {/* Nadaswaram */}
                  <motion.div style={{
                    display:'flex', alignItems:'center', gap:'10px',
                    marginBottom:'clamp(12px,3vw,20px)',
                  }}
                    initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.6, delay:0.2 }}>
                    <MusicBars />
                    <span style={{ color:'#d4af37', fontFamily:'Lato,sans-serif', fontSize:'clamp(8px,1.8vw,10px)', letterSpacing:'0.4em', textTransform:'uppercase', opacity:0.85 }}>
                      ♪ Nadaswaram
                    </span>
                    <MusicBars />
                  </motion.div>

                  {/* Arch */}
                  <motion.div style={{
                    width:'100%',
                    marginBottom:'-8px',
                  }}
                    initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
                    transition={{ duration:0.9, delay:0.1, ease:EASE_OUT }}>
                    <Arch />
                  </motion.div>

                  {/* Photos row */}
                  <div style={{
                    display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'center',
                    gap:'clamp(8px,4vw,24px)',
                    width:'100%',
                    padding:'0 clamp(16px,5vw,32px)',
                  }}>
                    <div style={{ flex:1, display:'flex', justifyContent:'flex-end' }}>
                      <PhotoFrame src="/groom.jpg" name="A. Selvaraja" side="left" phase={scene} />
                    </div>

                    {/* Heart centre slot */}
                    <div style={{ width:'clamp(44px,10vw,64px)', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <AnimatePresence>
                        {showHeart && (
                          <motion.div key="heart"
                            initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
                            exit={{ scale:0, opacity:0 }} transition={{ duration:0.6, ease:EASE_BACK }}>
                            <HeartBurst />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div style={{ flex:1, display:'flex', justifyContent:'flex-start' }}>
                      <PhotoFrame src="/bride.jpg" name="R. Rathna" side="right" phase={scene} />
                    </div>
                  </div>
                </div>

                {/* 4. Kolam + label — pinned to bottom */}
                <div style={{
                  position:'absolute', bottom:0, left:0, right:0,
                  display:'flex', flexDirection:'column', alignItems:'center',
                  paddingBottom:'clamp(40px,8vw,60px)', zIndex:4, gap:'6px',
                }}>
                  <motion.div style={{ width:'100%', display:'flex', justifyContent:'center' }}
                    initial={{ scaleX:0, opacity:0 }} animate={{ scaleX:1, opacity:1 }}
                    transition={{ duration:0.8, delay:0.4 }}>
                    <Kolam />
                  </motion.div>
                  <motion.p key={scene}
                    style={{ color:'#d4af37', fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(0.85rem,2.5vw,1.05rem)', fontStyle:'italic', textAlign:'center', opacity:0.85, margin:0 }}
                    initial={{ opacity:0, y:6 }} animate={{ opacity:0.85, y:0 }}
                    transition={{ duration:0.5 }}>
                    {scene === 'walk' ? '— Walking towards each other —' : '— Two hearts, one destiny —'}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <TitleCard visible={scene === 'title'} />

          {/* Progress dots */}
          <div style={{
            position:'absolute', bottom:'14px', left:'50%', transform:'translateX(-50%)',
            display:'flex', gap:'7px', alignItems:'center', zIndex:30,
          }}>
            {['curtain','walk','meet','title'].map(s => (
              <motion.div key={s} style={{ borderRadius:'3px', background:'#d4af37' }}
                animate={{ width:scene===s?'22px':'6px', height:'5px', opacity:scene===s?1:0.3 }}
                transition={{ duration:0.3 }}/>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
