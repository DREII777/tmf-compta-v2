import { Icon, type IconName } from './Icon'

interface StatProps {
  value: string
  label: string
  icon?: IconName
  className?: string
}

export function Stat({ value, label, icon, className }: StatProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ''}`}>
      {icon && <Icon name={icon} size={22} className="text-brand" />}
      <span className="tnum font-display text-3xl wonk text-brand md:text-4xl">{value}</span>
      <span className="text-sm text-ink-2">{label}</span>
    </div>
  )
}
