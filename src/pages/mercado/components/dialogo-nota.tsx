import { useState } from 'react'
import { Check } from 'lucide-react'
import { Campo } from '@/components/campo'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui'
import type { Grupo } from '../types'

type FormularioNotaProps = {
  inicial: string
  onSalvar: (nota: string) => void
}

const FormularioNota = ({ inicial, onSalvar }: FormularioNotaProps) => {
  const [nota, setNota] = useState(inicial)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSalvar(nota.trim())
      }}
    >
      <Campo
        id="nota-categoria"
        rotulo="Observação"
        ajuda="Aparece no topo da categoria, na lista de compras. Deixe vazio para tirar."
      >
        <Input
          id="nota-categoria"
          value={nota}
          onChange={(event) => setNota(event.target.value)}
          placeholder="Ex.: escolher só 2, as melhores do dia"
        />
      </Campo>
      <DialogFooter>
        <Button type="submit" className="flex-1">
          <Check size={16} />
          Salvar
        </Button>
      </DialogFooter>
    </form>
  )
}

type DialogoNotaProps = {
  grupo?: Grupo
  nota: string
  onSalvar: (categoria: string, nota: string) => void
  onFechar: () => void
}

export const DialogoNota = ({ grupo, nota, onSalvar, onFechar }: DialogoNotaProps) => (
  <Dialog open={Boolean(grupo)} onOpenChange={(aberto) => !aberto && onFechar()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Observação de {grupo?.nome}</DialogTitle>
        <DialogDescription>Um recado para quem for fazer a compra.</DialogDescription>
      </DialogHeader>
      {grupo && (
        <FormularioNota
          inicial={nota}
          onSalvar={(texto) => {
            onSalvar(grupo.slug, texto)
            onFechar()
          }}
        />
      )}
    </DialogContent>
  </Dialog>
)
