import Note from "./note";
import { useEffect, useState } from "react";
import useFirestore from "../lib/useFirestore";
import { motion } from "framer-motion";

const UserNoteBoard = ({ boards }) => {

    const { setNote, deleteBoard } = useFirestore()

    const [listItem, setListItem] = useState(0)

    const createNote = (boardName) => {
        setNote(boardName)
    }

    const handleBoardDelete = (boardName) => {
        deleteBoard(boardName)
        setListItem(1)
    }

    useEffect(() => {
        setListItem(boards.length - 1)
    }, [boards])

    if (boards.length === 0) {
        return <motion.h2 exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Welcome, to boards. Start by adding a board.</motion.h2>
    } else {
        return (
            <>
                <section className="user-note-board-list">
                    {boards.map((boardListItem, boardListItemIndex) => {
                        if (boardListItem) {

                            return (
                                <ul>
                                    <li key={boardListItemIndex} id={boardListItemIndex} onClick={(event) => setListItem(boardListItemIndex)} style={{ background: boardListItemIndex === listItem ? '#DED479' : '#ACF3DA' }} className="board-list-item" >{boardListItem.name}</li>
                                </ul>
                            )
                        } else return null
                    })}
                </section>
                {boards.map((board, boardIndex) => {
                    if (boardIndex === listItem) {
                        return (
                            <motion.section className={`note-board note-board-${boardIndex + 1}`} id={`board-reference-${boardIndex}`} key={boardIndex} exit={{ y: -400, opacity: 0 }} initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                <div className="note-board-header">
                                    <h3>{board.name}</h3>
                                    <div className="board-buttons">
                                        <button className="new-post-save-button" onClick={() => createNote(board.name)}>New Note</button>
                                        <button className='note-button button-close' onClick={() => handleBoardDelete(board.name)}>X</button>
                                    </div>
                                </div>
                                <div className="user-board-notes-container">
                                    <div className="user-board-notes">
                                        <Note boardName={board.name} />
                                    </div>
                                </div>
                            </motion.section>
                        )
                    }
                })}
            </>
        )
    }
}

export default UserNoteBoard;