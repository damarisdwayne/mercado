import { useMemo, useState } from 'react'
import { Circle, Minus, Plus, SearchX, Sparkles } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { FiltroChips } from '@/components/filtro-chips'
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

const BARRA_FIXA =
  'sticky z-[5] -mx-4 -my-2 flex flex-col gap-2 bg-background px-4 py-2 md:-mx-6 md:px-6'
const TOPO_DA_BARRA = { top: 'calc(3.5rem + env(safe-area-inset-top))' }

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
  const [categoria, setCategoria] = useState<string>()
  const encontrados = useMemo(
    () => agruparPorCategoria(termo ? buscarItens(itens, termo) : itens),
    [itens, termo],
  )
  const filtros = useMemo(
    () =>
      encontrados.map(({ slug, nome, itens: doGrupo }) => ({
        id: slug,
        rotulo: nome,
        contagem: doGrupo.length,
      })),
    [encontrados],
  )
  const grupoAtivo = encontrados.find(({ slug }) => slug === categoria)
  const grupos = grupoAtivo ? [grupoAtivo] : encontrados

  const filtrar = (slug?: string) => {
    setCategoria(slug)
    window.scrollTo({ top: 0 })
  }

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
      <div className={BARRA_FIXA} style={TOPO_DA_BARRA}>
        <div className="flex items-center gap-2">
          <SearchField value={busca} onChange={setBusca} placeholder="Buscar ou adicionar item" />
          <Button onClick={() => onNovo(termo, grupoAtivo?.nome)}>
            <Plus size={16} />
            Novo
          </Button>
        </div>
        {filtros.length > 1 && (
          <FiltroChips
            rotulo="Filtrar por categoria"
            rotuloTodas="Todas"
            opcoes={filtros}
            ativa={grupoAtivo?.slug}
            onChange={filtrar}
          />
        )}
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
