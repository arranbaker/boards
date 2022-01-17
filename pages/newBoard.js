import useFirestore from "../lib/useFirestore";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Head from "next/head";

const NewBoard = () => {

    const { setBoard } = useFirestore();
    const { register, handleSubmit } = useForm();
    const router = useRouter()

    const createBoard = ({ title }) => {
        setBoard(title)
        router.push('/userDashboard')
    }

    return (
        <>
            <Head>
                <title>New Board | boards</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar />
            <motion.div className="new-board-container" initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="new-board-form-container">
                    <div className="new-board-form-header">
                        <h3>New Board</h3>
                        <Link href='/userDashboard'><button className="note-button button-close">X</button></Link>
                    </div>
                    <form className="new-board-form" onSubmit={handleSubmit((data) => createBoard(data))}>
                        <label>Title</label>
                        <input type='text' {...register("title", { required: "Required", })} />
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </motion.div>
        </>
    );

}

export default NewBoard;