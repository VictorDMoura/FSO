import { useState } from "react"



const Titulo = ({msg}) => (
    <h1>{msg}</h1>
)

const Botao =  (props) => (
  <button onClick={() => props.setValor(props.valor + 1)} > {props.msg}</button>
)

const StatisticLine = (props) => {
  const {msg, valor} = props
  return (
    <tr>
      <td>{msg}</td>
      <td>{valor}</td>
   </tr>
  )
}


const Statistics = (props) => { 
  const data = props.data
  const good = data.good[0]
  const neutral = data.neutral[0]
  const bad = data.bad[0]

  const total = good + neutral + bad
  const avg = (good  - bad) ? (good  - bad) / total : 0.0
  const positive = (good / total) ? (good / total) * 100 : 0.0


  return total ? (
      <table>
        <tbody>
           <StatisticLine msg='good' valor={good} />
            <StatisticLine msg='neutral' valor={neutral} />
            <StatisticLine msg='bad' valor={bad} />
            <StatisticLine msg='all' valor={total}/>
            <StatisticLine msg='average' valor={avg.toFixed(1)}/>
            <StatisticLine msg='positive' valor={`${positive.toFixed(1)} %`}/>
        </tbody>
      </table>
  ) : 
  (
    <div>
      <p>No feedback given</p>
    </div>
  )

}




const App = () => {
  // salve os cliques de cada botão em seu prórprio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const data = {
    'good':[good, setGood],
    'neutral' :[neutral, setNeutral],
    'bad': [bad, setBad]
  }



  return (
    <div>
      <Titulo msg='give feedback' />
      <Botao setValor={setGood} valor={good} msg='good' />
      <Botao setValor={setNeutral} valor={neutral} msg='neutral' />
      <Botao setValor={setBad} valor={bad} msg='bad' />
      <Titulo msg='statistics' />
      <Statistics data={data}/>
    </div>
  )
}

export default App