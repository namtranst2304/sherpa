export interface GlossaryTerm {
  id: string
  term: string
  aliases?: string[]
  type: 'buff' | 'debuff' | 'mechanic' | 'tactic'
  short_desc: string
  full_desc?: string
}

export const DESTINY_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'radiant',
    term: 'Radiant',
    type: 'buff',
    short_desc: 'Tăng 25% sát thương vũ khí trong PvE.',
    full_desc: 'Radiant là buff hệ Solar, cho phép vũ khí xuyên qua khiên Barrier Champion. Cộng dồn với các buff debuff khác nhưng không stack với các Empowering buff khác (như Well of Radiance).',
  },
  {
    id: 'scorch',
    term: 'Scorch',
    aliases: ['Scorched'],
    type: 'debuff',
    short_desc: 'Gây sát thương thiêu đốt theo thời gian.',
    full_desc: 'Debuff hệ Solar. Kẻ địch bị dính Scorch sẽ nhận sát thương qua thời gian. Nếu dính đủ 100 stacks Scorch, chúng sẽ Ignite (phát nổ).',
  },
  {
    id: 'ignite',
    term: 'Ignite',
    aliases: ['Ignition'],
    type: 'mechanic',
    short_desc: 'Vụ nổ AOE hệ Solar gây sát thương cực lớn.',
    full_desc: 'Kích hoạt khi kẻ địch đạt 100 stacks Scorch. Có khả năng stagger Unstoppable Champions.',
  },
  {
    id: 'jolt',
    term: 'Jolt',
    aliases: ['Jolted'],
    type: 'debuff',
    short_desc: 'Truyền tia sét sang các mục tiêu lân cận khi bị nhận sát thương.',
    full_desc: 'Debuff hệ Arc. Có thể làm choáng (stun) Overload Champions.',
  },
  {
    id: 'volatile',
    term: 'Volatile',
    type: 'debuff',
    short_desc: 'Gây nổ Void AOE sau khi nhận thêm sát thương.',
    full_desc: 'Debuff hệ Void. Xuyên khiên Barrier Champions (với Volatile Rounds).',
  },
  {
    id: 'suppress',
    term: 'Suppress',
    aliases: ['Suppressed', 'Suppression'],
    type: 'debuff',
    short_desc: 'Ngăn mục tiêu sử dụng kỹ năng.',
    full_desc: 'Debuff hệ Void. Ngăn quái xài chiêu và làm choáng Overload Champions.',
  },
  {
    id: 'weaken',
    term: 'Weaken',
    aliases: ['Weakened'],
    type: 'debuff',
    short_desc: 'Làm mục tiêu nhận thêm 15% sát thương (30% với Tether/Tractor Cannon).',
    full_desc: 'Debuff hệ Void. Góp phần quan trọng trong các pha DPS Boss.',
  },
  {
    id: 'tether',
    term: 'Tether',
    aliases: ['Shadowshot'],
    type: 'debuff',
    short_desc: 'Super của Hunter Void, trói và Weaken quái (nhận thêm 30% dmg).',
  },
  {
    id: 'well',
    term: 'Well of Radiance',
    aliases: ['Well'],
    type: 'buff',
    short_desc: 'Super của Warlock Solar, cung cấp hồi máu liên tục và Radiant.',
  },
  {
    id: 'wipe',
    term: 'Wipe',
    aliases: ['Wiping'],
    type: 'tactic',
    short_desc: 'Chết toàn team để làm lại Encounter từ đầu.',
  },
  {
    id: 'enrage',
    term: 'Enrage',
    aliases: ['Enraged'],
    type: 'mechanic',
    short_desc: 'Trạng thái cuồng nộ của Boss khi hết thời gian.',
    full_desc: 'Khi Boss Enrage, team sẽ lập tức bị Wipe nếu không giết Boss ngay lập tức.',
  },
  {
    id: 'dps',
    term: 'DPS Phase',
    aliases: ['DPS'],
    type: 'mechanic',
    short_desc: 'Giai đoạn xả sát thương vào Boss.',
  },
  {
    id: 'adds',
    term: 'Adds',
    aliases: ['Add', 'Add clear'],
    type: 'tactic',
    short_desc: 'Quái nhỏ (Additional enemies). Dọn Adds là nhiệm vụ giết quái.',
  },
]
