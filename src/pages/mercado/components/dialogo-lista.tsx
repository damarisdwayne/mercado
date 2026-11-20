import { useState } from 'react'
import { Check, LogIn, Share2 } from 'lucide-react'
import { Campo } from '@/components/campo'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from '@/components/ui'
import { useCompartilhar } from '@/hooks/use-compartilhar'
import { codigoDe, linkDaLista } from '../codigo-lista'

type DialogoListaProps = {
  aberto: boolean
  codigo: string
  totalItens: number
  onTrocar: (codigo: string) => void
  onFechar: () => void
}

export const DialogoLista = ({
  aberto,
  codigo,
  totalItens,
  onTrocar,
  onFechar,
}: DialogoListaProps) => {
  const { copiado, enviar } = useCompartilhar()
  const [colado, setColado] = useState('')
  const link = linkDaLista(codigo)
  const outro = codigoDe(colado)
  const podeTrocar = Boolean(outro) && outro !== codigo

  const trocar = () => {
    if (!outro) return
    const aviso = `Este aparelho passa a usar a outra lista. A lista atual, com ${totalItens} itens, só volta pelo link dela. Continuar?`
    if (totalItens > 0 && !window.confirm(aviso)) return
    onTrocar(outro)
    setColado('')
    onFechar()
  }

  return (
    <Dialog open={aberto} onOpenChange={(estado) => !estado && onFechar()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lista compartilhada</DialogTitle>
          <DialogDescription>
            Quem abrir este link vê e edita a mesma lista, sem login. Mande só para quem é da casa.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <Campo id="lista-link" rotulo="Link desta lista">
            <div className="flex gap-2">
              <Input
                id="lista-link"
                readOnly
                value={link}
                onFocus={(event) => event.target.select()}
              />
              <Button size="sm" onClick={() => enviar('Lista do mercado', link)}>
                {copiado ? <Check size={14} /> : <Share2 size={14} />}
                {copiado ? 'Copiado' : 'Enviar'}
              </Button>
            </div>
          </Campo>

          <Campo
            id="lista-outra"
            rotulo="Entrar em outra lista"
            ajuda="Cole o link que você recebeu para este aparelho usar a mesma lista."
          >
            <div className="flex gap-2">
              <Input
                id="lista-outra"
                value={colado}
                onChange={(event) => setColado(event.target.value)}
                placeholder="Cole o link aqui"
              />
              <Button size="sm" variant="outline" disabled={!podeTrocar} onClick={trocar}>
                <LogIn size={14} />
                Entrar
              </Button>
            </div>
          </Campo>
        </div>
      </DialogContent>
    </Dialog>
  )
}
