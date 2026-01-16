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

export default Total;