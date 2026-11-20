import { Clock, Pencil, Star, type LucideIcon } from 'lucide-react'
import { Badge, Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { detalheDe, estaNaHora } from '../situacao'
import type { Item } from '../types'

export type AcaoLinha = {
  icone: LucideIcon
  rotulo: string
  executar: (item: Item) => void
}

type LinhaItemProps = {
  item: Item
  hoje: number
  acao: AcaoLinha
  selo?: string
  riscado?: boolean
  onEditar: (item: Item) => void
}

export const LinhaItem = ({ item, hoje, acao, selo, riscado, onEditar }: LinhaItemProps) => {
  const { icone: Icone, rotulo, executar } = acao
  const detalhe = detalheDe(item, hoje)
  const naHora = estaNaHora(item, hoje)

  return (
    <li
      className={cn(
        'flex items-center gap-1 rounded-lg border border-border bg-card p-1',
        item.prioridade && !riscado && 'border-warning/70 bg-warning/5',
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn('h-11 w-11', riscado && 'text-primary')}
        onClick={() => executar(item)}
        aria-label={`${rotulo}: ${item.nome}`}
      >
        <Icone size={22} />
      </Button>
      <Button
        variant="ghost"
        className="h-auto min-h-11 min-w-0 flex-1 justify-start gap-2 px-1 py-1 text-left font-normal"
        onClick={() => onEditar(item)}
        aria-label={`Editar ${item.nome}`}
      >
        <span className="flex min-w-0 flex-1 flex-col">
          <span
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium text-foreground',
              riscado && 'text-muted-foreground line-through',
            )}
          >
            <span className="truncate">{item.nome}</span>
            {item.prioridade && (
              <Star
                size={12}
                className="shrink-0 fill-warning text-warning"
                aria-label="Prioridade"
              />
            )}
          </span>
          {detalhe && (
            <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              {naHora && <Clock size={12} className="shrink-0 text-warning" />}
              {detalhe}
            </span>
          )}
        </span>
        {selo && <Badge>{selo}</Badge>}
        <Pencil size={16} className="mx-1 shrink-0" />
      </Button>
    </li>
  )
}
