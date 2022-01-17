import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

const Settings = () => {

    const router = useRouter()

    return (
        <>
            <Head>
                <title>Settings| boards</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
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