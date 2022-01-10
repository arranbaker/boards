import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";
import ErrorPop from "./errorPop";

const Navbar = () => {

    const { activeUser, logout } = useAuth();
    const router = useRouter();

    const [error, setError] = useState(false)

    const handleLogout = () => {
        logout()
    }

    return (
        <nav>
            {activeUser ? <Link href='/userDashboard'><h1>Boards.</h1></Link> : <Link href='/'><h1>Boards.</h1></Link>}
            <div className="links">
                {!activeUser && <Link href='/login'><a>Login</a></Link>}
                {!activeUser && <Link href='/signup'><a>Sign Up</a></Link>}
                {activeUser && <h3>Hi, {activeUser.displayName} </h3>}
                {activeUser && <Link href='/settings'><img className='settings-icon' src='img/settings.png' /></Link>}
                {activeUser && <a onClick={handleLogout} className='logout-button'>Log Out</a>}
            </div>
            {error && <ErrorPop setError={setError} />}
        </nav>
    );
}

export default Navbar;