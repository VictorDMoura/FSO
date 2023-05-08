const App = () => {
    const course = {
    name:  'Desenvolvimento de aplicação Half Stack',
    parts: [
        {
          name: 'Fundamentos da biblioteca React',
          exercises: 10
      },
      {
        name: 'Usando props para passar dados',
        exercises: 7
      },
      {
        name: 'Estado de um componente',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Footer parts={course} />
    </div>
  )
}


const Header = (props) => {
 const t = props.course 
 return(
 <h1>{t.name}</h1>
 )
}

const Content = (props) => { 
  const course = props.parts
  const t = course.parts
  return (
    <div>
      <Part part={t[0].name} exercises={t[0].exercises} />
      <Part part={t[1].name} exercises={t[1].exercises} />
      <Part part={t[2].name} exercises={t[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return(
    <p>{props.part} {props.exercises}</p>
  )
}

const Footer = (props) => {
  const course = props.parts
  const t = course.parts
  return (
    <p>Number of exercises {t[0].exercises + t[1].exercises + t[2].exercises}</p>
  )
}


export default App