import { useEffect, useState } from 'react'
import preguntasJSON from './data/preguntas.json'
import Rosco from './components/Rosco'
import PreguntaActual from './components/PreguntaActual'
import Timer from './components/Timer'

function App() {
  const [preguntas, setPreguntas] = useState([])
  const [respuestas, setRespuestas] = useState({})
  const [indiceActual, setIndiceActual] = useState(0)
  const [juegoTerminado, setJuegoTerminado] = useState(false)
  const [pausado, setPausado] = useState(false)
  const [tiempoActivo, setTiempoActivo] = useState(true)
  const [segundaRonda, setSegundaRonda] = useState(false)
  const [letrasPasadas, setLetrasPasadas] = useState([])

  // Inicialización
  const reiniciarJuego = () => {
    const inicial = {}
    preguntasJSON.forEach(p => { inicial[p.letra] = 'pendiente' })
    setPreguntas(preguntasJSON)
    setRespuestas(inicial)
    setIndiceActual(0)
    setJuegoTerminado(false)
    setPausado(false)
    setTiempoActivo(true)
    setSegundaRonda(false)
    setLetrasPasadas([])
  }

  useEffect(() => {
    reiniciarJuego()
  }, [])

  const avanzar = () => {
    const letrasRestantes = segundaRonda
      ? letrasPasadas
      : preguntas.map(p => p.letra).filter(l => respuestas[l] === 'pendiente')

    if (letrasRestantes.length === 0) {
      if (!segundaRonda && letrasPasadas.length > 0) {
        setSegundaRonda(true)
        setIndiceActual(preguntas.findIndex(p => p.letra === letrasPasadas[0]))
        return
      }

      setJuegoTerminado(true)
      setTiempoActivo(false)
      alert('✅ Rosco terminado')
      return
    }

    let siguiente = indiceActual
    do {
      siguiente = (siguiente + 1) % preguntas.length
    } while (
      respuestas[preguntas[siguiente].letra] !== 'pendiente' &&
      (!segundaRonda || !letrasPasadas.includes(preguntas[siguiente].letra))
    )

    setIndiceActual(siguiente)
  }

  const handleMarcar = (estado) => {
  const letra = preguntas[indiceActual].letra

  // Evitar reescribir respuestas ya definidas
  if (['correcto', 'incorrecto'].includes(respuestas[letra])) {
    return
  }

  const nuevasRespuestas = { ...respuestas }

  if (estado === 'pasada') {
    nuevasRespuestas[letra] = 'pasada'
    setRespuestas(nuevasRespuestas)
    setLetrasPasadas(prev => [...prev, letra])
    setPausado(true)
    setTiempoActivo(false)
    return
  }

  if (estado === 'reanudar') {
    setPausado(false)
    setTiempoActivo(true)
    avanzar()
    return
  }

  // Marcar respuesta como correcta o incorrecta
  nuevasRespuestas[letra] = estado

  // Remover de letras pasadas si estaba ahí
  if (letrasPasadas.includes(letra)) {
    setLetrasPasadas(prev => prev.filter(l => l !== letra))
  }

  setRespuestas(nuevasRespuestas)

  // Verificamos si quedan pendientes (evita el doble clic final)
  const pendientes = preguntas.filter(p => nuevasRespuestas[p.letra] === 'pendiente')
  const pasadas = letrasPasadas.filter(l => nuevasRespuestas[l] === 'pasada')

  if (pendientes.length === 0 && pasadas.length === 0) {
    setJuegoTerminado(true)
    setTiempoActivo(false)
    return
  }

  avanzar()
}


  const manejarFinDelTiempo = () => {
    setJuegoTerminado(true)
    setTiempoActivo(false)
    alert('⏱️ Se acabó el tiempo')
  }

  if (preguntas.length === 0) return <p>Cargando...</p>

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>🎙️ Dashboard Pasapalabra</h1>
      <Timer duracionSegundos={120} onFin={manejarFinDelTiempo} activo={tiempoActivo} />
      <Rosco preguntas={preguntas} respuestas={respuestas} />

      {!juegoTerminado && (
        <PreguntaActual
          pregunta={preguntas[indiceActual]}
          onMarcar={handleMarcar}
          pausado={pausado}
        />
      )}

      {juegoTerminado && <h2>✅ Fin del rosco</h2>}

      <button onClick={reiniciarJuego} style={{ marginTop: '20px' }}>
        🔁 Reiniciar Juego
      </button>
    </div>
  )
}

export default App
