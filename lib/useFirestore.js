import { db } from "./firebase";
import { setDoc, addDoc, doc, collection, deleteDoc, updateDoc, serverTimestamp, query, onSnapshot } from "firebase/firestore";
import { useAuth } from "./auth";

const useFirestore = () => {

    const { userId } = useAuth()

    const setBoard = async (title, display) => {
        await setDoc(doc(db, 'users', userId, 'boards', title), {
            name: title,
            timestamp: serverTimestamp(),
        });
    }

    const setNote = async (boardName) => {
        await addDoc(collection(db, "users", userId, "boards", boardName, 'notes'), {
            text: '',
            timestamp: serverTimestamp(),
        });
    }

    const deleteBoard = async (boardName) => {
        await deleteDoc(doc(db, 'users', userId, 'boards', boardName))
    }

    const deleteNote = async (note, boardName) => {
        await deleteDoc(doc(db, 'users', userId, 'boards', boardName, 'notes', note));
    }

    const updateNote = async (note, boardName, text, title) => {
        const docRef = doc(db, 'users', userId, 'boards', boardName, 'notes', note)
        await updateDoc(docRef, {
            text: text,
            name: title,
            timestamp: serverTimestamp(),
        })
    }

    return {
        setNote,
        setBoard,
        deleteNote,
        deleteBoard,
        updateNote,
    }
}

export default useFirestore;