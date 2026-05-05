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
      url: `${baseUrl}/merge-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/merge-pdf-free`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/combine-pdf-files`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/how-to-merge-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/merge-pdf-without-acrobat`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/merge-pdf-iphone`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/merge-pdf-android`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/merge-pdf-windows`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/best-pdf-merger`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/compress-image`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/pdf-to-word`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/word-to-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/compress-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.90,
    },
    {
      url: `${baseUrl}/jpg-to-pdf`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
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
      url: `${baseUrl}/whatsapp-word-cloud-generator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.80,
    },
    {
      url: `${baseUrl}/whatsapp-sentiment-analysis`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    },
    {
      url: `${baseUrl}/whatsapp-vs-telegram-chat-analyzer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.78,
    },
    {
      url: `${baseUrl}/whatsapp-who-texts-you-most`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/whatsapp-chat-analyzer-online`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/whatsapp-chat-statistics`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/blog/whatsapp-chat-analyzer-kaise-use-karein`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
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
