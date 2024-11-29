import React from 'react'
import Category from '../components/Category'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <Category />
            <ProductList />
            <Footer/>
        </>
    )
}

export default Home