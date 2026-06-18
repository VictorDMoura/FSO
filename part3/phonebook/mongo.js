const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give the password as argument");
  process.exit(1);
}

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

const password = process.argv[2].trim();

const url = `mongodb://fullstack:${password}@ac-vflqlxt-shard-00-00.cwlkfb9.mongodb.net:27017,ac-vflqlxt-shard-00-01.cwlkfb9.mongodb.net:27017,ac-vflqlxt-shard-00-02.cwlkfb9.mongodb.net:27017/phonebookApp?ssl=true&replicaSet=atlas-mtnnro-shard-0&authSource=admin&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 5) {
  const personName = process.argv[3].trim();
  const personNumber = process.argv[4].trim();

  const person = new Person({
    id: generateId(),
    name: personName,
    number: personNumber,
  });

  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
} else if (process.argv.length == 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else {
  console.log("Falta parâmetros para realizar qualquer coisa");
  process.exit(1);
}
