import Navbar from "../components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorPop from "../components/errorPop";
import MessagePop from "../components/messagePop";
import Head from "next/head";

const PasswordReset = () => {

    const { resetPassword } = useAuth();
    const { register, handleSubmit } = useForm();
    const router = useRouter()

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async ({ email }) => {
        setLoading(true)
        await resetPassword(email)
            .then(() => {
                setMessage('Password reset sent!')
            })
            .catch((error) => {
                setError(error.code)
            })
        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Reset | boards</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navbar />
            {error && <ErrorPop error={error} setError={setError} />}
            {message && <MessagePop message={message} setMessage={setMessage} />}
            <div className="signup-log-container" >
                <motion.section className="login-container" initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                    <div>
                        <h3>Try, this!</h3>
                        <Link href='/'><button className="note-button button-close">X</button></Link>
                    </div>
                    <form onSubmit={handleSubmit((data) => handlePasswordReset(data))}>
                        <label>email:</label>
                        <input {...register("email", { required: "Required", })} id="email" />
                        <button type='submit' id='reset' disabled={loading}>Send</button>
                    </form>
                </motion.section>
            </div>
        </>
    );
}

export default PasswordReset;