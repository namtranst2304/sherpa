import type { Components } from 'react-markdown'
import { withGlossaryParsing } from '@/lib/glossary-parser'

/* eslint-disable @typescript-eslint/no-unused-vars */
export const markdownComponents: Components = {
  p: ({ node, children, ...props }) => <span className="break-words" {...props}>{withGlossaryParsing(children)}</span>,
  strong: ({ node, ...props }) => (
    <strong className="font-bold text-neon-cyan" {...props} />
  ),
  em: ({ node, ...props }) => (
    <em className="text-neon-yellow italic" {...props} />
  ),
  a: ({ node, ...props }) => (
    <a
      className="break-words text-neon-yellow underline underline-offset-2 hover:text-white"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: ({ node, ...props }) => (
    <code
      className="text-neon-pink rounded border border-zinc-800 bg-black/50 px-1.5 py-0.5 font-mono text-xs break-words"
      {...props}
    />
  ),
  table: ({ node, ...props }) => (
    <div className="my-4 w-full overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead
      className="bg-zinc-900/80 font-mono text-xs text-neon-cyan uppercase"
      {...props}
    />
  ),
  th: ({ node, ...props }) => (
    <th
      className="border-b border-zinc-800 px-4 py-3 whitespace-nowrap"
      {...props}
    />
  ),
  td: ({ node, children, ...props }) => (
    <td className="border-b border-zinc-800/50 px-4 py-3" {...props}>{withGlossaryParsing(children)}</td>
  ),
  li: ({ node, children, ...props }) => (
    <li {...props}>{withGlossaryParsing(children)}</li>
  ),
}
/* eslint-enable @typescript-eslint/no-unused-vars */
