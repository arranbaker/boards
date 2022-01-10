import Navbar from "../components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ErrorPop from "../components/errorPop";

const Login = () => {

    const { login } = useAuth();
    const { register, handleSubmit } = useForm();
    const router = useRouter()

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async ({ email, password }) => {
        try {
            setError("")
            setLoading(true)
            await login(email, password);
            router.push('/userDashboard');
        } catch {
            setError('Wrong email or password')
        }
        setLoading(false)
    }


    return (
        <>
            <Navbar />
            {error && <ErrorPop error={error} setError={setError} />}
            <div className="signup-log-container" >
                <motion.section className="login-container" initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                    <div>
                        <h3>Hi, again!</h3>
                        <Link href='/'><button className="note-button button-close">X</button></Link>
                    </div>
                    <form onSubmit={handleSubmit((data) => handleLogin(data))}>
                        <label>email:</label>
                        <input {...register("email", { required: "Required", })} id="email" />
                        <label>password:</label>
                        <input {...register("password", { required: "Required", })} type='password' id='password' />
                        <button type='submit' id='login' disabled={loading}>Log In</button>
                        <Link href='/'><a>Forgot Password?</a></Link>
                    </form>

                </motion.section>
            </div>
        </>
    );
}

export default Login;