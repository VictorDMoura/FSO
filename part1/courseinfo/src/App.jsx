const Header  = (props) => {
    return <h1>{props.course}</h1>
  }

  const Part = (props) => {
    return <p>
      {props.name} {props.exercises}
    </p>
  }

  const Content = (props) => {
    const parts = props.parts.map(value => <Part name={value.name} exercises={value.exercises} />)
    console.log(parts)
    return (
      <div>
        {parts}
      </div>
    )
  }

const Total = (props) => {
  const [...part] = props.parts
    return (
      <p>Number of exercises {part[0].exercises + part[1].exercises + part[2].exercises}</p>
    )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content 
        parts={course.parts}       
        /> 
      <Total 
        parts={course.parts}
      />      
    </div>
  )
}

export default App