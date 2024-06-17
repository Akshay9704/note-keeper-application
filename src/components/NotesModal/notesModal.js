import React, { useContext, useState } from 'react';
import NotesContext from '../../context/notesContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Helper from "../../helper";
import toast from 'react-hot-toast';
import './notesModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const customBlue = "#cde9ff";
const customGrey = "#fecce5";
const customGreen = "#ccf1c5";
const customYellow = "#fff9c4";

const NotesModal = ({ notesModal, setNotesModal }) => {
  const [note, setNote] = useState({
    title: '',
    tagline: '',
    description: '',
    bgColor: '',
    pinned: false
  });

  const { setNotes } = useContext(NotesContext);

  const handleNote = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  }

  const handleColorChange = (color) => {
    setNote({
      ...note,
      bgColor: color
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const helper = new Helper();
      await helper.addNotes(note);
      const fetchedNotes = await helper.getNotes();
      setNotes(fetchedNotes);
      toast.success('Note added successfully');
      handleClose();
    } catch (error) {
      console.error('Something went wrong while create note', error);
      toast.error('Error creating a note');
      handleClose();
    }
  }

  const handleClose = () => setNotesModal(false);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={notesModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={notesModal}>
          <Box sx={style}>
            <div className='form_heading'>
              <Typography className='note_form_heading' id="transition-modal-title" variant="h4" component="h2">
                Add a Note
              </Typography>
              <button className='close_btn' onClick={handleClose}>X</button>
            </div>
            <form className='notes_form_container' onSubmit={handleSubmit}>
              <input
                value={note.title}
                onChange={handleNote}
                name="title"
                className='note_input'
                type="text"
                placeholder="Title"
              />
              <input
                value={note.tagline}
                onChange={handleNote}
                name="tagline"
                className='note_input'
                type='text'
                placeholder='Tagline'
              />
              <textarea
                value={note.description}
                onChange={handleNote}
                name="description"
                className='note_area_input'
                placeholder="Description"
              />
              <div>
                <label className='note_label'>Select background color</label>
                <div className='color_container'>
                  <div
                    className='color-blue'
                    style={{
                      backgroundColor: customBlue,
                      border: note.bgColor === customBlue ? '3px solid black' : '1px solid black'
                    }}
                    onClick={() => handleColorChange(customBlue)}
                  ></div>
                  <div
                    className='color-green'
                    style={{
                      backgroundColor: customGreen,
                      border: note.bgColor === customGreen ? '3px solid black' : '1px solid black'
                    }}
                    onClick={() => handleColorChange(customGreen)}
                  ></div>
                  <div
                    className='color-grey'
                    style={{
                      backgroundColor: customGrey,
                      border: note.bgColor === customGrey ? '3px solid black' : '1px solid black'
                    }}
                    onClick={() => handleColorChange(customGrey)}
                  ></div>
                  <div
                    className='color-yellow'
                    style={{
                      backgroundColor: customYellow,
                      border: note.bgColor === customYellow ? '3px solid black' : '1px solid black'
                    }}
                    onClick={() => handleColorChange(customYellow)}
                  >
                  </div>
                </div>
              </div>
              <button className='note_btn' type="submit">Add Note</button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default NotesModal;
