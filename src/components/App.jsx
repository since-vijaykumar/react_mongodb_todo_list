import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Error from "./Error";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  const [dbLoaded, setDbLoaded] = useState(false);
  const [notes, setNotes] = useState([]);

  function Home() {
    return (
      <div>
        <Header />
        <CreateArea onAdd={addNote} />
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={noteItem.id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}

        <div className="errorLink">
          <Link to="/error">Error page</Link>
        </div>

        <Footer />
      </div>
    );
  }

  function loadDb() {
    axios.get("http://localhost:5000/notes/list").then((res) => {
      if (res.data.length > 0) {
        const existingNodes = res.data;

        const dbNotes = existingNodes.map((note) => {
          return { id: note._id, title: note.title, content: note.contents };
        });

        console.log("data");
        console.log(...dbNotes);

        dbNotes.map((n) => {
          return setNotes((prevNotes) => {
            return [...prevNotes, n];
          });
        });
      }
    });

    setDbLoaded(true);
  }

  console.log(">>>>>>>>>>>>>>React Server started...........");

  //FIXME: this call is added to load data from DB only once and set as initial state
  !dbLoaded && loadDb();

  function addNote(newNote) {
    console.log("adding note : " + newNote);
    axios
      .post("http://localhost:5000/notes/add", newNote)
      .then((res) => {
        console.log("Add response: " + res.data);
        setNotes((prevNotes) => {
          return [...prevNotes, newNote];
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  function deleteNote(id) {
    axios
      .delete("http://localhost:5000/notes/delete/" + id)
      .then((res) => {
        console.log("Delete response: " + res);
        setNotes((prevNotes) => {
          return prevNotes.filter((noteItem, index) => {
            return noteItem.id !== id;
          });
        });
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  }

  return (
    <Router>
      <div className="container">
        {/* These ensure that only one component is rendered at a time 
        else this will render all. */}

        {/* This is because the other URLs also contain "/", 
        so if we don't tell the app that it needs to look for just /,
         it loads the first one to match the route, 
         and we get a pretty tricky bug to deal with. */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/error" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
