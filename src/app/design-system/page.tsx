import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

async function getMarkdownContent() {
    const filePath = path.join(process.cwd(), 'DESIGN_SYSTEM.md')
    const content = fs.readFileSync(filePath, 'utf8')
    return content
}

export default async function DesignSystemPage() {
    const markdown = await getMarkdownContent()

    return (
        <main className="min-h-screen bg-black pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-screen-md">
                <article className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-white prose-headings:font-bold
                    prose-h1:text-4xl prose-h1:mb-4
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-white/80 prose-p:leading-relaxed
                    prose-strong:text-white
                    prose-code:text-white/90 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                    prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-ul:text-white/80 prose-ol:text-white/80
                    prose-li:marker:text-white/40
                    prose-table:text-sm
                    prose-th:text-white prose-th:font-medium prose-th:bg-white/5 prose-th:px-4 prose-th:py-2 prose-th:text-left
                    prose-td:text-white/80 prose-td:px-4 prose-td:py-2 prose-td:border-t prose-td:border-white/10
                    prose-hr:border-white/10
                ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdown}
                    </ReactMarkdown>
                </article>
            </div>
        </main>
    )
}
