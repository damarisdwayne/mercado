import { useState } from 'react'
import { Check, Trash } from 'lucide-react'
import { Button, DialogFooter } from '@/components/ui'
import type { Item, ItemDados } from '../../types'
import { Campos } from './campos'
import { comCategoria, dadosDe, rascunhoDe, type Avisos, type Rascunho } from './rascunho'

type ItemFormProps = {
  item?: Item
  nomePadrao?: string
  categoriaPadrao?: string
  categorias: string[]
  avisos: Avisos
  onSalvar: (lista: ItemDados[]) => void
  onRemover?: () => void
}

export const ItemForm = ({
  item,
  nomePadrao,
  categoriaPadrao = '',
  categorias,
  avisos,
  onSalvar,
  onRemover,
}: ItemFormProps) => {
  const [rascunho, setRascunho] = useState(() =>
    item ? rascunhoDe(item) : comCategoria(rascunhoDe(item, nomePadrao), categoriaPadrao, avisos),
  )
  const lista = dadosDe(rascunho, !item)
  const valido = lista.length > 0

  const alterar = (alteracao: Partial<Rascunho>) =>
    setRascunho((atual) => ({ ...atual, ...alteracao }))

  const alterarCategoria = (categoria: string) =>
    setRascunho((atual) =>
      item ? { ...atual, categoria } : comCategoria(atual, categoria, avisos),
    )

  const remover = () => {
    if (window.confirm(`Excluir ${rascunho.nome || 'este item'}?`)) onRemover?.()
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (valido) onSalvar(lista)
      }}
    >
      <Campos
        rascunho={rascunho}
        varios={!item}
        categorias={categorias}
        onChange={alterar}
        onCategoria={alterarCategoria}
      />
      <DialogFooter>
        {onRemover && (
          <Button variant="destructive" onClick={remover} aria-label="Excluir">
            <Trash size={16} />
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={!valido}>
          <Check size={16} />
          {lista.length > 1 ? `Adicionar ${lista.length} itens` : 'Salvar'}
        </Button>
      </DialogFooter>
    </form>
  )
}
