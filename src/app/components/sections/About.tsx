"use client";

import { motion } from "framer-motion";

export function About() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section id="about" className="py-24 md:py-32 bg-background border-b border-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={container}
                    className="space-y-24"
                >
                    {/* Main Philosophy - Left Aligned */}
                    <div className="max-w-4xl">
                        <motion.h2
                            variants={item}
                            className="text-[32px] font-display font-bold leading-tight text-primary text-balance"
                        >
                            불필요한 과정을 걷어내<br className="hidden md:block" />
                            사용자가 막힘없이 목표에 도달하도록 만드는,<br className="hidden md:block" />
                            <span className="text-muted-foreground">실행과 문제 해결에 강한 프로덕트 디자이너입니다.</span>
                        </motion.h2>
                    </div>

                    {/* Strengths - 3 Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <motion.div variants={item} className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">
                                1. 끝까지 추진하는 실행력과 리더십
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                역할을 가리지 않고 PM·영업까지 맡아 프로젝트를 끝까지 밀어붙이며 성과를 만들어냅니다.
                            </p>
                        </motion.div>

                        <motion.div variants={item} className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">
                                2. 빠르게 검증하고 실행하는 강한 실행력
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                아이디어가 생기면 즉시 검증에 나서며, 지속적인 iteration을 개선하며 목표에 도달합니다.
                            </p>
                        </motion.div>

                        <motion.div variants={item} className="space-y-4">
                            <h3 className="text-xl font-bold text-primary">
                                3. 문제를 발견하고 목표를 먼저 제안
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                강한 실행력을 바탕으로 문제에 집중하며, 먼저 나서서 문제를 해결하고자 합니다.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
