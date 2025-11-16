import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypePrism from 'rehype-prism-plus'
import rehypeKatex from 'rehype-katex'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import yaml from 'js-yaml'

const contentDirectory = path.join(process.cwd(), 'src/content')

export interface MarkdownMetadata {
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  author?: string
  image?: string

  // Learning path metadata
  module?: string
  order?: number
  prerequisites?: string[]
  next?: string
  previous?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
  estimatedTime?: string
}

export interface ModuleMetadata {
  title: string
  description: string
  order: number
  icon?: string
  color?: string
  prerequisites: string[]
  estimatedTime?: string
  difficulty?: string
}

export interface FolderStructure {
  name: string
  path: string
  type: 'folder' | 'file'
  order?: number
  children?: FolderStructure[]
  metadata?: MarkdownMetadata | ModuleMetadata
}

export interface MarkdownContent {
  slug: string
  metadata: MarkdownMetadata
  content: string
}

/**
 * Get all markdown files from a specific category (supports nested folders)
 */
export function getAllMarkdownFiles(category: string): MarkdownContent[] {
  const categoryPath = path.join(contentDirectory, category)

  // Check if directory exists
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const allContent: MarkdownContent[] = []

  // Recursive function to get all markdown files
  function getFilesRecursively(dirPath: string, relativePath: string = '') {
    const items = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const item of items) {
      // Skip module metadata files
      if (item.name === '_module.yaml') {
        continue
      }

      if (item.isDirectory()) {
        // Recursively get files from subdirectory
        getFilesRecursively(
          path.join(dirPath, item.name),
          relativePath ? `${relativePath}/${item.name}` : item.name
        )
      } else if (item.name.endsWith('.md')) {
        // It's a markdown file
        const slug = relativePath
          ? `${relativePath}/${item.name.replace(/\.md$/, '')}`
          : item.name.replace(/\.md$/, '')

        const fullPath = path.join(dirPath, item.name)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        allContent.push({
          slug,
          metadata: data as MarkdownMetadata,
          content: content
        })
      }
    }
  }

  getFilesRecursively(categoryPath)

  // Sort by module order and article order, then by date
  return allContent.sort((a, b) => {
    // First sort by module order
    const moduleOrderA = a.metadata.module ? parseInt(a.metadata.module.split('-')[0]) : 999
    const moduleOrderB = b.metadata.module ? parseInt(b.metadata.module.split('-')[0]) : 999

    if (moduleOrderA !== moduleOrderB) {
      return moduleOrderA - moduleOrderB
    }

    // Then by article order within module
    const orderA = a.metadata.order || 999
    const orderB = b.metadata.order || 999

    if (orderA !== orderB) {
      return orderA - orderB
    }

    // Finally by date (newest first)
    if (a.metadata.date < b.metadata.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get a single markdown file by category and slug (supports nested paths)
 */
export async function getMarkdownBySlug(
  category: string,
  slug: string
): Promise<MarkdownContent | null> {
  try {
    let fullPath: string

    // Support both flat and nested paths
    // slug can be "voltage-current-dividers" or "01-fundamentals/02-voltage-current-dividers"
    if (slug.includes('/')) {
      // Nested path provided
      fullPath = path.join(contentDirectory, category, `${slug}.md`)
    } else {
      // Try to find in root first (backward compatibility)
      fullPath = path.join(contentDirectory, category, `${slug}.md`)

      // If not found, search in subfolders
      if (!fs.existsSync(fullPath)) {
        const categoryPath = path.join(contentDirectory, category)
        const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
          .filter(item => item.isDirectory())

        for (const folder of folders) {
          const nestedPath = path.join(categoryPath, folder.name, `${slug}.md`)
          if (fs.existsSync(nestedPath)) {
            fullPath = nestedPath
            break
          }
        }
      }
    }

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Process markdown to HTML with syntax highlighting and math support
    const processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)  // Add math support
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypePrism, { ignoreMissing: true })
      .use(rehypeKatex)  // Render math with KaTeX
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)

    const contentHtml = processedContent.toString()

    return {
      slug,
      metadata: data as MarkdownMetadata,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error reading markdown file: ${category}/${slug}`, error)
    return null
  }
}

/**
 * Get all slugs for a category (for static generation, supports nested folders)
 */
export function getAllSlugs(category: string): string[] {
  const allArticles = getAllMarkdownFiles(category)
  return allArticles.map(article => article.slug)
}

/**
 * Get related articles based on tags
 */
export function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit: number = 3
): MarkdownContent[] {
  const allArticles = getAllMarkdownFiles(category)
  const currentArticle = allArticles.find(article => article.slug === currentSlug)
  
  if (!currentArticle) {
    return []
  }

  const currentTags = currentArticle.metadata.tags || []
  
  // Filter out current article and score by matching tags
  const scored = allArticles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      const matchingTags = article.metadata.tags?.filter(tag => 
        currentTags.includes(tag)
      ).length || 0
      
      return { article, score: matchingTags }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article)

  return scored
}

/**
 * Search articles by query
 */
export function searchArticles(category: string, query: string): MarkdownContent[] {
  const allArticles = getAllMarkdownFiles(category)
  const lowerQuery = query.toLowerCase()

  return allArticles.filter(article => {
    const titleMatch = article.metadata.title.toLowerCase().includes(lowerQuery)
    const descMatch = article.metadata.description?.toLowerCase().includes(lowerQuery)
    const tagMatch = article.metadata.tags?.some(tag =>
      tag.toLowerCase().includes(lowerQuery)
    )
    const contentMatch = article.content.toLowerCase().includes(lowerQuery)

    return titleMatch || descMatch || tagMatch || contentMatch
  })
}

/**
 * Get module metadata from _module.yaml file
 */
export function getModuleMetadata(category: string, modulePath: string): ModuleMetadata | null {
  const moduleFilePath = path.join(contentDirectory, category, modulePath, '_module.yaml')

  if (!fs.existsSync(moduleFilePath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(moduleFilePath, 'utf8')
    const metadata = yaml.load(fileContents) as ModuleMetadata
    return metadata
  } catch (error) {
    console.error(`Error reading module metadata: ${category}/${modulePath}`, error)
    return null
  }
}

/**
 * Get previous and next articles based on frontmatter metadata
 */
export async function getAdjacentArticles(
  category: string,
  currentSlug: string
): Promise<{ previous: MarkdownContent | null; next: MarkdownContent | null }> {
  const currentArticle = await getMarkdownBySlug(category, currentSlug)

  if (!currentArticle) {
    return { previous: null, next: null }
  }

  let previous: MarkdownContent | null = null
  let next: MarkdownContent | null = null

  // Get previous article from metadata
  if (currentArticle.metadata.previous) {
    previous = await getMarkdownBySlug(category, currentArticle.metadata.previous)
  }

  // Get next article from metadata
  if (currentArticle.metadata.next) {
    next = await getMarkdownBySlug(category, currentArticle.metadata.next)
  }

  return { previous, next }
}

/**
 * Get folder structure for a category
 */
export function getFolderStructure(category: string): FolderStructure[] {
  const categoryPath = path.join(contentDirectory, category)

  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const items = fs.readdirSync(categoryPath, { withFileTypes: true })
  const structure: FolderStructure[] = []

  for (const item of items) {
    if (item.isDirectory()) {
      // It's a module folder
      const modulePath = item.name
      const moduleMetadata = getModuleMetadata(category, modulePath)

      // Get articles in this module
      const moduleFolderPath = path.join(categoryPath, modulePath)
      const articleFiles = fs.readdirSync(moduleFolderPath)
        .filter(file => file.endsWith('.md'))

      const children: FolderStructure[] = []

      for (const file of articleFiles) {
        const slug = file.replace(/\.md$/, '')
        const fullPath = path.join(moduleFolderPath, file)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        const metadata = data as MarkdownMetadata

        children.push({
          name: metadata.title || slug,
          path: `${modulePath}/${slug}`,
          type: 'file' as const,
          order: metadata.order,
          metadata: metadata
        })
      }

      // Sort children by order
      children.sort((a, b) => (a.order || 0) - (b.order || 0))

      structure.push({
        name: moduleMetadata?.title || modulePath,
        path: modulePath,
        type: 'folder' as const,
        order: moduleMetadata?.order,
        children,
        metadata: moduleMetadata || undefined
      })
    }
  }

  // Sort folders by order
  return structure.sort((a, b) => (a.order || 0) - (b.order || 0))
}

