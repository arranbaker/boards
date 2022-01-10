import Navbar from "../components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Settings = () => {

    const router = useRouter()

    return (
        <>
            <Navbar />
            <motion.section className="settings-container" initial={{ y: 400, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="settings-header">
                    <h3>Settings</h3>
                    <button className='note-button button-close' onClick={() => router.back()}>X</button>
                </div>
            </motion.section>
        </>
    );
}

export default Settings;