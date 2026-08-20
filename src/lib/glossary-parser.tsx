import React from 'react'
import { DESTINY_GLOSSARY, GlossaryTerm } from '@/config/glossary'
import { GhostTooltip } from '@/components/common/GhostTooltip'

// Build a regex pattern from all terms and aliases
const termMap = new Map<string, GlossaryTerm>()
const allTerms: string[] = []

DESTINY_GLOSSARY.forEach((item) => {
  allTerms.push(item.term.toLowerCase())
  termMap.set(item.term.toLowerCase(), item)
  if (item.aliases) {
    item.aliases.forEach((alias) => {
      allTerms.push(alias.toLowerCase())
      termMap.set(alias.toLowerCase(), item)
    })
  }
})

// Sort by length descending to match longest terms first
allTerms.sort((a, b) => b.length - a.length)

// Escape regex special characters
const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const pattern = new RegExp(
  `\\b(${allTerms.map(escapeRegExp).join('|')})\\b`,
  'gi'
)

function parseGlossaryText(text: string): React.ReactNode[] {
  const parts = text.split(pattern)
  const result: React.ReactNode[] = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    const lowerPart = part.toLowerCase()
    if (termMap.has(lowerPart)) {
      const termDef = termMap.get(lowerPart)!
      result.push(
        <GhostTooltip key={`term-${i}`} term={termDef}>
          {part}
        </GhostTooltip>
      )
    } else {
      result.push(part)
    }
  }

  return result
}

export function withGlossaryParsing(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      return parseGlossaryText(child)
    }
    if (React.isValidElement(child)) {
      // Don't parse inside code blocks or existing tooltips
      if (child.type === 'code' || child.type === 'a') {
        return child
      }
      const element = child as React.ReactElement<{ children?: React.ReactNode }>
      if (element.props.children) {
        return React.cloneElement(element, {
          ...element.props,
          children: withGlossaryParsing(element.props.children),
        })
      }
    }
    return child
  })
}
