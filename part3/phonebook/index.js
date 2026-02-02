express = require("express");
const app = express();

app.use(express.json());

let PERSONS = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/persons", (req, res) => {
  res.json(PERSONS);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const length = PERSONS.length;
  res.send(`<p>Phonebook has info for ${length} speople</p><p>${date}</p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = PERSONS.find((person) => person.id === id);
  if (!person) {
    return res.status(404).end();
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  PERSONS = PERSONS.filter((person) => person.id !== id);
  res.status(204).end();
});
