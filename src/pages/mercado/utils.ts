import { normalizar, slug } from '@/lib/utils'
import type { Grupo, Item, ItemDados, Notas } from './types'

const porNome = (a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome, 'pt-BR')

const porPrioridade = (a: Item, b: Item) =>
  Number(Boolean(b.prioridade)) - Number(Boolean(a.prioridade)) || porNome(a, b)

export const agruparPorCategoria = (itens: Item[]): Grupo[] => {
  const grupos = new Map<string, Grupo>()
  itens.forEach((item) => {
    const chave = slug(item.categoria)
    const grupo = grupos.get(chave) ?? { slug: chave, nome: item.categoria, itens: [] }
    grupo.itens.push(item)
    grupos.set(chave, grupo)
  })
  return [...grupos.values()]
    .map((grupo) => ({ ...grupo, itens: [...grupo.itens].sort(porPrioridade) }))
    .sort(porNome)
}

export const buscarItens = (itens: Item[], busca: string) => {
  const termo = normalizar(busca)
  return itens.filter(({ nome, categoria }) => normalizar(`${nome} ${categoria}`).includes(termo))
}

export const chaveItem = ({ nome, categoria }: ItemDados) => [slug(categoria), slug(nome)].join('|')

export const avisosPorCategoria = (grupos: Grupo[]) =>
  new Map(
    grupos.flatMap(({ slug: chave, itens }) => {
      const aviso = itens.find(({ avisarAposDias }) => avisarAposDias)?.avisarAposDias
      return aviso ? [[chave, aviso] as const] : []
    }),
  )

const linhaDoItem = ({ nome, quantidade, prioridade }: Item) =>
  [prioridade ? '⭐' : '•', nome, quantidade && `(${quantidade})`].filter(Boolean).join(' ')

export const textoDaLista = (grupos: Grupo[], notas: Notas) =>
  [
    '*Lista do mercado*',
    ...grupos.map(({ slug: chave, nome, itens }) =>
      [`*${nome}*`, notas[chave] && `_${notas[chave]}_`, ...itens.map(linhaDoItem)]
        .filter(Boolean)
        .join('\n'),
    ),
  ].join('\n\n')
