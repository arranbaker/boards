import Navbar from "../components/navbar";
import ErrorPop from "../components/errorPop";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { setUserDetails } from "../lib/setUser";
import { updateProfile } from "firebase/auth";

const Signup = () => {

    const { signup, activeUser, userId } = useAuth();
    const { handleSubmit, register } = useForm();
    const router = useRouter();

    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState()
    const [loading, setLoading] = useState(false)

    const handleSignup = async ({ email, password, username, passwordConfirm }) => {
        if (password === passwordConfirm) {
            setError("")
            setLoading(true)
            await signup(email, password)
                .then(async (auth) => {
                    console.log(auth)
                    await updateProfile(auth.user, {
                        displayName: username
                    })
                    router.push('/userDashboard')
                })
                .catch((e) => {
                    setError('Sorry, something went wrong.')
                })
            setLoading(false)
        } else {
            setError('Password not the same.')
        }
    }

    return (
        <>
            <Navbar />
            {error && <ErrorPop error={error} setError={setError} errorMessage={errorMessage} />}
            <div className="signup-log-container">
                <motion.section className="signup-container" initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <div>
                        <h3>Create an account</h3>
                        <Link href='/'><button className="note-button button-close">X</button></Link>
                    </div>
                    <form onSubmit={handleSubmit((data) => handleSignup(data))}>
                        <label>name:</label>
                        <input {...register("username", { required: "Required", })} id='username' />
                        <label>email:</label>
                        <input {...register("email", { required: "Required", })} id='email' />
                        <label>password:</label>
                        <input {...register("password", { required: "Required", })} type='password' id='password' />
                        <label>confirm password:</label>
                        <input {...register("passwordConfirm", { required: "Required", })} type='password' id='confirmPassword' />
                        <button type='submit'>Sign Up</button>
                    </form>
                </motion.section>
            </div>
        </>
    );
}

export default Signup;