export type Item = {
  id: string
  nome: string
  categoria: string
  quantidade?: string
  prioridade?: boolean
  avisarAposDias?: number
  ultimaCompra?: string
  naLista?: boolean
  criadoEm: string
}

export type ItemDados = Pick<
  Item,
  'nome' | 'categoria' | 'quantidade' | 'prioridade' | 'avisarAposDias'
>

export type Notas = Record<string, string>

export type Conteudo = {
  itens: Item[]
  notas: Notas
}

export type Grupo = {
  slug: string
  nome: string
  itens: Item[]
}
