require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost/notesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const con = mongoose.connection;
con.on("erro", console.error.bind(console, "connection error:"));
con.once("open", () => console.log("Successfully connected to DB"));

const notesRouter = require("./routes/notes.js");
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.json("Connected to Notes App");
});
app.listen(process.env.PORT, (req, res) => {
  console.log("collected to server at port " + process.env.PORT);
});
