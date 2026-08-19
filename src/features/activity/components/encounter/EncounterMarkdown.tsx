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
  blockquote: ({ node, ...props }) => (
    <blockquote className="my-4 border-l-4 border-neon-cyan bg-neon-cyan/5 px-4 py-2 italic text-zinc-300" {...props} />
  ),
  ul: ({ node, ...props }) => (
    <ul className="my-2 space-y-1 pl-5 list-disc text-zinc-300" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="my-2 space-y-1 pl-5 list-decimal text-zinc-300" {...props} />
  ),
  h1: ({ node, ...props }) => <h1 className="mt-6 mb-2 text-2xl font-bold text-neon-cyan" {...props} />,
  h2: ({ node, ...props }) => <h2 className="mt-5 mb-2 text-xl font-bold text-neon-cyan" {...props} />,
  h3: ({ node, ...props }) => <h3 className="mt-4 mb-2 text-lg font-bold text-neon-cyan" {...props} />,
  h4: ({ node, ...props }) => <h4 className="mt-3 mb-1 text-base font-bold text-zinc-100" {...props} />,
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
