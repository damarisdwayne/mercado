import { useEffect, useState } from 'react'
import { codigoInicial, guardarCodigo } from './codigo-lista'

export const useCodigoLista = () => {
  const [codigo, setCodigo] = useState(codigoInicial)

  useEffect(() => guardarCodigo(codigo), [codigo])

  return { codigo, trocar: setCodigo }
}
