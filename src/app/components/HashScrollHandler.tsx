"use client"

import { useEffect } from "react";

export function HashScrollHandler() {
    useEffect(() => {
        // Handle hash navigation from other pages
        const hash = window.location.hash;
        if (hash === "#about") {
            // Wait for content to load
            setTimeout(() => {
                const heroSection = document.querySelector("#hero");
                if (heroSection) {
                    const heroHeight = heroSection.clientHeight;
                    const targetScroll = heroHeight * 0.6;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }
            }, 100);
        } else if (hash === "#projects") {
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, []);

    return null;
}
