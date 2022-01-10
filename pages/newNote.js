import useFirestore from "../lib/useFirestore";
import Link from "next/link";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const NewBoard = ({ boardName }) => {

    const { setNote } = useFirestore();
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    console.log(boardName)

    const createNote = ({ title }) => {
        setNote(title, boardName)
        router.push('/userDashboard')
    }

    return (
        <>
            <Navbar />
            <div className="new-board-container">
                <div className="new-board-form-container">
                    <div className="new-board-form-header">
                        <h3>New Note</h3>
                        <Link href='/userDashboard'><button className="note-button button-close">X</button></Link>
                    </div>
                    <form className="new-board-form" onSubmit={handleSubmit((data) => createNote(data))}>
                        <label>Title</label>
                        <input type='text' {...register("title", { required: "Required", })} />
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
        </>
    );

}

export default NewBoard;