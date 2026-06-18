const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give the password as argument");
  process.exit(1);
}

const password = process.argv[2].trim();

const url = `mongodb://fullstack:${password}@ac-vflqlxt-shard-00-00.cwlkfb9.mongodb.net:27017,ac-vflqlxt-shard-00-01.cwlkfb9.mongodb.net:27017,ac-vflqlxt-shard-00-02.cwlkfb9.mongodb.net:27017/noteApp?ssl=true&replicaSet=atlas-mtnnro-shard-0&authSource=admin&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
