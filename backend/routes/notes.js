const router = require("express").Router();

const Note = require("../models/notes.model.js");

router.route("/").get((req, res) => {
  console.log("All Notes routes");
  res.json("All Notes routes");
});

router.route("/list").get((req, res) => {
  console.log("Getting all Notes");
  Note.find()
    .then((notes) => res.json(notes))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newNote = new Note({
    title: req.body.title,
    contents: req.body.contents,
  });

  newNote
    .save()
    .then((note) => res.json("New User Added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  console.log("Id : " + id + " to be removed");
  Note.findByIdAndRemove(id)
    .then((note) => res.json("removed : " + note))
    .catch((err) => res.status(400).json("Erro: " + err));
});

module.exports = router;
