"use client"

import { useEffect, useRef } from "react"

type ParticlesBackgroundProps = {
  theme?: "dark" | "light"
  particleCount?: number
  opacity?: number
  className?: string
}

export function ParticlesBackground({
  theme = "dark",
  particleCount = 100,
  opacity = 0.3,
  className = "",
}: ParticlesBackgroundProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match its display size
    const updateCanvasSize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    updateCanvasSize()

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color =
          theme === "dark"
          // Colores más claros para fondo oscuros
            ? `rgba(${Math.floor(Math.random() * 100) + 200}, ${Math.floor(Math.random() * 100) + 200}, ${Math.floor(
                Math.random() * 55
              ) + 200}, ${Math.random() * 0.5 + 0.2})`
          // Colores más oscuros para fondo claros
            : `rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 55)}, ${Math.floor(
                Math.random() * 155)}, ${Math.random() * 0.2 + 0.1})`
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, particleCount])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  )
}