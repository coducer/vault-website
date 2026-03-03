'use client'
import { useEffect, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current

    if (!cursor || !dot) return

    let mouseX = 0
    let mouseY = 0
    let posX = 0
    let posY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const animate = () => {
      posX += (mouseX - posX) * 0.15
      posY += (mouseY - posY) * 0.15

      cursor.style.transform = `translate(${posX}px, ${posY}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor-ball"></div>
      <div ref={dotRef} className="cursor-dot"></div>
    </>
  )
}

export default CustomCursor