import { useMemo, useState } from 'react'
import { Circle, Minus, Plus, SearchX, Sparkles } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { SearchField } from '@/components/search-field'
import { Button } from '@/components/ui'
import { estaNaHora } from '../situacao'
import type { Grupo, Item, Notas } from '../types'
import { agruparPorCategoria, buscarItens } from '../utils'
import { LinhaItem, type AcaoLinha } from './linha-item'
import { SecaoLista } from './secao-lista'

type AbaItensProps = {
  itens: Item[]
  notas: Notas
  hoje: number
  onComprar: (item: Item) => void
  onPedir: (item: Item) => void
  onTirar: (item: Item) => void
  onEditar: (item: Item) => void
  onNovo: (nome: string, categoria?: string) => void
  onSugerir?: () => void
  onEditarNota: (grupo: Grupo) => void
}

export const AbaItens = ({
  itens,
  notas,
  hoje,
  onComprar,
  onPedir,
  onTirar,
  onEditar,
  onNovo,
  onSugerir,
  onEditarNota,
}: AbaItensProps) => {
  const [busca, setBusca] = useState('')
  const termo = busca.trim()
  const grupos = useMemo(
    () => agruparPorCategoria(termo ? buscarItens(itens, termo) : itens),
    [itens, termo],
  )

  const acaoComprar: AcaoLinha = {
    icone: Circle,
    rotulo: 'Marcar como comprado',
    executar: onComprar,
  }
  const acaoPedir: AcaoLinha = { icone: Plus, rotulo: 'Pôr na lista', executar: onPedir }
  const acaoTirar: AcaoLinha = { icone: Minus, rotulo: 'Tirar da lista', executar: onTirar }

  const acaoDe = (item: Item) => {
    if (estaNaHora(item, hoje)) return acaoComprar
    return item.naLista ? acaoTirar : acaoPedir
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <SearchField value={busca} onChange={setBusca} placeholder="Buscar ou adicionar item" />
        <Button onClick={() => onNovo(termo)}>
          <Plus size={16} />
          Novo
        </Button>
      </div>

      {!grupos.length && (
        <EmptyState
          icon={SearchX}
          title={`Nada encontrado para "${termo}"`}
          description="Toque em Novo para cadastrar este item."
        />
      )}

      {grupos.map((grupo) => (
        <SecaoLista
          key={grupo.slug}
          titulo={grupo.nome}
          contagem={grupo.itens.length}
          nota={notas[grupo.slug]}
          onEditarNota={() => onEditarNota(grupo)}
          onAdicionar={() => onNovo('', grupo.nome)}
        >
          {grupo.itens.map((item) => {
            const acao = acaoDe(item)
            return (
              <LinhaItem
                key={item.id}
                item={item}
                hoje={hoje}
                acao={acao}
                selo={acao === acaoPedir ? undefined : 'Na lista'}
                onEditar={onEditar}
              />
            )
          })}
        </SecaoLista>
      ))}

      {onSugerir && !termo && (
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={onSugerir}>
            <Sparkles size={14} />
            Adicionar sugestões que faltam
          </Button>
        </div>
      )}
    </>
  )
}
