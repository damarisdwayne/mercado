import { useState } from 'react'
import { Check, Trash } from 'lucide-react'
import { Button, DialogFooter } from '@/components/ui'
import type { Item, ItemDados } from '../../types'
import { Campos } from './campos'
import {
  comCategoria,
  dadosDe,
  podeSalvar,
  rascunhoDe,
  type Avisos,
  type Rascunho,
} from './rascunho'

type ItemFormProps = {
  item?: Item
  nomePadrao?: string
  categorias: string[]
  avisos: Avisos
  onSalvar: (dados: ItemDados) => void
  onRemover?: () => void
}

export const ItemForm = ({
  item,
  nomePadrao,
  categorias,
  avisos,
  onSalvar,
  onRemover,
}: ItemFormProps) => {
  const [rascunho, setRascunho] = useState(() => rascunhoDe(item, nomePadrao))
  const valido = podeSalvar(rascunho)

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
        if (valido) onSalvar(dadosDe(rascunho))
      }}
    >
      <Campos
        rascunho={rascunho}
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
          Salvar
        </Button>
      </DialogFooter>
    </form>
  )
}
