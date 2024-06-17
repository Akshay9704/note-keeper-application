import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import Notes from '../Notes/notes';
import NotesContext from '../../context/notesContext';
import NotesModal from '../NotesModal/notesModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Helper from "../../helper";
import './notesContainer.css';

const NotesContainer = () => {
  const { notes, setNotes } = useContext(NotesContext);
  const [notesModal, setNotesModal] = useState(false);

  const handleModal = () => {
    setNotesModal(!notesModal);
  }

  const helper = useMemo(() => new Helper(), []);

  const fetchNotes = useCallback(async () => {
    const fetchedNotes = await helper.getNotes();
    console.log('Fetched notes:', fetchedNotes);
    setNotes(fetchedNotes);
  }, [helper, setNotes]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const notesPerPage = 6;
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;

  // Sort notes before slicing
  const sortedNotes = notes.sort((a, b) => b.pinned - a.pinned);
  const notesToShow = sortedNotes.slice(startIndex, endIndex);

  return (
    <>
      <div className="add_note_container">
        <button onClick={handleModal} className="add_note">Add a Note</button>
      </div>
      <div className="heading">
        <h1>Notes</h1>
      </div>
      {notes.length === 0 && <h4 style={{ textAlign: 'center', marginTop: '40px' }}>No notes found</h4>}
      <div className='notes_container'>
        {notesToShow.map((note) => {
          return <Notes key={note.id} note={note} />
        })}
      </div>
      <div className="pagination_container">
        <Stack spacing={2}>
          <Pagination 
            style={{ display: "flex", justifyContent: "center" }} 
            count={totalPages} 
            page={currentPage} 
            onChange={(event, page) => setCurrentPage(page)} 
            color="primary" 
            size="large" 
          />
        </Stack>
      </div>
      {notesModal && <div>
        <NotesModal notesModal={notesModal} setNotesModal={setNotesModal} />
      </div>}
    </>
  );
}

export default NotesContainer;
