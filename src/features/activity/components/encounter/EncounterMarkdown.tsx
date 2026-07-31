import { Components } from "react-markdown"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const markdownComponents: Components = {
  p: ({ node, ...props }) => <span className="break-words" {...props} />,
  strong: ({ node, ...props }) => <strong className="text-neon-cyan font-bold" {...props} />,
  em: ({ node, ...props }) => <em className="text-neon-yellow italic" {...props} />,
  a: ({ node, ...props }) => <a className="text-neon-yellow underline underline-offset-2 hover:text-white break-words" target="_blank" rel="noreferrer" {...props} />,
  code: ({ node, ...props }) => <code className="bg-black/50 text-neon-pink px-1.5 py-0.5 rounded text-xs border border-zinc-800 font-mono break-words" {...props} />,
  table: ({ node, ...props }) => (
    <div className="w-full overflow-x-auto my-4 border border-zinc-800 rounded-lg">
      <table className="w-full text-sm text-left" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-zinc-900/80 text-neon-cyan font-mono uppercase text-xs" {...props} />,
  th: ({ node, ...props }) => <th className="px-4 py-3 border-b border-zinc-800 whitespace-nowrap" {...props} />,
  td: ({ node, ...props }) => <td className="px-4 py-3 border-b border-zinc-800/50" {...props} />
}
/* eslint-enable @typescript-eslint/no-unused-vars */
