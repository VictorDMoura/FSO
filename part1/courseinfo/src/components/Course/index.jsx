import Header from "../Header"
import Content from "../Content";
import Total from "../Total";

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

export default Course;