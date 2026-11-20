import { Star } from 'lucide-react'
import { Campo } from '@/components/campo'
import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Rascunho } from './rascunho'

type CamposProps = {
  rascunho: Rascunho
  varios: boolean
  categorias: string[]
  onChange: (alteracao: Partial<Rascunho>) => void
  onCategoria: (categoria: string) => void
}

export const Campos = ({ rascunho, varios, categorias, onChange, onCategoria }: CamposProps) => (
  <div className="flex flex-col gap-4">
    <Campo
      id="item-nome"
      rotulo="Nome"
      ajuda={varios ? 'Para adicionar vários de uma vez, separe por vírgula.' : undefined}
    >
      <Input
        id="item-nome"
        value={rascunho.nome}
        onChange={(event) => onChange({ nome: event.target.value })}
        placeholder={varios ? 'Ex.: Tomate, Cebola, Batata' : 'Ex.: Tomate'}
      />
    </Campo>

    <div className="grid gap-4 sm:grid-cols-2">
      <Campo id="item-categoria" rotulo="Categoria">
        <Input
          id="item-categoria"
          list="item-categoria-opcoes"
          value={rascunho.categoria}
          onChange={(event) => onCategoria(event.target.value)}
          placeholder="Ex.: Legumes"
        />
        <datalist id="item-categoria-opcoes">
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria} />
          ))}
        </datalist>
      </Campo>
      <Campo id="item-quantidade" rotulo="Quantidade">
        <Input
          id="item-quantidade"
          value={rascunho.quantidade}
          onChange={(event) => onChange({ quantidade: event.target.value })}
          placeholder="Ex.: 1 kg"
        />
      </Campo>
    </div>

    <Campo
      id="item-aviso"
      rotulo="Avisar de novo depois de quantos dias"
      ajuda="Conta a partir da última compra. Deixe vazio para itens que você só põe na lista à mão."
    >
      <Input
        id="item-aviso"
        type="number"
        inputMode="numeric"
        min={1}
        value={rascunho.aviso}
        onChange={(event) => onChange({ aviso: event.target.value })}
        placeholder="Ex.: 5"
      />
    </Campo>

    <Button
      variant="outline"
      aria-pressed={rascunho.prioridade}
      onClick={() => onChange({ prioridade: !rascunho.prioridade })}
      className={cn(rascunho.prioridade && 'border-warning/70 bg-warning/10')}
    >
      <Star size={16} className={cn(rascunho.prioridade && 'fill-warning text-warning')} />
      {rascunho.prioridade ? 'É prioridade' : 'Marcar como prioridade'}
    </Button>
  </div>
)
