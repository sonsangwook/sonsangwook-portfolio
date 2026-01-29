"use client";

import { useEffect, useRef, useState } from "react";

export function UnicornEmbed({ projectId }: { projectId: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check if script is already present
        const existingScript = document.querySelector(
            'script[src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.3/dist/unicornStudio.umd.js"]'
        );

        const initUnicorn = () => {
            if (window.UnicornStudio) {
                window.UnicornStudio.init();
                setIsLoaded(true);
            }
        };

        if (existingScript) {
            // Script exists, just try to init
            initUnicorn();
            // Also add listener just in case it's still loading
            existingScript.addEventListener("load", initUnicorn);
        } else {
            // Create and append script
            const script = document.createElement("script");
            script.src =
                "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.3/dist/unicornStudio.umd.js";
            script.async = true;
            script.onload = initUnicorn;
            document.head.appendChild(script);
        }

        // Cleanup listener if we added one (complex to track exact reference, simplest is to just leave it as it's global)
        // But we can re-init on mount if window.UnicornStudio exists
        if (window.UnicornStudio) {
            window.UnicornStudio.init();
        }

        return () => {
            if (existingScript) {
                existingScript.removeEventListener("load", initUnicorn);
            }
        };
    }, [projectId]);

    return (
        <div
            ref={containerRef}
            data-us-project={projectId}
            style={{
                width: "100%",
                height: "100%",
                opacity: isLoaded ? 1 : 0, // Fade in when ready to avoid flashes
                transition: "opacity 0.5s ease-in-out",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 0,
            }}
        >
            {/* Unicorn Studio injects canvas here */}
        </div>
    );
}
