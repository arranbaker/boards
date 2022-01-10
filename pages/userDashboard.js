import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import UserNoteBoard from "../components/userNoteBoard";
import Link from "next/link";
import { withProtected } from "../lib/route";
import { useEffect, useState } from 'react'
import { db } from "../lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useAuth } from "../lib/auth";

const UserDashbaord = () => {

    const { userId } = useAuth()

    const [boards, setBoards] = useState([])

    useEffect(() => {
        const colRef = collection(db, 'users', userId, 'boards')
        const q = query(colRef, orderBy("timestamp"));


        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const initalBoards = (querySnapshot.docs.map(doc => ({ ...doc.data() })))
            setBoards(initalBoards)
        })

        return unsubscribe
    }, [])


    return (
        <>
            <Navbar />
            <section className="user-dashboard-container">
                <motion.div className="db-boards-header-container" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="db-boards-header">
                        <h2>Your Boards</h2>
                        <Link href='/newBoard'><button className="new-post-save-button">New Board</button></Link>
                    </div>
                </motion.div>
                <UserNoteBoard boards={boards} />
            </section>
        </>
    );
}

export default withProtected(UserDashbaord);