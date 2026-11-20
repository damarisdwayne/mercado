import { Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export type OpcaoAba<T extends string> = {
  id: T
  rotulo: string
  contagem?: number
}

type AbasProps<T extends string> = {
  opcoes: OpcaoAba<T>[]
  ativa: T
  onChange: (aba: T) => void
}

export const Abas = <T extends string>({ opcoes, ativa, onChange }: AbasProps<T>) => (
  <div role="tablist" className="grid auto-cols-fr grid-flow-col gap-1 rounded-lg bg-muted p-1">
    {opcoes.map(({ id, rotulo, contagem }) => (
      <button
        key={id}
        type="button"
        role="tab"
        aria-selected={id === ativa}
        onClick={() => onChange(id)}
        className={cn(
          'flex h-9 items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60',
          id === ativa && 'bg-card text-foreground shadow-sm',
        )}
      >
        {rotulo}
        {Boolean(contagem) && <Badge>{contagem}</Badge>}
      </button>
    ))}
  </div>
)
