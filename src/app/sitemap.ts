import { MetadataRoute } from 'next'
import { tools, categories } from '@/config/tools'
import { blogPosts } from '@/config/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://easytool.live'

  // Tool pages — whatsapp-chat-analyzer gets higher priority, rest 0.8
  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: tool.slug === 'whatsapp-chat-analyzer' ? 0.95 : 0.8,
  }))

  // Category pages
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog pages
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-export-whatsapp-chat`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/whatsapp-response-time-checker`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/whatsapp-most-active-member`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/whatsapp-emoji-analyzer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.80,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...toolUrls,
    ...categoryUrls,
    ...blogUrls,
  ]
}
