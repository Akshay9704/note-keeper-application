import React, { useContext, useState } from 'react';
import NotesContext from '../../context/notesContext';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import Helper from '../../helper';
import './editModal.css';

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

const EditModal = ({ editModal, setEditModal, note }) => {
    const { notes, setNotes } = useContext(NotesContext);
    const [editNote, setEditNote] = useState({
        title: note.title,
        tagline: note.tagline,
        description: note.description,
        bgColor: note.bgColor,
    });

    const handleClose = () => setEditModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditNote({
            ...editNote,
            [name]: value
        });
    }

    const handleColorChange = (color) => {
        setEditNote({
            ...editNote,
            bgColor: color
        });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const helper = new Helper();
            await helper.editNotes(note.id, editNote);
            setNotes(notes.map(n => n.id === note.id ? { ...editNote, id: note.id } : n));
            setEditModal(false);
            toast.success('Note updated successfully');
        } catch (error) {
            console.error('Something went wrong while updating the note', error);
            toast.error('Error updating the note');
        }
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={editModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={editModal}>
                    <Box sx={style}>
                        <div className='form_heading'>
                            <Typography className='note_form_heading' id="transition-modal-title" variant="h4" component="h2">
                                Update Note
                            </Typography>
                            <button className='close_btn' onClick={handleClose}>X</button>
                        </div>
                        <form className='notes_form_container'>
                            <input onChange={handleChange} value={editNote.title} className='note_input' type="text" name="title" placeholder="Title" />
                            <input onChange={handleChange} value={editNote.tagline} className='note_input' type='text' name="tagline" placeholder='Tagline' />
                            <textarea onChange={handleChange} value={editNote.description} className='note_area_input' name="description" placeholder="Description" />
                            <div>
                                <label className='note_label'>Select background color</label>
                                <div className='color_container'>
                                    <div
                                        className='color-blue'
                                        style={{
                                            backgroundColor: customBlue,
                                            border: editNote.bgColor === customBlue ? '3px solid black' : '1px solid black'
                                        }}
                                        onClick={() => handleColorChange(customBlue)}
                                    ></div>
                                    <div
                                        className='color-green'
                                        style={{
                                            backgroundColor: customGreen,
                                            border: editNote.bgColor === customGreen ? '3px solid black' : '1px solid black'
                                        }}
                                        onClick={() => handleColorChange(customGreen)}
                                    ></div>
                                    <div
                                        className='color-grey'
                                        style={{
                                            backgroundColor: customGrey,
                                            border: editNote.bgColor === customGrey ? '3px solid black' : '1px solid black'
                                        }}
                                        onClick={() => handleColorChange(customGrey)}
                                    ></div>
                                    <div
                                        className='color-yellow'
                                        style={{
                                            backgroundColor: customYellow,
                                            border: editNote.bgColor === customYellow ? '3px solid black' : '1px solid black'
                                        }}
                                        onClick={() => handleColorChange(customYellow)}
                                    >
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleUpdate} className='note_btn'>Update Note</button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditModal;
