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
                // Retry finding element to account for layout shifts
                const attemptScroll = (attempts = 0) => {
                    if (attempts > 5) return;

                    const vh = window.innerHeight;
                    const isMobile = window.innerWidth < 768;
                    let targetTop = 0;

                    if (isMobile) {
                        // Mobile: Hero is 600vh tall = window.innerHeight × 600
                        // Text starts appearing at 40% progress (textOpacity: [0.4, 0.6])
                        // 40% of 600 = 240
                        targetTop = vh * 240;
                    } else {
                        // Desktop: Use element height calculation
                        const hero = document.getElementById("hero");
                        if (hero) {
                            targetTop = hero.clientHeight * 0.40;
                        } else {
                            targetTop = vh * 240;
                        }
                    }

                    window.scrollTo({ top: targetTop, behavior: "smooth" });

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
