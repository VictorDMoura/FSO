import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'Se fazer algo dói, faça isso com mais frequência.',
    'Contratar mão de obra para um projeto de software que já está atrasado, faz com que se atrase mais ainda!',
    'Os primeiros 90% do código correspondem aos primeiros 10% do tempo de desenvolvimento... Os outros 10% do código correspondem aos outros 90% do tempo de desenvolvimento.',
    'Qualquer tolo escreve código que um computador consegue entender. Bons programadores escrevem código que humanos conseguem entender.',
    'Otimização prematura é a raiz de todo o mal.',
    'Antes de mais nada, depurar é duas vezes mais difícil do que escrever o código. Portanto, se você escrever o código da forma mais inteligente possível, você, por definição, não é inteligente o suficiente para depurá-lo.',
    'Programar sem o uso extremamente intenso do console.log é o mesmo que um médico se recusar a usar raio-x ou testes sanguíneos ao diagnosticar pacientes.',
    'A única maneira de ir rápido é ir bem.'
  ]

  const Botao = ({setSelected, number}) => {
    const proxima = () => setSelected(number)
    return(
      <button onClick={proxima}>Proxima</button>
    )
  }
  const Anedota = ({array, selected, voto}) => {
    return(
      <div>
       <p>{array[selected]}</p>
       <p>Tem {voto[selected] || 0} votos</p>
    </div>
    )
  }

  const Votar = ({select, voto, setVot}) => {
    const ponto = () =>{ 
      voto[select] = voto[select] + 1 || 1
      setVot({...voto})
    }
    return <button onClick={ponto}>Votar</button>
  }

  const MaisVotada = ({anedotas, max, voto}) => {
    return (
      <div>
        <h1>Anedota com mais votos</h1>
        <Anedota array={anedotas} selected={max} voto={voto}/>
      </div>
    )
  }

  const maxVotos = (votos) => {
    return Object.keys(votos).reduce((a, b) => votos[a] > votos[b] ? a : b, 0)
  }


  const arrayLen = anecdotes.length

  const pickRandom = (len) => Math.floor(Math.random()*len)   
  const [selected, setSelected] = useState(0)
  const [voto, setVot] = useState({})

  return (
    <div>
      <h1>Anedota do dia</h1>
      <Anedota array={anecdotes} selected={selected} voto ={voto}/>
      <Botao setSelected={setSelected} number={pickRandom(arrayLen)}></Botao>
      <Votar select={selected} voto={voto} setVot={setVot}></Votar>
      <MaisVotada anedotas={anecdotes} max={maxVotos(voto)} voto={voto}/>
    </div>
  )
}

export default App