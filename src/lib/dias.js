import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const diasDirectory = path.join(process.cwd(), 'content/dias')

export async function getDiaContent(numero) {
  const slug = `dia-${String(numero).padStart(2, '0')}`
  const fullPath = path.join(diasDirectory, `${slug}.md`)

  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return { slug, frontmatter: data, contentHtml }
}
