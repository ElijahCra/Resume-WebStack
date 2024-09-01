// app/posts/[slug]/page.tsx
import { format, parseISO } from 'date-fns'
import { allPosts } from '@content'
import { useMDXComponent } from 'next-contentlayer/hooks'
import dynamic from 'next/dynamic'
import "src/styles/prism-plus.css";

const DynamicTableOfContents = dynamic(
    () => import("../../../components/Posts/TableOfContents.tsx"),
    { ssr: false }
)

export const generateStaticParams = async () =>
    allPosts.map((post) => ({
        slug: post.slug,
    }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
    return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post.slug === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

    const MDXContent = useMDXComponent(post.body.code)

    const headings = post.body.raw
        .split('\n')
        .filter((line) => line.match(/^#+\s/))
        .map((line) => {
            const level = line.indexOf(' ')
            const text = line.slice(level + 1)
            const id = text.toLowerCase().replace(/\W/g, '-')
            return { id, text, level }
        })

    return (
        <div className="flex relative min-h-screen">
            <aside className="w-64 h-full fixed left-0 top-0 p-4 z-10 overflow-y-auto bg-custom-1">
                <DynamicTableOfContents headings={headings}/>
            </aside>
            <main className="flex-1 ml-64 p-8 text-white radial-gradient-bg">
                <article className="max-w-3xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-customHeader">{post.title}</h1>
                        <time dateTime={post.date} className="mb-1 text-sm text-gray-400">
                            {format(parseISO(post.date), 'LLLL d, yyyy')}
                        </time>
                    </div>
                    <div className="prose">
                        <MDXContent components={{
                            pre: (props) => <pre {...props} className="language-jsx"/>,
                            code: (props) => <code {...props} className="language-jsx"/>
                        }}/>
                    </div>
                </article>
            </main>
        </div>
    )
}

export default PostLayout
