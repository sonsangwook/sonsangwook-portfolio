"use client";

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Project } from "@/app/data/projects"

export function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <section id="projects" className="py-32 bg-black text-white relative">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 space-y-4"
                >
                    <h2 className="text-[32px] font-display font-bold tracking-tight text-white">
                        Works
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {projects.slice(0, 3).map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group space-y-3"
        >
            {/* Thumbnail */}
            <Link href={`/projects/${project.slug}`} className="block overflow-hidden relative aspect-video bg-secondary/50 rounded-lg">
                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform">
                    {project.thumbnail ? (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                            <span className="text-xl font-display font-light text-muted-foreground/50">Thumbnail</span>
                        </div>
                    )}
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </Link>

            {/* Info */}
            <div className="space-y-1">
                <h3 className="text-[19px] font-bold leading-tight group-hover:text-accent transition-colors duration-300">
                    <Link href={`/projects/${project.slug}`}>
                        {project.title}
                    </Link>
                </h3>
                {/* Domain / Tags */}
                <p className="text-[14px] text-white">
                    {project.category || project.tags.join(", ")}
                </p>
            </div>
        </motion.div>
    )
}
