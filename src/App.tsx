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
    if (!showDescontente) {
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

  const closeModalAndRedirect = () => {
    setShowDialog(false)
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
  return (

    <>
      <section id="center">

        <h1>Como Combar de Aatrox</h1>
        <p className="intro">

        </p>
        <div className="combo-guide" style={{textAlign: "start"}}>
          <h2>🔥 Combo básico (troca curta)</h2>
          <p className="subtitle">Ideal para lane:</p>
          <ul>
            <li>Use Q (A Espada Darkin) – primeiro golpe</li>
            <li>Já encaixe um E (Investida Umbral) pra reposicionar o segundo Q</li>
            <li>Use o segundo Q (tentando acertar a borda)</li>
            <li>Finalize com W (Correntes Infernais) pra puxar o inimigo</li>
            <li>Use o terceiro Q quando o inimigo estiver preso</li>
          </ul>
          <p className="tip">👉 Esse combo garante controle + dano consistente.</p>
      <br />
          <h2>⚔️ Combo all-in (pra matar)</h2>
          <p className="subtitle" style={{textAlign: "start"}}>Quando quiser ir pra cima de verdade:</p>
            <br />
              
          <ul>
            <li>Ative o R (Aniquilador de Mundos)</li>
            <li>Use W primeiro pra dificultar a fuga</li>
            <li>Q + E (reposicionando sempre pra acertar a borda do Q)</li>
            <li>Continue com os 3 golpes do Q</li>
            <li>Use ataques básicos entre as skills (muito importante!)</li>
          </ul>
          <br />
          <p className="tip">👉 Dica: o dano do Aatrox vem MUITO da borda do Q, não do centro.</p>
          <p className="tip">Entendeu agora como comba de Aatrox?</p>
        </div>

  

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

                <br />
      </section>

      {showDialog && (
        <>
          <div className="dialog-overlay" onClick={() => setShowDialog(false)}></div>
          <dialog open className="empty-dialog">
            <div className="dialog-content">
              <h2>Parabéns! Você deu o primeiro passo</h2>
              <p>
                Agora feche esse modal e vá treinar o Aatrox de prática!
              </p>
              <br />
              <img src={img} alt="Dinheiro" />
            </div>
            <button className="primary" onClick={closeModalAndRedirect}>Fechar</button>
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
