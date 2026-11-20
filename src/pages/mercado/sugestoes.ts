import type { ItemDados, Notas } from './types'

type Sugestao = {
  categoria: string
  avisarAposDias: number
  nomes: string[]
}

const AVISO_SEMANAL = 5
const AVISO_MENSAL = 30

const SUGESTOES: Sugestao[] = [
  {
    categoria: 'Frutas',
    avisarAposDias: AVISO_SEMANAL,
    nomes: ['Banana', 'Maçã', 'Mamão', 'Laranja', 'Limão'],
  },
  {
    categoria: 'Verduras',
    avisarAposDias: AVISO_SEMANAL,
    nomes: ['Alface', 'Couve', 'Cheiro-verde'],
  },
  {
    categoria: 'Legumes',
    avisarAposDias: AVISO_SEMANAL,
    nomes: ['Tomate', 'Cebola', 'Batata', 'Cenoura', 'Abobrinha'],
  },
  {
    categoria: 'Mercearia',
    avisarAposDias: AVISO_MENSAL,
    nomes: ['Açúcar', 'Arroz', 'Feijão', 'Aveia'],
  },
]

export const NOTAS_SUGERIDAS: Notas = {
  frutas: 'Não precisa comprar todas: escolha só 2, entre as melhores opções que tiver no mercado.',
}

export const CATEGORIAS_SUGERIDAS = [
  ...SUGESTOES.map(({ categoria }) => categoria),
  'Padaria',
  'Laticínios',
  'Carnes',
  'Bebidas',
  'Limpeza',
  'Higiene',
]

export const ITENS_SUGERIDOS: ItemDados[] = SUGESTOES.flatMap(
  ({ categoria, avisarAposDias, nomes }) =>
    nomes.map((nome) => ({ nome, categoria, avisarAposDias })),
)
