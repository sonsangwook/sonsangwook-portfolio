"use client"

import { useEffect } from "react";

export function HashScrollHandler() {
    useEffect(() => {
        // Force scroll to top on initial load if no hash is present
        if (!window.location.hash) {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }

        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#about") {
                // Wait longer for Hero to fully render, then scroll to 65% (text fully visible)
                setTimeout(() => {
                    const heroSection = document.getElementById("hero");
                    if (heroSection) {
                        const heroHeight = heroSection.clientHeight;
                        const targetScroll = heroHeight * 0.65;
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    }
                }, 500);
            } else if (hash === "#projects") {
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            }
        };

        // Only listen for hash CHANGES - don't scroll on initial mount
        // This ensures page always starts at top
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return null;
}
