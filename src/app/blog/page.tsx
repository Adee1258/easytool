import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/config/blog"
import { Calendar, User, ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog - EasyToolify | Free Online Tools Guides & Tips",
  description: "Learn how to use our free online tools effectively with our expert guides, tutorials, and tips for content creators and professionals.",
}

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          EasyToolify <span className="text-primary">Blog</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Expert guides, tutorials, and tips to help you make the most of our free online tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <Card className="h-full overflow-hidden border-2 transition-all group-hover:border-primary/50 group-hover:shadow-lg">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute top-4 left-4 z-10">{post.category}</Badge>
              </div>
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {post.author}
                  </span>
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <span className="text-primary text-sm font-bold flex items-center gap-1">
                  Read More <ChevronRight className="h-4 w-4" />
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
