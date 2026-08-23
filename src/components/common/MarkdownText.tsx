'use client'

import dynamic from 'next/dynamic'
import type { Components } from 'react-markdown'

const ReactMarkdown = dynamic(() => import('react-markdown'), {
  loading: () => <span className="opacity-60">…</span>,
})

interface MarkdownTextProps {
  children: string
  components?: Components
  className?: string
  as?: 'div' | 'span'
}

/** Single code-split entry for react-markdown across the app. */
export function MarkdownText({
  children,
  components,
  className,
  as: Component = 'div',
}: MarkdownTextProps) {
  if (!children) return null
  return (
    <Component className={className}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </Component>
  )
}
