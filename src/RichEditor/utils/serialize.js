import escapeHtml from 'escape-html'
import { Text } from 'slate'

export const serialize = node => {
  if (Text.isText(node)) {
    const text = escapeHtml(node.text)
    if (node.bold) return `<strong>${text}</strong>`
    if (node.code) return `<code>${text}</code>`
    if (node.italic) return `<em>${text}</em>`
    if (node.underline) return `<u>${text}</u>`
    if (node.strikethrough) return `<del>${text}</del>`
    return text
  }

  const children = node.children.map(n => serialize(n)).join('')
  console.log("node", node);

  switch (node.type) {
    case 'bulleted-list':
      return `<ul>${children}</ul>`
    case 'list-item':
      return `<li>${children}</li>`
    case 'paragraph':
      return `<p>${children}</p>`
    case 'link':
      return `<a href="${escapeHtml(node.url)}">${children}</a>`
    case 'image':
      return `<img alt="" src="${escapeHtml(node.url)}" />`
    default: {
      return children
    }
  }
}