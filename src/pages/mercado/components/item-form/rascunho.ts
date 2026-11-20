import { opcional, slug } from '@/lib/utils'
import type { Item, ItemDados } from '../../types'

export type Rascunho = {
  nome: string
  categoria: string
  quantidade: string
  aviso: string
  prioridade: boolean
}

export type Avisos = Map<string, number>

const avisoDe = (avisos: Avisos, categoria: string) => String(avisos.get(slug(categoria)) ?? '')

export const rascunhoDe = (item?: Item, nomePadrao = ''): Rascunho => ({
  nome: item?.nome ?? nomePadrao,
  categoria: item?.categoria ?? '',
  quantidade: item?.quantidade ?? '',
  aviso: item?.avisarAposDias ? String(item.avisarAposDias) : '',
  prioridade: Boolean(item?.prioridade),
})

export const comCategoria = (rascunho: Rascunho, categoria: string, avisos: Avisos): Rascunho => {
  const seguiaSugestao = rascunho.aviso === avisoDe(avisos, rascunho.categoria)
  return {
    ...rascunho,
    categoria,
    aviso: seguiaSugestao ? avisoDe(avisos, categoria) : rascunho.aviso,
  }
}

export const podeSalvar = ({ nome, categoria }: Rascunho) =>
  Boolean(nome.trim() && categoria.trim())

const diasDe = (texto: string) => {
  const dias = Math.floor(Number(texto))
  return dias >= 1 ? dias : undefined
}

export const dadosDe = (rascunho: Rascunho): ItemDados => ({
  nome: rascunho.nome.trim(),
  categoria: rascunho.categoria.trim(),
  quantidade: opcional(rascunho.quantidade),
  prioridade: rascunho.prioridade || undefined,
  avisarAposDias: diasDe(rascunho.aviso),
})
