import React from 'react' 
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLatter from '../components/NewsLatter'
import Footer from '../components/Footer'
import Features from '../components/Features'
import Sponsors from '../components/Sponsors'

const Home = () => {
return(
    <>
        <Navbar /> 
        <Header />
        <BlogList />
        <Sponsors />
        <Features />
        <NewsLatter />
        <Footer />
    </>
)

} 

export default Home