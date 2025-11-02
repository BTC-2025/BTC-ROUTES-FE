import React from 'react'
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Internship from '../Internship/Internship';
import Projects from '../Projects/Projects';
import Benefits from '../Benefits/Benefits';
import Apply from '../Apply/Apply';
// import Batches from './components/Batches/Batches';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';



const Home = () => {
  return (
    <div>
        <Header />
        <Hero />
        <About />
        <Internship />
        <Projects />
        <Benefits />
        <Apply />
        {/* <Batches /> */}
        <Contact />
        <Footer />
        <ScrollToTop />          
    </div>
  )
}

export default Home
