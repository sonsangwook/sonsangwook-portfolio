"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useRef, useEffect } from "react";

interface DispersingTextProps {
    text: string;
    className?: string; // Wrapper class
    wordClassName?: string; // Class for individual words
    triggerRadius?: number; // How close mouse needs to be to trigger dispersal
    disperseDistance?: number; // How far particles scatter - effectively ignored now in favor of screen-wide
}

export function DispersingText({
    text,
    className = "",
    wordClassName = "",
    triggerRadius = 200,
    disperseDistance = 200 // Default, but we'll go bigger in logic
}: DispersingTextProps) {
    const words = text.split(" ");

    // We need a shared mouse position to detect "stop" globally if we wanted optimization,
    // but individual listeners are fine for now. 
    // Actually, to sync the "return" perfectly across all letters when mouse stops is tricky per-letter.
    // But per-letter logic is robust. Let's stick thereto for chaos.

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span key={i} className={`inline-block whitespace-nowrap mr-[0.25em] last:mr-0 ${wordClassName}`}>
                    {word.split("").map((char, j) => (
                        <DispersingChar
                            key={`${i}-${j}`}
                            char={char}
                            triggerRadius={triggerRadius}
                            disperseDistance={disperseDistance}
                        />
                    ))}
                </span>
            ))}
        </span>
    );
}

function DispersingChar({
    char,
    triggerRadius,
    disperseDistance
}: {
    char: string;
    triggerRadius: number;
    disperseDistance: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    // Physics values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotate = useMotionValue(0);
    const scale = useMotionValue(1);
    const opacity = useMotionValue(1);

    // Spring physics - Softer, more fluid (High damping, lower stiffness)
    // "Water-like" or "Space-like" drift
    const springConfig = { damping: 20, stiffness: 80, mass: 1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const springRotate = useSpring(rotate, springConfig);
    const springScale = useSpring(scale, springConfig);

    // Timer refs
    const returnTimer = useRef<NodeJS.Timeout | null>(null); // Global stop return
    const individualTimer = useRef<NodeJS.Timeout | null>(null); // Local "splash" return

    // Random dispersal vector for this specific character
    const randomVectorX = (Math.random() - 0.5) * 2; // -1 to 1 normalized
    const randomVectorY = (Math.random() - 0.5) * 2;
    const randomRotate = (Math.random() - 0.5) * 360;

    // Screen-wide but CONSTRAINED distance multiplier
    // Instead of massive 10x, we use a controlled spread that looks chaotic but visible.
    // ~ 200px - 500px range effective
    const distanceMultiplier = 1.5 + Math.random() * 2; // 1.5x to 3.5x base distance

    const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
        // Clear any existing global return timer locally if we are being hit
        if (returnTimer.current) {
            clearTimeout(returnTimer.current);
            returnTimer.current = null;
        }

        // Clear individual timer so we don't reset while being actively pushed
        if (individualTimer.current) {
            clearTimeout(individualTimer.current);
            individualTimer.current = null;
        }

        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Global mouse movement check - actually we rely on this specific handler firing.
        // Issue: if mouse moves elsewhere on screen, this handler might not fire if we aren't careful.
        // But the requirement is "Triggered by mouse within 4cm".

        if (distance < triggerRadius) {
            // EXPLOSION LOGIC
            // Force depends on proximity - Flattened curve for "solid" circle feel
            // Instead of dropping to 0 at edge, we keep it strong (0.6 to 1.0)
            const force = 0.6 + 0.4 * (1 - distance / triggerRadius);

            // PHYSICS: Mouse Direction Influence
            const moveSpeed = Math.sqrt(e.movementX * e.movementX + e.movementY * e.movementY);

            let pushDirX, pushDirY;

            if (moveSpeed > 1) {
                // Moving fast: Push in direction of mouse movement (Wave effect)
                pushDirX = e.movementX / moveSpeed;
                pushDirY = e.movementY / moveSpeed;
            } else {
                // Not moving much: Radial repulsion (Standard)
                pushDirX = -distanceX / distance || 0;
                pushDirY = -distanceY / distance || 0;
            }

            // Combine directional push with random scatter
            // Impact Adjuster: Speed matters, but ensure baseline kick
            const impactAdjuster = Math.min(Math.max(moveSpeed * 0.8, 1.2), 4);

            const moveX = (pushDirX * 0.7 + randomVectorX * 0.6) * disperseDistance * distanceMultiplier * force * impactAdjuster;
            const moveY = (pushDirY * 0.7 + randomVectorY * 0.6) * disperseDistance * distanceMultiplier * force * impactAdjuster;

            x.set(moveX);
            y.set(moveY);
            rotate.set(randomRotate * force);
            scale.set(1 + force * 0.5);
            opacity.set(1);

            // Set Individual Return Timer (1s)
            // Even if mouse is moving elsewhere, this particle will return after 1s of its last push
            individualTimer.current = setTimeout(() => {
                x.set(0);
                y.set(0);
                rotate.set(0);
                scale.set(1);
            }, 1000);
        }
    };

    // We need to detect when to return. 
    // Strategy: We set a timer every time we move. If we stop moving (no events), timer fires.
    // But since `onMouseMove` is only on the element or window? 
    // The previous implementation used `onMouseMove` on the span. 
    // To make this robust for "2 seconds after mouse stops", we need to listen to window mouse move 
    // to reset the global timer, OR we accept that individual letters reset when they are "touched".
    // Let's attach a global listener for the return trigger to ensure they come back even if mouse leaves the element.

    // Global Return Listener (Mouse Stop)
    useEffect(() => {
        const resetPositions = () => {
            // console.log("Returning to origin...");
            x.set(0);
            y.set(0);
            rotate.set(0);
            scale.set(1);
        };

        const onWindowMouseMove = () => {
            // Every time mouse moves anywhere, we delay the return of EVERYTHING?
            // Or only if we are currently dispersed?
            // If we are displaced, ensure we have a global safety reset
            if (x.get() !== 0 || y.get() !== 0) {
                if (returnTimer.current) clearTimeout(returnTimer.current);
                returnTimer.current = setTimeout(resetPositions, 1000); // 1.0s delay on stop
            }
        };

        window.addEventListener("mousemove", onWindowMouseMove);
        return () => {
            window.removeEventListener("mousemove", onWindowMouseMove);
            if (returnTimer.current) clearTimeout(returnTimer.current);
        };
    }, [x, y]); // Dependencies on motion values to check state

    return (
        <motion.span
            ref={ref}
            className="inline-block relative cursor-default select-none will-change-transform"
            style={{
                x: springX,
                y: springY,
                rotate: springRotate,
                scale: springScale,
                opacity: opacity,
                zIndex: x.get() !== 0 ? 50 : "auto"
            }}
            onMouseMove={handleMouseMove}
        // we rely on window listener for return logic now
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
    );
}
