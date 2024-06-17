import React from "react";
import { Toaster } from "react-hot-toast";
import NotesContainer from "./components/NotesContainer/notesContainer";
import NotesContextProvider from "./context/notesContextProvider";

function App() {
  return (
    <NotesContextProvider>
      <Toaster />
      <NotesContainer />
    </NotesContextProvider>
  );
}

export default App;
