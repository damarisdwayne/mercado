import type { ReactNode } from 'react'
import { Info, MessageSquarePlus } from 'lucide-react'
import { Button } from '@/components/ui'

type SecaoListaProps = {
  titulo: string
  contagem: number
  nota?: string
  onEditarNota?: () => void
  children: ReactNode
}

export const SecaoLista = ({ titulo, contagem, nota, onEditarNota, children }: SecaoListaProps) => (
  <section className="flex flex-col gap-2">
    <div className="flex min-h-9 items-center gap-2 px-1">
      <h2 className="flex flex-1 items-baseline gap-2 text-sm font-semibold text-foreground">
        {titulo}
        <span className="text-xs font-normal text-muted-foreground">{contagem}</span>
      </h2>
      {onEditarNota && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onEditarNota}
          aria-label={`Observação de ${titulo}`}
        >
          <MessageSquarePlus size={16} />
        </Button>
      )}
    </div>
    {nota && (
      <p className="flex gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-foreground">
        <Info size={14} className="mt-px shrink-0 text-primary" />
        {nota}
      </p>
    )}
    <ul className="grid gap-2 sm:grid-cols-2">{children}</ul>
  </section>
)
