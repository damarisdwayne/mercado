import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui'
import type { Item, ItemDados } from '../types'
import { ItemForm } from './item-form'
import type { Avisos } from './item-form/rascunho'

export type Edicao = {
  item?: Item
  nome?: string
  categoria?: string
}

type DialogoItemProps = {
  edicao?: Edicao
  categorias: string[]
  avisos: Avisos
  onSalvar: (dados: ItemDados, existente: Item) => void
  onAdicionar: (lista: ItemDados[]) => void
  onRemover: (id: string) => void
  onFechar: () => void
}

export const DialogoItem = ({
  edicao,
  categorias,
  avisos,
  onSalvar,
  onAdicionar,
  onRemover,
  onFechar,
}: DialogoItemProps) => {
  const item = edicao?.item

  return (
    <Dialog open={Boolean(edicao)} onOpenChange={(aberto) => !aberto && onFechar()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'Editar item' : 'Novo item'}</DialogTitle>
          <DialogDescription>
            {item
              ? 'Ajuste o nome, a categoria e o aviso de recompra.'
              : 'O que você adicionar já entra na lista de compras.'}
          </DialogDescription>
        </DialogHeader>
        {edicao && (
          <ItemForm
            item={item}
            nomePadrao={edicao.nome}
            categoriaPadrao={edicao.categoria}
            categorias={categorias}
            avisos={avisos}
            onSalvar={(lista) => {
              if (item) onSalvar(lista[0], item)
              else onAdicionar(lista)
              onFechar()
            }}
            onRemover={
              item &&
              (() => {
                onRemover(item.id)
                onFechar()
              })
            }
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
