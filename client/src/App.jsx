import React from 'react'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'
import CreateFundRaiser from './pages/CreateFundRaiser'
import FundRaiserDetails from './pages/FundRaiserDetails'
import NewRequest from './pages/NewRequest'
import Requests from './pages/Requests'
import { Routes,Route } from 'react-router-dom'
import ScrollToAnchor from './utils/ScrollToAnchor'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col overflow-x-hidden'>
      <ScrollToAnchor />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:id' element={<Profile />} />
        <Route path='/create-fundraiser' element={<CreateFundRaiser />} />
        <Route path='/fundraiser-details/:id' element={<FundRaiserDetails />} />
        <Route path='/fundraiser-details/:id/new-request' element={<NewRequest />} />
        <Route path='/fundraiser-details/:id/requests' element={<Requests />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App