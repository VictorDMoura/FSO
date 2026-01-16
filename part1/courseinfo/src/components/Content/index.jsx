import Part from "../Part";

const Content = (props) => {
  const parts = props.parts.map((value) => (
    <Part key={value.id} name={value.name} exercises={value.exercises} />
  ));
  return <div>{parts}</div>;
};

export default Content;