import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegistrationForm'
import { Route, Routes } from 'react-router-dom'
import Loginform from './components/Loginform'

function App() {

  return (
    <Routes>
      <Route path="/" element={<RegistrationForm></RegistrationForm>}></Route>
      <Route path='/login' element={<Loginform></Loginform>}></Route>
    </Routes>
  )
}


export default App
