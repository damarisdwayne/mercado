import { nanoid } from 'nanoid'

const CHAVE = 'mercado:lista'
const PARAMETRO = 'lista'
const TAMANHO = 20
const FORMATO = /^[A-Za-z0-9_-]{12,40}$/

export const codigoDe = (texto: string) => {
  const limpo = texto.trim()
  const candidato = limpo.includes(`${PARAMETRO}=`)
    ? (new URLSearchParams(limpo.slice(limpo.indexOf('?')).split('#')[0]).get(PARAMETRO) ?? '')
    : limpo
  return FORMATO.test(candidato) ? candidato : undefined
}

export const linkDaLista = (codigo: string) => `${window.location.origin}/?${PARAMETRO}=${codigo}`

const guardado = () => {
  try {
    return codigoDe(window.localStorage.getItem(CHAVE) ?? '')
  } catch {
    return undefined
  }
}

export const guardarCodigo = (codigo: string) => {
  window.history.replaceState(null, '', `?${PARAMETRO}=${codigo}`)
  try {
    window.localStorage.setItem(CHAVE, codigo)
  } catch {
    return
  }
}

export const codigoInicial = () => codigoDe(window.location.search) ?? guardado() ?? nanoid(TAMANHO)
