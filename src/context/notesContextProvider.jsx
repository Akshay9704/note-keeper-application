import NotesContext from "./notesContext";
import { useState } from "react";

const NotesContextProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContextProvider;
