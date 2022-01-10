import { useForm } from "react-hook-form";
import useFirestore from "../lib/useFirestore";

const NoteEdit = ({ userNote, setSelectedNote, boardName }) => {

    const { register, handleSubmit } = useForm();
    const { deleteNote, updateNote } = useFirestore();

    const handleNoteUpdate = async (data, note) => {
        await updateNote(note, boardName, data.text, data.title)
        setSelectedNote(-1)
    }

    const handleNoteDelete = async (note) => {
        await deleteNote(note, boardName)
        setSelectedNote(-1)
    }


    return (
        <div className="note-edit-container">
            <div className='note-edit-header'>
                <ul className="note-button-list">
                    <li><button className='note-edit-button button-close' onClick={() => handleNoteDelete(userNote.id)}>Delete</button></li>
                    <li><button className='note-edit-button button-expand' onClick={() => setSelectedNote(-1)}>Close</button></li>
                </ul>
            </div>
            <div className='note-edit'>
                <form onSubmit={handleSubmit((data) => handleNoteUpdate(data, userNote.id))}>
                    <textarea className="note-edit-title" {...register("title")} defaultValue={userNote.name} type='text' placeholder="title" />
                    <textarea className='note-edit-text' {...register("text", { required: "Required", })} type='text' defaultValue={userNote.text} placeholder="add some notes" autoFocus />
                    <button type="submit" className="note-edit-button button-update">Update</button>
                </form>
            </div>
        </div>
    );
}

export default NoteEdit;