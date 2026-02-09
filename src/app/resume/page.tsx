"use client"

import { motion } from "framer-motion"
import { resumeData } from "../data/resume"

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">

                {/* Header Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white text-pretty">{resumeData.name}</h1>
                    <p className="text-xl text-white/60 mb-6 text-pretty">{resumeData.role}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-white/40">
                        <a href={`mailto:${resumeData.contact.email}`} className="hover:text-white transition-colors">
                            {resumeData.contact.email}
                        </a>
                        <span>•</span>
                        <span>{resumeData.contact.phone}</span>
                    </div>
                </motion.section>

                {/* Introduction */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="pt-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">소개</h2>
                        </div>
                        <div>
                            <p className="text-lg leading-relaxed text-white/80 whitespace-pre-line text-pretty break-keep">
                                {resumeData.introduction}
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Experience */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="pt-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">경력</h2>
                            <span className="text-white/60">{resumeData.totalExperience}</span>
                        </div>
                        <div>
                            {resumeData.experiences.map((exp) => (
                                <div key={exp.id} className="group mb-16 last:mb-0">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                        <h3 className="text-xl font-bold text-white text-pretty">{exp.company}</h3>
                                    </div>
                                    <p className="text-white/80 font-medium mb-1 text-pretty">{exp.role}</p>
                                    <div className="flex items-center gap-2 text-sm text-white/40 mb-3">
                                        <span>{exp.period}</span>
                                        <span>({exp.duration})</span>
                                        {exp.note && (
                                            <>
                                                <span className="text-white/20">|</span>
                                                <span>{exp.note}</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-white/60 leading-relaxed text-pretty break-keep">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Skills */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="pt-16 border-t border-white/10 mt-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-white">스킬</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {resumeData.skills.map((skillGroup) => (
                                <div key={skillGroup.category}>
                                    <h3 className="font-bold text-white mb-2 text-pretty">{skillGroup.category}</h3>
                                    <p className="text-white/60 text-pretty">
                                        {skillGroup.items.join(", ")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Education - Only render if there's data */}
                {resumeData.education.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
                            <div>
                                <h2 className="text-xl font-bold text-white">Education</h2>
                            </div>
                            <div className="space-y-6">
                                {resumeData.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                                            <h3 className="text-lg font-bold text-white text-pretty">{edu.school}</h3>
                                            <span className="text-sm text-white/40">{edu.period}</span>
                                        </div>
                                        <p className="text-white/60 text-pretty">{edu.degree}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.section>
                )}

            </div>
        </main>
    )
}
