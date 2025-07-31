import './Rosco.css'

function Rosco({ preguntas, respuestas }) {
  return (
    <div className="rosco">
      {preguntas.map((item, i) => {
        const estado = respuestas[item.letra] || 'pendiente' // 'correcto', 'incorrecto', 'pendiente'
        return (
          <div key={i} className={`letra ${estado}`}>
            {item.letra}
          </div>
        )
      })}
    </div>
  )
}

export default Rosco
