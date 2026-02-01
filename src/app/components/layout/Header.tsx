"use client"

import * as React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"

const navItems = [
    { name: "About", href: "#about" },
    { name: "Works", href: "#projects" },
]

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === "/";

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        if (href.startsWith("mailto:")) {
            window.location.href = href;
            return;
        }

        // If not on home page, navigate to home page with hash
        if (!isHomePage && href.startsWith("#")) {
            router.push(`/${href}`);
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            // For #about, add extra offset to ensure we're past the hero animation
            if (href === "#about") {
                const heroSection = document.querySelector("#hero");
                if (heroSection) {
                    // Scroll to 60% of hero section height to ensure text is visible
                    const heroHeight = heroSection.clientHeight;
                    const targetScroll = heroHeight * 0.6;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                    return;
                }
            }
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Header Style Logic
    // Scrolled:
    // - Home: Dark gradient fade? Or just darker background? User said "Home screen is white shadow" -> interpreted as White Text on Dark BG, maybe shadow on text?
    //   But request 2 says: "Home screen is white shadow, Work works are white background so black shadow".
    //   "White Shadow" on Home (Dark BG) usually means a glow.
    //   "Black Shadow" on Work (Light BG) is standard.
    //   AND "Not just cut off, but gradient shadow".
    //
    // Implementation:
    // Home (isHomePage):
    //   - Scrolled: bg-gradient-to-b from-black/80 to-transparent (Dark fade) + shadow-[0_4px_30px_rgba(255,255,255,0.1)] (White glow for contrast?) roughly.
    // Work (!isHomePage):
    //   - Scrolled: bg-gradient-to-b from-white/95 to-transparent (White fade) + shadow-sm (Black shadow).

    const headerClasses = isScrolled
        ? isHomePage
            ? "bg-gradient-to-b from-black via-black/50 to-transparent shadow-[0_4px_20px_rgba(255,255,255,0.05)] backdrop-blur-sm" // Home Scrolled - smoother gradient
            : "bg-white shadow-sm" // Work Scrolled - Solid white background
        : "mix-blend-difference"; // Top state

    const textColors = isScrolled
        ? isHomePage
            ? "text-white"
            : "text-foreground"
        : "text-white";

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="container mx-auto px-4 md:px-6 h-16 md:h-24 flex items-center justify-between max-w-screen-xl">
                <Link href="/" className={`text-xl font-bold tracking-tighter transition-colors ${textColors}`}>
                    SSW
                </Link>

                <nav className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className={`text-sm font-medium transition-colors relative group ${isScrolled && !isHomePage ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
                        >
                            {item.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full ${isScrolled && !isHomePage ? "bg-foreground" : "bg-white"}`} />
                        </button>
                    ))}
                </nav>
            </div>
        </motion.header>
    )
}
