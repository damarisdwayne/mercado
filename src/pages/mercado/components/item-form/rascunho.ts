import { normalizar, opcional, slug } from '@/lib/utils'
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

const SEPARADOR_DE_NOMES = /[,;\n]+/

export const rascunhoDe = (item?: Item, nomePadrao = ''): Rascunho => ({
  nome: item?.nome ?? nomePadrao,
  categoria: item?.categoria ?? '',
  quantidade: item?.quantidade ?? '',
  aviso: item?.avisarAposDias ? String(item.avisarAposDias) : '',
  prioridade: Boolean(item?.prioridade),
})

const nomesDe = (texto: string) => {
  const vistos = new Set<string>()
  return texto
    .split(SEPARADOR_DE_NOMES)
    .map((nome) => nome.trim())
    .filter((nome) => {
      const chave = normalizar(nome)
      if (!chave || vistos.has(chave)) return false
      vistos.add(chave)
      return true
    })
}

export const comCategoria = (rascunho: Rascunho, categoria: string, avisos: Avisos): Rascunho => {
  const seguiaSugestao = rascunho.aviso === avisoDe(avisos, rascunho.categoria)
  return {
    ...rascunho,
    categoria,
    aviso: seguiaSugestao ? avisoDe(avisos, categoria) : rascunho.aviso,
  }
}

const diasDe = (texto: string) => {
  const dias = Math.floor(Number(texto))
  return dias >= 1 ? dias : undefined
}

export const dadosDe = (rascunho: Rascunho, varios: boolean): ItemDados[] => {
  const categoria = rascunho.categoria.trim()
  if (!categoria) return []
  const nomes = varios ? nomesDe(rascunho.nome) : [rascunho.nome.trim()].filter(Boolean)
  return nomes.map((nome) => ({
    nome,
    categoria,
    quantidade: opcional(rascunho.quantidade),
    prioridade: rascunho.prioridade || undefined,
    avisarAposDias: diasDe(rascunho.aviso),
  }))
}
