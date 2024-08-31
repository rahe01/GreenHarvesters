import { Outlet } from 'react-router-dom'

import Footer from '../components/Shared/Footer/Footer'
import Nav from '../components/Shared/Navbar/Nav'
const Main = () => {
  return (
    <div>
    
      <Nav></Nav>
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
