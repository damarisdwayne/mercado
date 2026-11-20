import { useMemo, useState } from 'react'
import { Plus, ShoppingBasket, Sparkles, Users } from 'lucide-react'
import { Abas, type OpcaoAba } from '@/components/abas'
import { EmptyState } from '@/components/empty-state'
import { Header } from '@/components/header'
import { Button, PageLoader } from '@/components/ui'
import { useHoje } from '@/hooks/use-hoje'
import {
  AbaComprar,
  AbaItens,
  DialogoItem,
  DialogoLista,
  DialogoNota,
  type Edicao,
} from './components'
import type { Grupo } from './types'
import { precisaComprar } from './situacao'
import { CATEGORIAS_SUGERIDAS, ITENS_SUGERIDOS } from './sugestoes'
import { useCodigoLista } from './use-codigo-lista'
import { useItens } from './use-itens'
import { agruparPorCategoria, avisosPorCategoria, chaveItem } from './utils'

type Aba = 'comprar' | 'itens'

export const MercadoPage = () => {
  const { codigo, trocar } = useCodigoLista()
  const hoje = useHoje()
  const {
    itens,
    notas,
    carregado,
    salvar,
    remover,
    comprar,
    pedir,
    tirar,
    salvarNota,
    adicionarVarios,
  } = useItens(codigo)
  const [aba, setAba] = useState<Aba>('comprar')
  const [edicao, setEdicao] = useState<Edicao>()
  const [listaAberta, setListaAberta] = useState(false)
  const [grupoDaNota, setGrupoDaNota] = useState<Grupo>()

  const grupos = useMemo(() => agruparPorCategoria(itens), [itens])
  const avisos = useMemo(() => avisosPorCategoria(grupos), [grupos])
  const categorias = useMemo(
    () => [...new Set([...grupos.map(({ nome }) => nome), ...CATEGORIAS_SUGERIDAS])],
    [grupos],
  )
  const pendentes = useMemo(
    () => itens.filter((item) => precisaComprar(item, hoje)).length,
    [itens, hoje],
  )

  const faltamSugestoes = useMemo(() => {
    const existentes = new Set(itens.map(chaveItem))
    return ITENS_SUGERIDOS.some((sugestao) => !existentes.has(chaveItem(sugestao)))
  }, [itens])

  const abas: OpcaoAba<Aba>[] = [
    { id: 'comprar', rotulo: 'Comprar', contagem: pendentes },
    { id: 'itens', rotulo: 'Todos os itens' },
  ]
  const editar = (item: Edicao['item']) => setEdicao({ item })

  return (
    <>
      <Header title="Mercado">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setListaAberta(true)}
          aria-label="Compartilhar a lista"
        >
          <Users size={18} />
        </Button>
      </Header>

      {!carregado && <PageLoader />}

      {carregado && (
        <main
          className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-4 md:p-6"
          style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
        >
          {!itens.length && (
            <EmptyState
              icon={ShoppingBasket}
              title="Nenhum item ainda"
              description="Cadastre o que a casa costuma comprar. Cada item pode avisar sozinho quando for hora de comprar de novo."
              action={
                <>
                  <Button size="sm" onClick={() => setEdicao({})}>
                    <Plus size={14} />
                    Novo item
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => adicionarVarios(ITENS_SUGERIDOS)}
                  >
                    <Sparkles size={14} />
                    Começar com sugestões
                  </Button>
                </>
              }
            />
          )}

          {itens.length > 0 && (
            <>
              <Abas opcoes={abas} ativa={aba} onChange={setAba} />
              {aba === 'comprar' && (
                <AbaComprar
                  itens={itens}
                  notas={notas}
                  hoje={hoje}
                  onComprar={comprar}
                  onDevolver={pedir}
                  onEditar={editar}
                />
              )}
              {aba === 'itens' && (
                <AbaItens
                  itens={itens}
                  notas={notas}
                  onEditarNota={setGrupoDaNota}
                  hoje={hoje}
                  onComprar={comprar}
                  onPedir={pedir}
                  onTirar={tirar}
                  onEditar={editar}
                  onNovo={(nome) => setEdicao({ nome })}
                  onSugerir={faltamSugestoes ? () => adicionarVarios(ITENS_SUGERIDOS) : undefined}
                />
              )}
            </>
          )}
        </main>
      )}

      <DialogoItem
        edicao={edicao}
        categorias={categorias}
        avisos={avisos}
        onSalvar={salvar}
        onRemover={remover}
        onFechar={() => setEdicao(undefined)}
      />
      <DialogoNota
        grupo={grupoDaNota}
        nota={grupoDaNota ? (notas[grupoDaNota.slug] ?? '') : ''}
        onSalvar={salvarNota}
        onFechar={() => setGrupoDaNota(undefined)}
      />
      <DialogoLista
        aberto={listaAberta}
        codigo={codigo}
        totalItens={itens.length}
        onTrocar={trocar}
        onFechar={() => setListaAberta(false)}
      />
    </>
  )
}
