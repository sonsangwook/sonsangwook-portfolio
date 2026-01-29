"use client";

import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

export function SoftCells() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- Configuration ---
        const CELL_COUNT = 1500; // Thousands of cells interacting
        const MAX_SPEED = 2;
        const CELL_BASE_RADIUS = 10;
        const CELL_VARIANCE = 5;
        const MOUSE_REPULSION = 200;
        const COLOR_PALETTE = [0xe2e8f0, 0xcbd5e1, 0x94a3b8]; // Slate-200 to 400 (Soft grey/blueish)

        // --- Setup Pixi App ---
        const app = new PIXI.Application();
        const initPixi = async () => {
            await app.init({
                resizeTo: window,
                backgroundAlpha: 0, // Transparent background
                antialias: true,
                autoDensity: true,
                resolution: window.devicePixelRatio || 1,
            });

            if (containerRef.current) {
                containerRef.current.appendChild(app.canvas);
            }

            // --- Metaball Filter Setup ---
            // Blur + Threshold = Gooey/Metaball effect
            // We use a container for the cells to apply filters to them as a group
            const cellContainer = new PIXI.Container();
            // Use alphaFilter later if needed, but standard blurring creates soft cells
            // For true metaballs: Blur then Threshold (AlphaFilter)
            const blurFilter = new PIXI.BlurFilter();
            blurFilter.blur = 12; // High blur for merging
            blurFilter.quality = 3;

            // Ideally we'd use an alpha threshold filter here, but Pixi JS ColorMatrixFilter can approximate high contrast alpha
            // Or we just stay with "Soft Cells" = blurred organic shapes
            cellContainer.filters = [blurFilter];
            app.stage.addChild(cellContainer);


            // --- Cell Class ---
            class Cell {
                sprite: PIXI.Graphics;
                x: number;
                y: number;
                vx: number;
                vy: number;
                radius: number;

                constructor(x: number, y: number) {
                    this.x = x;
                    this.y = y;
                    this.vx = (Math.random() - 0.5) * MAX_SPEED;
                    this.vy = (Math.random() - 0.5) * MAX_SPEED;
                    this.radius = CELL_BASE_RADIUS + Math.random() * CELL_VARIANCE;

                    const graphics = new PIXI.Graphics();
                    graphics.circle(0, 0, this.radius);
                    // Random color from palette
                    const color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
                    graphics.fill({ color: color, alpha: 0.6 });

                    this.sprite = graphics;
                    this.sprite.x = x;
                    this.sprite.y = y;
                    cellContainer.addChild(this.sprite);
                }

                update(mouseX: number, mouseY: number) {
                    // Update Position
                    this.x += this.vx;
                    this.y += this.vy;

                    // Mouse Interaction (Repulsion)
                    if (mouseX !== -1000) {
                        const dx = this.x - mouseX;
                        const dy = this.y - mouseY;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < MOUSE_REPULSION) {
                            const force = (MOUSE_REPULSION - dist) / MOUSE_REPULSION;
                            const angle = Math.atan2(dy, dx);
                            this.vx += Math.cos(angle) * force * 0.5;
                            this.vy += Math.sin(angle) * force * 0.5;
                        }
                    }

                    // Boundary Wrap
                    const padding = 50;
                    if (this.x < -padding) this.x = app.screen.width + padding;
                    if (this.x > app.screen.width + padding) this.x = -padding;
                    if (this.y < -padding) this.y = app.screen.height + padding;
                    if (this.y > app.screen.height + padding) this.y = -padding;

                    // Speed Limit/Damping
                    this.vx *= 0.99;
                    this.vy *= 0.99;

                    // Min Movement for "Life"
                    if (Math.abs(this.vx) < 0.2) this.vx += (Math.random() - 0.5) * 0.1;
                    if (Math.abs(this.vy) < 0.2) this.vy += (Math.random() - 0.5) * 0.1;

                    // Sync Sprite
                    this.sprite.x = this.x;
                    this.sprite.y = this.y;
                }
            }

            // --- Instantiate Cells ---
            const cells: Cell[] = [];
            for (let i = 0; i < CELL_COUNT; i++) {
                cells.push(new Cell(
                    Math.random() * app.screen.width,
                    Math.random() * app.screen.height
                ));
            }

            // --- Interaction ---
            let mouseX = -1000;
            let mouseY = -1000;

            const onMouseMove = (e: MouseEvent) => {
                const rect = app.canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            };

            const onMouseLeave = () => {
                mouseX = -1000;
                mouseY = -1000;
            }

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseleave', onMouseLeave); // Check global window leave

            // --- Animation Loop ---
            app.ticker.add(() => {
                for (const cell of cells) {
                    cell.update(mouseX, mouseY);
                }
            });

            // --- Cleanup ---
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseleave', onMouseLeave);
                app.destroy(true, { children: true, texture: true });
            };
        };

        const cleanupPromise = initPixi();

        return () => {
            cleanupPromise.then(cleanup => cleanup && cleanup());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 -z-10 w-full h-full pointer-events-none opacity-50"
        />
    );
}
