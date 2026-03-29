import { useEffect, useState } from 'react'
import './App.css'
import img from './assets/money.gif'
import descontente from './assets/serio.gif'
import musica from './assets/money_2.mp3'

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [showDescontente, setShowDescontente] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null)

  const handleNoMouseEnter = () => {
    if (!showDescontente ) {
      setShowDescontente(true)
    }
    const centerElement = document.getElementById('center')
    if (!centerElement) return
    const { width, height } = centerElement.getBoundingClientRect()
    const buttonWidth = 80
    const buttonHeight = 44

    const randomX = Math.random() * (width - buttonWidth)
    const randomY = Math.random() * (height - buttonHeight)

    setNoButtonPos({ x: randomX, y: randomY })
  }




  useEffect(() => {
    const audioElement = document.getElementById('background-music') as HTMLAudioElement | null
    if (audioElement) {
      if (!showDialog) {
        audioElement.pause()
      }
    }
  }, [showDialog]);


  const openModalAndPlayMusic = () => {
    setShowDialog(true)
    const audioElement = document.getElementById('background-music') as HTMLAudioElement | null
    if (audioElement) {
      audioElement.play()
    }
  }

  return (

    <>
      <section id="center">

        <h1>Desenvolvedor de Software</h1>
        <p className="intro">
          O desenvolvimento web envolve construir aplicações e páginas na internet usando HTML, CSS e JavaScript. Ele abrange desde a lógica de negócios no backend até a experiência visual no frontend.
        </p>
        <span>Gostaram da apresentação e se interessaram pela profissão?</span>

        <div id="buttons">
          <button className='primary' onClick={openModalAndPlayMusic}>Sim</button>
          <button
            className='danger'
            style={
              noButtonPos ? {
                position: 'absolute',
                left: `${noButtonPos.x}px`,
                top: `${noButtonPos.y}px`,
              } as React.CSSProperties : {}
            }
            onMouseEnter={handleNoMouseEnter}
            onMouseMove={handleNoMouseEnter}
            onClick={(e) => e.preventDefault()}
          >
            Não
          </button>
        </div>
        {showDescontente && (
          <div className="descontente-overlay">
            <img src={descontente} alt="Descontente" />
          </div>
        )}
      </section>

      {showDialog && (
        <>
          <div className="dialog-overlay" onClick={() => setShowDialog(false)}></div>
          <dialog open className="empty-dialog">
            <div className="dialog-content">
              <h2>Parabéns! Você deu o primeiro passo</h2>
              <p>
                Vai ter uma longa jornada, mas com dedicação e prática, você pode se tornar um excelente desenvolvedor de software.
              </p>
              <br />
              <img src={img} alt="Dinheiro" />
            </div>
            <button className="primary" onClick={() => setShowDialog(false)}>Fechar</button>
          </dialog>
        </>
      )}

      <audio id="background-music" loop>
        <source src={musica} type="audio/mpeg" />
      </audio>
    </>

  )
}

export default App
