import React from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <section className='flexCenter flex-col h-screen gap-6 text-4xl'>
      <Link to='/signup'>SignUp</Link>
      <Link to='/logon'>Login</Link>
    </section>
  )
}

export default Home