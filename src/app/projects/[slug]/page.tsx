import { getProjectBySlug, getAllProjects } from "@/lib/projects"
import { notFound } from "next/navigation"
import { Header } from "@/app/components/layout/Header"
import Image from "next/image"
import Link from "next/link"

// Simple markdown to HTML converter for bold text
function parseMarkdownBold(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

export async function generateStaticParams() {
    const projects = getAllProjects()
    return projects.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = getProjectBySlug(slug)

    if (!project) {
        notFound()
    }

    // Logic for linear navigation (Prev/Next)
    const allProjects = getAllProjects()
    const currentIndex = allProjects.findIndex(p => p.slug === slug)

    // Linear navigation: 0 -> Next: 1; 1 -> Prev: 0, Next: 2; 2 -> Prev: 1
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

    return (
        <div className="min-h-screen font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Header />

            {/* Hero Images */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] pt-40">
                {project.images?.heroes && project.images.heroes.length > 0 ? (
                    // Multiple Hero Images Stack
                    <div className="space-y-4 mb-16">
                        {project.images.heroes.map((heroSrc, index) => (
                            <div key={index} className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
                                <Image
                                    src={heroSrc}
                                    alt={`Hero Image ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0} // Priority for the first image
                                    quality={100}
                                    sizes="100vw"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    // Fallback to Single Hero Image
                    project.images?.hero1 && (
                        <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden mb-16">
                            <Image
                                src={project.images.hero1}
                                alt="Hero Image"
                                fill
                                className="object-cover"
                                priority
                                quality={100}
                                sizes="100vw"
                            />
                        </div>
                    )
                )}
            </div>

            {/* Header Text */}
            <header className="pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
                <div className="max-w-[936px] mx-auto">
                    <div className="space-y-6 mb-16 mt-32 md:mt-40">
                        <h1 className="text-[24px] font-display font-bold tracking-tight text-black leading-tight text-balance">
                            {project.title}
                        </h1>
                        <p className="text-[18px] text-black leading-relaxed font-light whitespace-pre-line break-keep text-pretty">
                            {project.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-8 py-8 border-t border-primary/10">
                        <div>
                            <span className="block text-sm font-medium text-black mb-1">Year</span>
                            <span className="font-sans text-base text-black">{project.year || "2024"}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black mb-1">Company</span>
                            <span className="font-sans text-base text-black">{project.company || "Personal"}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black mb-1">Role</span>
                            <span className="font-sans text-base text-black">{project.roleDetails || "Product Designer"}</span>
                        </div>
                        <div>
                            <span className="block text-sm font-medium text-black mb-1">Result</span>
                            <span className="font-sans text-base text-black whitespace-pre-line">{project.projectResult || "Mobile App"}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] pb-40 space-y-[200px]">

                {/* 1. Background */}
                <section>
                    {/* Text First */}
                    <div className="max-w-[936px] mx-auto">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-[#212121] lowercase tracking-wide">01 background</h2>
                        </div>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-[16px] leading-relaxed text-black whitespace-pre-line break-keep text-pretty">
                                {project.background}
                            </p>
                        </div>
                    </div>

                    {/* Background Images After */}
                    {project.images?.backgroundImages && project.images.backgroundImages.length > 0 && (
                        <div className="mt-12 space-y-8">
                            {project.images.backgroundImages.map((imgSrc, index) => (
                                <div key={index} className="relative aspect-video w-full bg-muted overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`Background Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        sizes="(max-width: 1280px) 100vw, 1200px"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* 2. Problem Definition */}
                <section>
                    <div className="max-w-[936px] mx-auto">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-[#212121] lowercase tracking-wide">02 problem definition</h2>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p
                                className="text-[16px] leading-relaxed text-black whitespace-pre-line break-keep text-pretty"
                                dangerouslySetInnerHTML={{ __html: parseMarkdownBold(project.problem) }}
                            />
                        </div>
                    </div>

                    {/* Problem Images */}
                    {project.images?.problem && project.images.problem.length > 0 && (
                        <div className="mt-12 space-y-8">
                            {project.images.problem.map((imgSrc, index) => (
                                <div key={index} className="relative aspect-video w-full bg-muted overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`Problem Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        sizes="(max-width: 1280px) 100vw, 1200px"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 03 Design Solution Text First */}
                    <div className="max-w-[936px] mx-auto mt-[200px]">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-[#212121] lowercase tracking-wide">03 design solution</h2>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p
                                className="text-[16px] leading-relaxed text-black whitespace-pre-line break-keep text-pretty"
                                dangerouslySetInnerHTML={{ __html: parseMarkdownBold(project.solution) }}
                            />
                        </div>
                    </div>

                    {/* Solution Images After */}
                    {project.images?.solution && project.images.solution.length > 0 && (
                        <div className="mt-12 space-y-8">
                            {project.images.solution.map((imgSrc, index) => (
                                <div key={index} className="relative aspect-video w-full bg-muted overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`Solution Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        sizes="(max-width: 1280px) 100vw, 1200px"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {project.designDetails && project.designDetails.length > 0 && (
                        <div className="mt-[200px] space-y-[200px] w-full">
                            {project.designDetails.map((detail, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {/* Text Content First - constrained to 936px */}
                                    <div className="w-full max-w-[936px]">
                                        <div className="mb-4">
                                            <h3 className="text-[14px] font-bold text-[#212121] tracking-wide mb-2">
                                                Design solution - 0{index + 1}
                                            </h3>
                                            <h4 className="text-[20px] font-bold text-primary leading-tight mb-4 break-keep">
                                                {detail.title}
                                            </h4>
                                        </div>
                                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                                            <p className="text-[16px] leading-relaxed text-black whitespace-pre-line break-keep text-pretty">
                                                {detail.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Detail Images After - constrained to 1136px (wider than text) */}
                                    {detail.images && detail.images.length > 0 && (
                                        <div className="space-y-8 w-full max-w-[1136px] mt-[40px]">
                                            {detail.images.map((imgSrc, imgIndex) => (
                                                <div key={imgIndex} className="relative aspect-video w-full bg-muted overflow-hidden">
                                                    <Image
                                                        src={imgSrc}
                                                        alt={`${detail.title} - Image ${imgIndex + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        quality={100}
                                                        sizes="(max-width: 1280px) 100vw, 1200px"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                    }
                </section>


                {/* 4. Result */}
                <section>
                    {/* Result Text First */}
                    <div className="max-w-[936px] mx-auto">
                        <div className="mb-4">
                            <h2 className="text-[14px] font-bold text-[#212121] lowercase tracking-wide">04 result</h2>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="text-[16px] leading-relaxed text-black whitespace-pre-line break-keep text-pretty">
                                {project.result}
                            </p>
                        </div>
                    </div>

                    {/* Result Images After */}
                    {project.images?.result && project.images.result.length > 0 && (
                        <div className="mt-12 space-y-8">
                            {project.images.result.map((imgSrc, index) => (
                                <div key={index} className="relative aspect-video w-full bg-muted overflow-hidden">
                                    <Image
                                        src={imgSrc}
                                        alt={`Result Image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        quality={100}
                                        sizes="(max-width: 1280px) 100vw, 1200px"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section >

                <hr className="border-primary/10 max-w-[936px] mx-auto" />

                {/* Navigation (Prev / Next) */}
                <div className="pt-10 max-w-[936px] mx-auto flex justify-between items-start">
                    {/* Previous Link (Left) */}
                    <div className="w-1/2 text-left">
                        {prevProject ? (
                            <Link href={`/projects/${prevProject.slug}`} className="group block pr-4">
                                <p className="text-[14px] font-bold text-[#111111] mb-2 group-hover:opacity-70 transition-opacity">
                                    &larr; Previous Project
                                </p>
                                <h3 className="text-[18px] text-muted-foreground group-hover:text-primary transition-colors">
                                    {prevProject.title}
                                </h3>
                            </Link>
                        ) : (
                            // Empty placeholder to maintain spacing if needed, or just standard flow
                            <div aria-hidden="true" />
                        )}
                    </div>

                    {/* Next Link (Right) */}
                    <div className="w-1/2 text-right">
                        {nextProject ? (
                            <Link href={`/projects/${nextProject.slug}`} className="group block pl-4">
                                <p className="text-[14px] font-bold text-[#111111] mb-2 group-hover:opacity-70 transition-opacity">
                                    Next Project &rarr;
                                </p>
                                <h3 className="text-[18px] text-muted-foreground group-hover:text-primary transition-colors">
                                    {nextProject.title}
                                </h3>
                            </Link>
                        ) : (
                            <div aria-hidden="true" />
                        )}
                    </div>
                </div>

            </article >
        </div >
    )
}
