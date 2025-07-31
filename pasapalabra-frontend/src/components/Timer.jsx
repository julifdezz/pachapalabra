import { useEffect, useState } from 'react'

function Timer({ duracionSegundos, onFin, activo = true }) {
  const [tiempo, setTiempo] = useState(duracionSegundos)

  useEffect(() => {
    if (!activo || tiempo <= 0) return

    const intervalo = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          onFin()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [tiempo, activo])

  const minutos = Math.floor(tiempo / 60)
  const segundos = tiempo % 60

  return (
    <div style={{ fontSize: '24px', marginTop: '20px' }}>
      ⏱️ Tiempo: {minutos}:{segundos.toString().padStart(2, '0')}
    </div>
  )
}

export default Timer
