import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/app/data/projects'; // Reuse existing interface for now

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getProjectBySlug(slug: string): Project | null {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        // Fallback to legacy projects.ts if not found in content folder (incremental migration)
        const { projects } = require('@/app/data/projects');
        return projects.find((p: Project) => p.slug === slug) || null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    // Map frontmatter to Project interface
    return {
        id: data.id,
        slug: slug,
        title: data.title,
        description: data.description,
        tags: data.tags,
        thumbnail: data.thumbnail,
        category: data.category,
        year: data.year,
        company: data.company,
        roleDetails: data.roleDetails,
        projectResult: data.projectResult,

        // Sections
        background: data.background,
        problem: data.problem,
        solution: data.solution,
        result: data.result,

        // Images
        images: data.images,

        // Design Details
        designDetails: data.designDetails,
    } as Project;
}

export function getAllProjects(): Project[] {
    // Get markdown projects
    const fileNames = fs.existsSync(projectsDirectory)
        ? fs.readdirSync(projectsDirectory).filter(fn => fn.endsWith('.md'))
        : [];

    const markdownProjects = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '');
        return getProjectBySlug(slug);
    }).filter((p): p is Project => p !== null);

    // Get legacy projects that are NOT in markdown yet
    const { projects: legacyProjects } = require('@/app/data/projects');
    const legacyProjectsFiltered = legacyProjects.filter((p: Project) =>
        !markdownProjects.some(mp => mp.slug === p.slug)
    );

    return [...markdownProjects, ...legacyProjectsFiltered].sort((a, b) =>
        parseInt(a.id) - parseInt(b.id)
    );
}
