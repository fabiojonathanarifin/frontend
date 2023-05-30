import { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";

function Notes() {
  const [notes, setNewNotes] = useState(null);
  const [formNote, setFormNote] = useState({
    title: "",
    content: "",
  });

  function getNotes() {
    axios({
      method: "GET",
      //   beacuse of the proxy in package.json
      //we don't have to write "http:/localhost:8000/notes"
      url: "/notes/",
    })
      .then((response) => {
        const data = response.data.setNewNotes(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function createNote(event) {
    axios({
      method: "POST",
      url: "/notes/",
      data: {
        title: formNote.title,
        content: formNote.content,
      },
      // we use the response function to recall the getNotes()
      // so that previous notes can be displayed together with the newly added note.
      // we do this instead of making another function to call/update the entire data (refreshed using useEffect)
    }).then((response) => {
      getNotes();
    });

    setFormNote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }

  //like POST the response is used to update the notes after deleting an id
  function DeleteNote(id) {
    axios({
      method: "DELETE",
      url: `notes/${id}`,
    }).then((response) => {
      getNotes();
    });
  }

  useEffect(() => {
    getNotes();
    // empty [] array is pass as the second argument
    // to prevent the function from running in an infinite loop
  }, []);

  function handleChange(event) {
    const { value, name } = event.target;
    // added new name & value to the note
    setFormNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <div className="">
      <form className="create-note">
        <input
          onChange={handleChange}
          text={formNote.title}
          name="title"
          placeholder="Title"
          value={formNote.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          value={formNote.content}
        />
        <button onClick={createNote}>Create Post</button>
      </form>
      {notes &&
        notes.map((note) => (
          <List
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            deletion={DeleteNote}
          />
        ))}
    </div>
  );
}
export default Notes;
