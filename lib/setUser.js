import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const setUserDetails = async (userId, username) => {

    await setDoc(doc(db, "users", userId), {
        name: username,
    });
}