import { useState, useEffect } from "react";
import { useAuth } from "../lib/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import NoteEdit from "./noteEdit";

const Note = ({ boardName }) => {

    const { userId } = useAuth();

    const [boardNotes, setBoardNotes] = useState([])
    const [selectedNote, setSelectedNote] = useState(-1);

    useEffect(() => {
        const colRef = collection(db, 'users', userId, 'boards', boardName, 'notes')
        const q = query(colRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setBoardNotes(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
        return unsubscribe
    }, [])

    return (
        <>
            {boardNotes.map((userNote, userNoteIndex) => {
                return (
                    <div className='note-container' key={userNoteIndex}>
                        <div className='note-header'>
                            <h3>{userNote.name}</h3>
                            <ul className='note-button-list'>
                                <li><button className='note-edit-button button-expand' onClick={() => setSelectedNote(userNoteIndex)}>Edit</button></li>
                            </ul>
                        </div>
                        <div className='note'>
                            <p className='note-text'>{userNote.text}</p>
                        </div>
                    </div>
                )
            })}
            {boardNotes.map((userNoteEdit, userNoteEditIndex) => {
                if (userNoteEditIndex === selectedNote) {
                    return <NoteEdit userNote={userNoteEdit} setSelectedNote={setSelectedNote} boardName={boardName} />
                }
            })}
        </>
    );
}

export default Note;