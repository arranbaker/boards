import StaticNote from "../components/staticNote";
import Navbar from "../components/navbar";
import { motion } from "framer-motion";
import Footer from "../components/footer";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>Welcome | boards</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='global-container'>
        <Navbar />
        <motion.div className='main-container' exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <section className='landing-text'>
            <h3 className="intro-text">Boards lets you create notes, combine your thoughts, and develop ideas.</h3>
          </section>
          <StaticNote />
          <div className='circle'></div>
        </motion.div>
      </div>
      <Footer />
    </>
  )
}