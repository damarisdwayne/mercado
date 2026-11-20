import { useEffect, useState } from 'react'

const inicioDeHoje = () => new Date().setHours(0, 0, 0, 0)

export const useHoje = () => {
  const [hoje, setHoje] = useState(inicioDeHoje)

  useEffect(() => {
    const atualizar = () => setHoje(inicioDeHoje())
    document.addEventListener('visibilitychange', atualizar)
    window.addEventListener('focus', atualizar)
    return () => {
      document.removeEventListener('visibilitychange', atualizar)
      window.removeEventListener('focus', atualizar)
    }
  }, [])

  return hoje
}
