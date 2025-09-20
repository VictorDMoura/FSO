import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const countAll = (good, neutral, bad) => good + neutral + bad;
const countAverage = (good, neutral, bad) =>
  (good - bad) / (good + neutral + bad);
const countPositive = (good, neutral, bad) =>
  (good / (good + neutral + bad)) * 100;

const Statistics = ({ good, neutral, bad }) => {
  const all = countAll(good, neutral, bad);
  const average = countAverage(good, neutral, bad);
  const positive = countPositive(good, neutral, bad);

  if (all === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{positive}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
