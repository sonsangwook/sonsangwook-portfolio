"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useRef } from "react";

interface MagneticTextProps {
    text: string;
    className?: string; // Wrapper class
    wordClassName?: string; // Class for individual words
    strength?: number; // How strong the magnet is (distance of pull)
    range?: number; // Radius of interaction
}

export function MagneticText({
    text,
    className = "",
    wordClassName = "",
    strength = 50,
    range = 100
}: MagneticTextProps) {
    const words = text.split(" ");

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                // Word wrapper to keep characters together but allow line breaks between words
                <span key={i} className={`inline-block whitespace-nowrap mr-[0.25em] last:mr-0 ${wordClassName}`}>
                    {word.split("").map((char, j) => (
                        <MagneticChar
                            key={`${i}-${j}`}
                            char={char}
                            strength={strength}
                            range={range}
                        />
                    ))}
                </span>
            ))}
        </span>
    );
}

function MagneticChar({
    char,
    strength,
    range,
}: {
    char: string;
    strength: number;
    range: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);

    // Physics values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth return - stiffer for "sticky" feel
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLSpanElement>) => {
        const element = ref.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < range) {
            // Magnetic effect calculation
            // Pull towards mouse (Sticky) or repel? 
            // "Sticky clusters" implies attraction to the "zero-gravity stick" (mouse)
            const pull = 1 - distance / range;
            const moveX = distanceX * pull * (strength / range);
            const moveY = distanceY * pull * (strength / range);

            x.set(moveX);
            y.set(moveY);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Random floating animation (Weightlessness)
    const floatDuration = 4 + Math.random() * 3; // Slower, more floaty
    const floatDelay = Math.random() * 3;
    const floatRange = 8; // Gentle float
    const rotateRange = 10; // Slight rotation

    return (
        <motion.span
            ref={ref}
            className="inline-block relative cursor-default"
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                y: [0, -floatRange, floatRange / 2, 0],
                rotate: [0, rotateRange, -rotateRange, 0],
            }}
            transition={{
                duration: floatDuration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: floatDelay
            }}
        >
            {char}
        </motion.span>
    );
}
