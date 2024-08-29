import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'

import Nav from '../components/Shared/Navbar/Nav'
const Main = () => {
  return (
    <div>
      <Navbar />
      <Nav></Nav>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      
    </div>
  )
}

export default Main
