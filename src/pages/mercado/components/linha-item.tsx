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
        'flex items-center gap-1 rounded-lg border border-border bg-card py-1 pl-1 pr-2',
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
      <div className="min-w-0 flex-1">
        <p
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
        </p>
        {detalhe && (
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            {naHora && <Clock size={12} className="shrink-0 text-warning" />}
            {detalhe}
          </p>
        )}
      </div>
      {selo && <Badge>{selo}</Badge>}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEditar(item)}
        aria-label={`Editar ${item.nome}`}
      >
        <Pencil size={16} />
      </Button>
    </li>
  )
}
