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
                // Use exact same logic as Header.tsx
                setTimeout(() => {
                    const heroSection = document.getElementById("hero");
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
        };

        handleHashChange(); // Run on mount

        // Listen for hash changes if user navigates within page
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return null;
}
