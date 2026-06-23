import * as React from "react"
import { Sparkles, Clock } from "lucide-react"

export default function CatalystsPage() {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black uppercase tracking-wider text-neon-cyan">
          Exotic Catalysts
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-3xl">
          Tra cứu hiệu ứng nâng cấp (Catalyst) của các vũ khí Exotic, cách lấy và yêu cầu mở khóa.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
          <Sparkles className="w-9 h-9 text-zinc-500" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Clock className="w-4 h-4" />
            <span>COMING SOON</span>
          </div>
          <p className="text-zinc-600 font-mono text-xs max-w-sm">
            Dữ liệu Catalyst đang được cập nhật từ Bungie API.
          </p>
        </div>
      </div>
    </div>
  )
}
