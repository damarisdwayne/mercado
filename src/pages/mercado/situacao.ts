import type { Item } from './types'

const DIA = 86_400_000

const diasDesde = (iso: string, hoje: number) =>
  Math.max(0, Math.round((hoje - new Date(iso).setHours(0, 0, 0, 0)) / DIA))

export const diasDaUltimaCompra = ({ ultimaCompra }: Item, hoje: number) =>
  ultimaCompra ? diasDesde(ultimaCompra, hoje) : undefined

export const estaNaHora = (item: Item, hoje: number) => {
  const dias = diasDaUltimaCompra(item, hoje)
  return dias !== undefined && item.avisarAposDias !== undefined && dias >= item.avisarAposDias
}

export const precisaComprar = (item: Item, hoje: number) =>
  Boolean(item.naLista) || estaNaHora(item, hoje)

export const compradoHoje = (item: Item, hoje: number) =>
  !precisaComprar(item, hoje) && diasDaUltimaCompra(item, hoje) === 0

const textoCompra = (dias: number) => {
  if (dias === 0) return 'Comprado hoje'
  if (dias === 1) return 'Comprado ontem'
  return `Comprado há ${dias} dias`
}

export const detalheDe = (item: Item, hoje: number) => {
  const dias = diasDaUltimaCompra(item, hoje)
  return [item.quantidade, dias !== undefined && textoCompra(dias)].filter(Boolean).join(' · ')
}
