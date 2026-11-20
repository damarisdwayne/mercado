import { useEffect, useMemo, useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
import { servicoItens } from './servico'
import { NOTAS_SUGERIDAS } from './sugestoes'
import type { Conteudo, Item, ItemDados } from './types'
import { chaveItem } from './utils'

type Estado = Conteudo & {
  codigo: string
}

const VAZIO: Conteudo = { itens: [], notas: {} }

const novo = (dados: ItemDados, naLista: boolean): Item => ({
  ...dados,
  id: nanoid(),
  naLista,
  criadoEm: new Date().toISOString(),
})

export const useItens = (codigo: string) => {
  const [estado, setEstado] = useState<Estado>()

  useEffect(
    () =>
      servicoItens.assinar(
        codigo,
        (conteudo) => setEstado({ ...conteudo, codigo }),
        () => {
          setEstado({ ...VAZIO, codigo })
          toast.error('Não foi possível carregar a lista')
        },
      ),
    [codigo],
  )

  const carregado = estado?.codigo === codigo
  const { itens, notas: salvas } = carregado ? estado : VAZIO
  const notas = useMemo(() => ({ ...NOTAS_SUGERIDAS, ...salvas }), [salvas])

  const gravar = (item: Item) => {
    servicoItens.salvar(codigo, item).catch(() => toast.error('Erro ao salvar'))
  }

  const salvar = (dados: ItemDados, existente: Item) => gravar({ ...existente, ...dados })

  const remover = (id: string) => {
    servicoItens.remover(codigo, id).catch(() => toast.error('Erro ao excluir'))
  }

  const comprar = (item: Item) =>
    gravar({ ...item, naLista: false, ultimaCompra: new Date().toISOString() })

  const pedir = (item: Item) => gravar({ ...item, naLista: true })

  const tirar = (item: Item) => gravar({ ...item, naLista: false })

  const salvarNota = (categoria: string, nota: string) => {
    if (!categoria) return
    servicoItens.salvarNota(codigo, categoria, nota).catch(() => toast.error('Erro ao salvar'))
  }

  const adicionarVarios = (lista: ItemDados[], naLista = false) => {
    const existentes = new Map(itens.map((item) => [chaveItem(item), item]))
    const alterados = lista.flatMap((dados) => {
      const existente = existentes.get(chaveItem(dados))
      if (!existente) return [novo(dados, naLista)]
      return naLista && !existente.naLista ? [{ ...existente, naLista }] : []
    })
    if (!alterados.length) return
    servicoItens.salvarVarios(codigo, alterados).catch(() => toast.error('Erro ao salvar'))
  }

  return {
    itens,
    notas,
    carregado,
    salvar,
    remover,
    comprar,
    pedir,
    tirar,
    salvarNota,
    adicionarVarios,
  }
}
