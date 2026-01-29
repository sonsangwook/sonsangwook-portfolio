"use client"

import { useEffect } from "react";

export function HashScrollHandler() {
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash === "#about") {
                // Retry finding element to account for layout shifts
                const attemptScroll = (attempts = 0) => {
                    if (attempts > 5) return;

                    const anchor = document.getElementById("about");
                    // Fallback to manual calculation if anchor not found yet, but finding anchor is preferred
                    if (anchor) {
                        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                    } else {
                        // Fallback logic if anchor div is missing for some reason
                        const heroSection = document.querySelector("#hero");
                        if (heroSection) {
                            const heroHeight = heroSection.clientHeight;
                            const targetScroll = heroHeight * 0.55; // Match the 55% anchor position
                            window.scrollTo({ top: targetScroll, behavior: "smooth" });
                        }
                    }

                    // Retry if not successful or just to ensure stickiness
                    setTimeout(() => attemptScroll(attempts + 1), 100);
                };

                attemptScroll();
            } else if (hash === "#projects") {
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);
            }
        };

        handleHashChange(); // Run on mount

        // Listen for hash changes if user navigates within page
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return null;
}
