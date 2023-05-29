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
      url: "/notes/",
    })
      .then((response) => {
        const data = response.datasetNewNotes(data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getNotes();
    // empty [] array is pass as the second argument
    // to prevent the function from running in an infinite loop
  }, []);

  return <div>Notes</div>;
}
export default Notes;
