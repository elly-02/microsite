import { useEffect, useRef } from "react";

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width, height;
    let particles = [];

    const mouse = { x: null, y: null, radius: 160 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.size = Math.random() * 2 + 0.8;

        this.vx = (Math.random() - 0.5) * 0.25;
        this.vy = (Math.random() - 0.5) * 0.25;

        this.opacity = Math.random() * 0.8 + 0.2;

        // rainbow color
        this.hue = Math.random() * 360;
        this.hueSpeed = 0.15 + Math.random() * 0.25;

        this.twinkle = Math.random() * 0.02;
      }

      draw() {
        ctx.beginPath();

        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsl(${this.hue}, 80%, 60%)`;

        ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fill();

        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // rainbow animation
        this.hue += this.hueSpeed;
        if (this.hue > 360) this.hue = 0;

        // twinkle
        this.opacity += this.twinkle;
        if (this.opacity <= 0.2 || this.opacity >= 1) {
          this.twinkle *= -1;
        }

        // wrap edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // mouse interaction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;

            this.x -= dx * force * 0.015;
            this.y -= dy * force * 0.015;
          }
        }
      }
    }

    const createParticles = () => {
      particles = [];

      const count = (width * height) / 9000;

      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;

          const dist = dx * dx + dy * dy;

          if (dist < 14000) {
            const opacity = 1 - dist / 14000;

            ctx.strokeStyle = `hsla(${particles[a].hue}, 80%, 60%, ${
              opacity * 0.35
            })`;

            ctx.lineWidth = 0.7;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connect();

      requestAnimationFrame(animate);
    };

    const init = () => {
      resize();
      createParticles();
      animate();
    };

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    init();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-70 pointer-events-none"
    />
  );
}
