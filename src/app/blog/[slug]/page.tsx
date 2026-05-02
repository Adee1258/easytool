import { blogPosts } from "@/config/blog"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} - EasyToolify Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-12">
      <Link href="/blog">
        <Button variant="ghost" size="sm" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Button>
      </Link>

      <div className="space-y-4 mb-8">
        <Badge variant="secondary" className="px-3 py-1 text-sm">
          {post.category}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 border shadow-2xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div 
        className="prose prose-slate dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:tracking-tight
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-2xl prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Separator className="my-12" />

      <div className="bg-muted/30 rounded-3xl p-8 border text-center">
        <h3 className="text-2xl font-bold mb-4">Try Our Free Tools Today!</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          EasyToolify provides 48+ free online tools to help you with video downloads, PDF management, image editing, and more. No signup required.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8">
            Explore All Tools
          </Button>
        </Link>
      </div>
    </article>
  )
}
