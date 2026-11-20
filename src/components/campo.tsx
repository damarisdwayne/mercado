import type { ReactNode } from 'react'
import { Label } from '@/components/ui'

type CampoProps = {
  id: string
  rotulo: string
  ajuda?: string
  children: ReactNode
}

export const Campo = ({ id, rotulo, ajuda, children }: CampoProps) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={id}>{rotulo}</Label>
    {children}
    {ajuda && <p className="text-xs text-muted-foreground">{ajuda}</p>}
  </div>
)
