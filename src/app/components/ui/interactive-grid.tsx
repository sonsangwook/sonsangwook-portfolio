"use client";

import { useEffect, useRef } from "react";

export function InteractiveGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        // Configuration
        const dotColor = "#000000"; // Black dots for white theme
        const dotBaseSize = 1.5;
        const gridSpacing = 40;
        const reactionRadius = 150;
        const friction = 0.9;
        const ease = 0.1;

        // Dot class
        class Dot {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.originX = x;
                this.originY = y;
                this.vx = 0;
                this.vy = 0;
                this.size = dotBaseSize;
            }

            update() {
                // Distance to mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Interaction
                if (distance < reactionRadius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (reactionRadius - distance) / reactionRadius;
                    const push = force * 4; // Push strength

                    this.vx -= Math.cos(angle) * push;
                    this.vy -= Math.sin(angle) * push;
                }

                // Return to origin (Spring)
                const dxOrigin = this.originX - this.x;
                const dyOrigin = this.originY - this.y;

                this.vx += dxOrigin * ease;
                this.vy += dyOrigin * ease;

                // Friction
                this.vx *= friction;
                this.vy *= friction;

                // Apply velocity
                this.x += this.vx;
                this.y += this.vy;
            }

            draw() {
                if (!ctx) return;

                // Distance to mouse
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

                // Color interpolation
                if (distance < reactionRadius) {
                    // Blue color #2563eb (RGB: 37, 99, 235)
                    // Black color #000000 (RGB: 0, 0, 0)
                    const t = 1 - (distance / reactionRadius); // 0 to 1 based on proximity
                    // Simple interpolation
                    const r = Math.floor(37 * t);
                    const g = Math.floor(99 * t);
                    const b = Math.floor(235 * t);
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    ctx.globalAlpha = 0.2 + (0.8 * t); // Make it more opaque when active
                } else {
                    ctx.fillStyle = dotColor;
                    ctx.globalAlpha = 0.2;
                }

                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }


        let dots: Dot[] = [];

        const init = () => {
            dots = [];
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const cols = Math.floor(canvas.width / gridSpacing) + 1;
            const rows = Math.floor(canvas.height / gridSpacing) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    dots.push(new Dot(i * gridSpacing, j * gridSpacing));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((dot) => {
                dot.update();
                dot.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Correct mouse position relative to canvas
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseX = -1000;
            mouseY = -1000;
        }

        // Initialize
        init();
        animate();

        // Event Listeners
        window.addEventListener("resize", handleResize);
        // Attach mouse move to window or specific container if needed, 
        // but canvas is fullscreen absolute so it should capture well.
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 -z-10 w-full h-full pointer-events-none"
        />
    );
}
