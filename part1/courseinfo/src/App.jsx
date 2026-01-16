const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts.map((value) => (
    <Part key={value.id} name={value.name} exercises={value.exercises} />
  ));
  return <div>{parts}</div>;
};

const Total = (props) => {
  const [...part] = props.parts;
  return (
    <strong>
      total of exercises{" "}
      {part.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises;
      }, 0)}
    </strong>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      {course.map((value) => (
        <div key={value.name}>
          <Header course={value.name} />
          <Content parts={value.parts} />
          <Total parts={value.parts} />
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const course = [
    {
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course course={course} />;
};

export default App;
