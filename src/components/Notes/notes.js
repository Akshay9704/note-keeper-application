import React, { useContext, useState } from 'react';
import NotesContext from '../../context/notesContext';
import EditModal from "../EditModal/editModal";
import { TiPinOutline } from "react-icons/ti";
import { TiPin } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import './notes.css';
import Helper from '../../helper';

const Notes = ({ note }) => {
  const { notes, setNotes } = useContext(NotesContext);
  const [editModal, setEditModal] = useState(false);
  const [pinned, setPinned] = useState(note.pinned);

  const handleEdit = () => {
    setEditModal(!editModal);
  }

  const handlePin = async () => {
    try {
      const helper = new Helper();
      const updatedNote = { ...note, pinned: !pinned };
      await helper.editNotes(note.id, updatedNote);
      setPinned(!pinned);
      setNotes(prevNotes => {
        const updatedNotes = prevNotes.map(n => n.id === note.id ? updatedNote : n);
        return updatedNotes.sort((a, b) => b.pinned - a.pinned);
      });
      if (pinned) {
        toast.success('Note unpinned successfully');
      } else {
        toast.success('Note pinned successfully');
      }
    } catch (error) {
      console.error("Something is wrong with the pin functionality", error);
      toast.error('Error pinning the note');
    }
  }

  const handleDelete = async () => {
    try {
      const helper = new Helper();
      await helper.deleteNotes(note.id);
      setNotes(notes.filter(n => n.id !== note.id));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Something went wrong while deleting the note', error);
      toast.error('Error deleting the note');
    }
  }

  return (
    <>
      <div className='note' style={{ backgroundColor: note.bgColor }}>
        <div className='note_header'>
          <h2>{note.title}</h2>
          {pinned ? <TiPin onClick={handlePin} className='pin' /> : <TiPinOutline onClick={handlePin} className='pin' />}
        </div>
        <h4>{note.tagline}</h4>
        <p>{note.description}</p>
        <div className='buttons'>
          <div onClick={handleEdit} className='edit'><FaEdit /></div>
          <div onClick={handleDelete} className='delete'><MdDelete /></div>
        </div>
      </div>
      {editModal && <div><EditModal note={note} editModal={editModal} setEditModal={setEditModal} /></div>}
    </>
  )
}

export default Notes;
