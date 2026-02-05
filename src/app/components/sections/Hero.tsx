"use client";

import { motion, useScroll, useTransform } from "framer-motion"
import { DispersingText } from "@/app/components/ui/dispersing-text"
import { CursorFollower } from "@/app/components/ui/cursor-follower"
import { useRef, useState, useEffect } from "react"

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const [isNavigatingToAbout, setIsNavigatingToAbout] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash === '#about') {
            setIsNavigatingToAbout(true);
            const timer = setTimeout(() => {
                setIsNavigatingToAbout(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, []);

    // 1. Curtain Animation (Closes from sides)
    // 0 to 0.4 progress: Curtains close
    const curtainLeftX = useTransform(scrollYProgress, [0, 0.4], ["-100%", "0%"])
    const curtainRightX = useTransform(scrollYProgress, [0, 0.4], ["100%", "0%"])

    // 2. Text Animation (Fades in after curtains close)
    // 0.4 to 0.6 progress: Text appears
    const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
    const textY = useTransform(scrollYProgress, [0.4, 0.6], [20, 0])

    // 3. Background scale effect
    const bgScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1])

    // 4. Parallax Scroll for proper visibility on small screens
    // As user scrolls past 60%, move the text container up to reveal bottom content
    const contentParallaxY = useTransform(scrollYProgress, [0.6, 0.9], ["0vh", "-30vh"])

    return (
        // Outer container for scroll distance (300vh = 3 screens worth of scroll)
        <section ref={containerRef} id="hero" className="h-[600vh] relative cursor-none bg-black">
            <CursorFollower />
            {/* Transition Overlay to hide video flash on hash navigation */}
            {isNavigatingToAbout && (
                <div className="fixed inset-0 bg-black z-[9999] pointer-events-none" />
            )}

            {/* Sticky Container - overflow visible for text content */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center bg-black">

                {/* Layer 1: Video Background (Local File) + Product Designer Text */}
                <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/images/bokeh_gradient_shape_stack_remix_remix.mp4" type="video/mp4" />
                        {/* Fallback if video fails */}
                        <div className="w-full h-full bg-neutral-900" />
                    </video>

                    {/* "Product Designer" Text Overlay - Visible initially, gets covered by curtains */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="text-[2.4rem] md:text-[3.6rem] lg:text-[4.2rem] font-display font-bold text-center leading-tight"
                                style={{
                                    background: 'linear-gradient(to right, #3F8FF0, #CC5DD9, #E25F2B)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}
                            >
                                Simplify, Move fast, Deliver
                            </div>
                            <div className="text-[1rem] md:text-[1.25rem] lg:text-[1.5rem] font-sans text-[#575757] text-center">
                                문제를 단순화하고, 빠르게 움직여, 결과를 만듭니다.
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Layer 2: Black Curtains */}
                <motion.div
                    style={{ x: curtainLeftX }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-black z-20"
                />
                <motion.div
                    style={{ x: curtainRightX }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-black z-20"
                />

                {/* Hidden anchor for hash navigation - positioned at 70% to land at text section */}
                <div id="about" className="absolute top-[70%] left-0 w-full h-px -translate-y-24 invisible" />

                {/* Layer 3: Text Content (Appears on top of black curtains) */}
                <motion.div
                    style={{ y: contentParallaxY }}
                    className="container mx-auto px-4 lg:px-8 max-w-screen-xl relative z-30 flex flex-col justify-start pt-40 pb-20"
                >
                    <div className="space-y-12">
                        {/* Main English Text (Reverted to original left-aligned dispersing text) */}
                        <motion.div
                            style={{ opacity: textOpacity, y: textY }}
                            className="max-w-4xl"
                        >
                            <div className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white leading-tight inline-block">
                                <span className="inline">
                                    <DispersingText
                                        text="A product designer strong in"
                                        triggerRadius={35}
                                        disperseDistance={200}
                                    />
                                </span>
                                <br />
                                <span className="inline">
                                    <DispersingText
                                        text="execution and problem-solving, stripping away"
                                        triggerRadius={35}
                                        disperseDistance={200}
                                    />
                                </span>
                                <br />
                                <span className="inline">
                                    <DispersingText
                                        text="unnecessary steps to let users reach their goals"
                                        triggerRadius={35}
                                        disperseDistance={200}
                                    />
                                </span>
                                <br />
                                <span className="inline">
                                    <DispersingText
                                        text="without obstruction."
                                        triggerRadius={35}
                                        disperseDistance={200}
                                    />
                                    <sup className="inline-flex items-center justify-center bg-white text-black rounded-full w-[1.2em] h-[1.2em] text-[0.25em] font-bold ml-2 relative -top-3">1</sup>
                                </span>
                            </div>
                        </motion.div>

                        {/* Korean Translation (Reverted to original) */}
                        <motion.div
                            style={{ opacity: textOpacity, y: textY }}
                            className="max-w-2xl"
                        >
                            <div className="text-base md:text-xl font-sans text-white/60 leading-relaxed flex items-start gap-2">
                                <span className="inline-flex items-center justify-center bg-white text-black rounded-full min-w-[20px] h-[20px] text-[10px] font-bold mt-1">1</span>
                                <p>
                                    불필요한 과정을 걷어내 사용자가 막힘없이 목표에 도달하도록 만드는, 실행과 문제 해결에 강한 프로덕트 디자이너입니다.
                                </p>
                            </div>
                        </motion.div>

                        {/* New 3-Column Values Section */}
                        <motion.div
                            style={{ opacity: textOpacity, y: textY }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
                        >
                            {/* Item 1 */}
                            <div className="space-y-4">
                                <h3 className="text-[32px] font-bold text-white leading-tight">
                                    문제를 발견하고<br />목표를 먼저 제안
                                </h3>
                                <p className="text-[20px] text-white/60 leading-relaxed break-keep">
                                    주어진 과제가 아닌 해결해야 할 문제에 집중하며
                                    먼저 나서서 목표를 정의하고 방향을 제안합니다.
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="space-y-4">
                                <h3 className="text-[32px] font-bold text-white leading-tight">
                                    끝까지 책임지는<br />오너십과 리더십
                                </h3>
                                <p className="text-[20px] text-white/60 leading-relaxed break-keep">
                                    역할의 경계를 두지 않고 PM·영업까지 맡아
                                    문제를 해결하며, 프로젝트의 시작부터 성과까지 끝까지 책임집니다.
                                </p>
                            </div>

                            {/* Item 3 */}
                            <div className="space-y-4">
                                <h3 className="text-[32px] font-bold text-white leading-tight">
                                    가설을 빠르게 검증하는<br />실행 중심 해결
                                </h3>
                                <p className="text-[20px] text-white/60 leading-relaxed break-keep">
                                    아이디어가 생기면 현장·인터뷰를 통해 즉시
                                    검증하고, MVP를 빠르게 설계·실행하며 데이터
                                    기반으로 반복 개선합니다.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
