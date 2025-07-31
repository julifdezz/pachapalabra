function PreguntaActual({ pregunta, onMarcar, pausado }) {
  const contiene = pregunta.palabra
    .toLowerCase()
    .includes(pregunta.letra.toLowerCase())

  const tipo = pregunta.palabra.toLowerCase().startsWith(pregunta.letra.toLowerCase())
    ? `Empieza con la letra "${pregunta.letra}"`
    : `Contiene la letra "${pregunta.letra}"`

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Letra: {pregunta.letra}</h2>
      <p><strong>{tipo}</strong></p>
      <p><em>Palabra:</em> {pregunta.palabra}</p>
      <p><em>Definición:</em> {pregunta.definicion}</p>

      {!pausado ? (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => onMarcar('correcto')} style={{ marginRight: '10px' }}>✔️ Correcta</button>
          <button onClick={() => onMarcar('incorrecto')} style={{ marginRight: '10px' }}>❌ Incorrecta</button>
          <button onClick={() => onMarcar('pasada')}>⏭️ Pasapalabra</button>
        </div>
      ) : (
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => onMarcar('reanudar')}>▶️ Reanudar</button>
        </div>
      )}
    </div>
  )
}

export default PreguntaActual
