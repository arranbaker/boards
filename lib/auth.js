import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { useContext, createContext } from "react";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

    const router = useRouter()

    const [activeUser, setActiveUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('guest');

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    const logout = async () => {
        setLoading(true)
        return signOut(auth).then(router.reload())
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setActiveUser(user)
                setUserId(user.uid)
                setLoading(false)
            } if (!user) {
                setUserId('guest')
                setLoading(false)
            }
        })
        return unsubscribe
    }, [activeUser])

    const value = {
        activeUser,
        login,
        signup,
        resetPassword,
        logout,
        userId,
    }

    return (
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    );
};