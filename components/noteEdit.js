import { useForm } from "react-hook-form";
import useFirestore from "../lib/useFirestore";
import { motion } from "framer-motion";

const NoteEdit = ({ userNote, setSelectedNote, boardName }) => {

    const { register, handleSubmit } = useForm();
    const { deleteNote, updateNote } = useFirestore();

    const handleNoteUpdate = async (data, note) => {
        await updateNote(note, boardName, data.text, data.title)
        setSelectedNote(-1)
    }

    const handleNoteDelete = (note) => {
        deleteNote(note, boardName)
        setSelectedNote(-1)
    }


    return (
        <motion.div className="note-edit-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
            <motion.form className="note-edit" onSubmit={handleSubmit((data) => handleNoteUpdate(data, userNote.id))} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                <div className='form-edit-header'>
                    <textarea className="note-edit-title" {...register("title")} defaultValue={userNote.name} type='text' placeholder="Title" />
                    <ul className="note-button-list">
                        <li><button className='note-edit-button button-close' onClick={() => handleNoteDelete(userNote.id)}>Delete</button></li>
                        <li><button className='note-edit-button button-expand' onClick={() => setSelectedNote(-1)}>Close</button></li>
                    </ul>
                </div>
                <textarea className='note-edit-text' {...register("text")} type='text' defaultValue={userNote.text} placeholder="add some notes" autoFocus />
                <button type="submit" className="note-edit-button button-update">Update</button>
            </motion.form>
        </motion.div>
    );
}

export default NoteEdit;