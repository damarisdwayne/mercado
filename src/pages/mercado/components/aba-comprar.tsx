import { useMemo } from 'react'
import { Check, Circle, CircleCheck, Share2, ShoppingBasket } from 'lucide-react'
import { EmptyState } from '@/components/empty-state'
import { Button } from '@/components/ui'
import { useCompartilhar } from '@/hooks/use-compartilhar'
import { compradoHoje, precisaComprar } from '../situacao'
import type { Item, Notas } from '../types'
import { agruparPorCategoria, textoDaLista } from '../utils'
import { LinhaItem, type AcaoLinha } from './linha-item'
import { SecaoLista } from './secao-lista'

type AbaComprarProps = {
  itens: Item[]
  notas: Notas
  hoje: number
  onComprar: (item: Item) => void
  onDevolver: (item: Item) => void
  onEditar: (item: Item) => void
}

export const AbaComprar = ({
  itens,
  notas,
  hoje,
  onComprar,
  onDevolver,
  onEditar,
}: AbaComprarProps) => {
  const { copiado, enviar } = useCompartilhar()
  const grupos = useMemo(
    () => agruparPorCategoria(itens.filter((item) => precisaComprar(item, hoje))),
    [itens, hoje],
  )
  const comprados = useMemo(() => itens.filter((item) => compradoHoje(item, hoje)), [itens, hoje])

  const acaoComprar: AcaoLinha = {
    icone: Circle,
    rotulo: 'Marcar como comprado',
    executar: onComprar,
  }
  const acaoDevolver: AcaoLinha = {
    icone: CircleCheck,
    rotulo: 'Voltar para a lista',
    executar: onDevolver,
  }

  return (
    <>
      {!grupos.length && (
        <EmptyState
          icon={ShoppingBasket}
          title="Nada para comprar"
          description="Quando um item completar os dias de aviso, ou você colocar algo na lista, ele aparece aqui."
        />
      )}

      {grupos.map(({ slug, nome, itens: daCategoria }) => (
        <SecaoLista key={slug} titulo={nome} contagem={daCategoria.length} nota={notas[slug]}>
          {daCategoria.map((item) => (
            <LinhaItem
              key={item.id}
              item={item}
              hoje={hoje}
              acao={acaoComprar}
              onEditar={onEditar}
            />
          ))}
        </SecaoLista>
      ))}

      {grupos.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => enviar('Lista do mercado', textoDaLista(grupos, notas))}
          >
            {copiado ? <Check size={14} /> : <Share2 size={14} />}
            {copiado ? 'Lista copiada' : 'Enviar lista como texto'}
          </Button>
        </div>
      )}

      {comprados.length > 0 && (
        <SecaoLista titulo="Comprados hoje" contagem={comprados.length}>
          {comprados.map((item) => (
            <LinhaItem
              key={item.id}
              item={item}
              hoje={hoje}
              acao={acaoDevolver}
              riscado
              onEditar={onEditar}
            />
          ))}
        </SecaoLista>
      )}
    </>
  )
}
