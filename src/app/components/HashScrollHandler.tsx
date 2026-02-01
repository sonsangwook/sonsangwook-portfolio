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

                    const hero = document.getElementById("hero");
                    let targetTop = 0;

                    if (hero) {
                        // Hero is 600vh. Text appears 0.4-0.6. Target 0.62 to be fully visible (white).
                        targetTop = hero.clientHeight * 0.62;
                    } else {
                        // Fallback: 0.6 * 600vh = 3.6vh. Use 3.7 to be safe.
                        const vh = window.innerHeight;
                        targetTop = vh * 3.7;
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
