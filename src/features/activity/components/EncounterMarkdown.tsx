import { Components } from "react-markdown"

/* eslint-disable @typescript-eslint/no-unused-vars */
export const markdownComponents: Components = {
  p: ({ node, ...props }) => <span {...props} />,
  strong: ({ node, ...props }) => <strong className="text-neon-cyan font-bold" {...props} />,
  em: ({ node, ...props }) => <em className="text-neon-yellow italic" {...props} />,
  a: ({ node, ...props }) => <a className="text-neon-yellow underline underline-offset-2 hover:text-white" target="_blank" rel="noreferrer" {...props} />,
  code: ({ node, ...props }) => <code className="bg-black/50 text-neon-pink px-1.5 py-0.5 rounded text-xs border border-zinc-800 font-mono" {...props} />
}
/* eslint-enable @typescript-eslint/no-unused-vars */
