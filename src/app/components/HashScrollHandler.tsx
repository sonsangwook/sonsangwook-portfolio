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
                    // Calculate position: Anchor is at 55% of Hero.
                    // Animation text appears 0.4-0.6. We want to be at ~0.6+
                    // ScrollY = Progress * (SectionHeight - ViewportHeight)
                    // But easiest is just to scroll specific VH amount.
                    // Let's scroll to 1.35 * Viewport Height. (135vh)
                    const vh = window.innerHeight;
                    window.scrollTo({ top: vh * 1.35, behavior: "smooth" });

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
