"use client";

import { DispersingText } from "@/app/components/ui/dispersing-text"
import { CursorFollower } from "@/app/components/ui/cursor-follower"

export function Hero() {
    return (
        <section id="hero" className="relative cursor-none bg-black">
            <CursorFollower />

            {/* Hidden anchor for hash navigation */}
            <div id="about" className="absolute top-0 left-0 w-full h-px invisible" />

            <div className="container mx-auto px-4 lg:px-8 max-w-screen-xl relative z-30 flex flex-col justify-start pt-40 pb-[400px]">
                <div className="space-y-12">
                    {/* Main English Text */}
                    <div>
                        <div className="text-5xl md:text-7xl lg:text-[80px] font-display font-medium text-white leading-[1.1] inline-block text-pretty">
                            <span className="inline">
                                <DispersingText
                                    text="I am a designer who removes"
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                            </span>
                            <br />
                            <span className="inline">
                                <DispersingText
                                    text="friction from complex processes,"
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                            </span>
                            <br />
                            <span className="inline">
                                <DispersingText
                                    text="enabling users to reach their"
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                            </span>
                            <br />
                            <span className="inline">
                                <DispersingText
                                    text="goals seamlessly through"
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                            </span>
                            <br />
                            <span className="inline">
                                <DispersingText
                                    text="strong execution and"
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                            </span>
                            <br />
                            <span className="inline whitespace-nowrap">
                                <DispersingText
                                    text="problem-solving."
                                    triggerRadius={35}
                                    disperseDistance={200}
                                />
                                <span className="inline-flex items-center justify-center bg-white text-black rounded-full w-6 h-6 text-[10px] font-bold ml-1 align-top mt-1">1</span>
                            </span>
                        </div>
                    </div>

                    {/* Korean Translation */}
                    <div className="max-w-2xl">
                        <div className="text-base md:text-xl font-sans text-white/60 leading-relaxed flex items-start gap-2 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center bg-white text-black rounded-full min-w-[20px] h-[20px] text-[10px] font-bold mt-1">1</span>
                            <p>
                                불필요한 과정을 걷어내 사용자가 막힘없이 목표에 도달하도록 만드는, 실행과 문제 해결에 강한 프로덕트 디자이너입니다.
                            </p>
                        </div>
                    </div>

                    {/* 3-Column Values Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24">
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
                                역할의 경계를 두지 않고 PM, 비즈니스 제안까지 맡아
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
                    </div>
                </div>
            </div>
        </section>
    )
}
