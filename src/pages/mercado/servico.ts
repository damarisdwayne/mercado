import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  writeBatch,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firestore'
import type { Conteudo, Item } from './types'

const semIndefinidos = (valor: object): DocumentData => JSON.parse(JSON.stringify(valor))

const colecao = (codigo: string) => collection(db, 'mercados', codigo, 'itens')
const ID_NOTAS = 'notas-das-categorias'

const referencia = (codigo: string, id: string) => doc(colecao(codigo), id)

export const servicoItens = {
  assinar: (codigo: string, aoMudar: (conteudo: Conteudo) => void, aoFalhar: () => void) =>
    onSnapshot(
      colecao(codigo),
      ({ docs }) =>
        aoMudar({
          notas: docs.find(({ id }) => id === ID_NOTAS)?.data().notas ?? {},
          itens: docs
            .filter(({ id }) => id !== ID_NOTAS)
            .map((item) => ({ ...(item.data() as Omit<Item, 'id'>), id: item.id })),
        }),
      aoFalhar,
    ),
  salvar: (codigo: string, item: Item) => setDoc(referencia(codigo, item.id), semIndefinidos(item)),
  remover: (codigo: string, id: string) => deleteDoc(referencia(codigo, id)),
  salvarNota: (codigo: string, categoria: string, nota: string) =>
    setDoc(referencia(codigo, ID_NOTAS), { notas: { [categoria]: nota } }, { merge: true }),
  salvarVarios: (codigo: string, itens: Item[]) => {
    const lote = writeBatch(db)
    itens.forEach((item) => lote.set(referencia(codigo, item.id), semIndefinidos(item)))
    return lote.commit()
  },
}
