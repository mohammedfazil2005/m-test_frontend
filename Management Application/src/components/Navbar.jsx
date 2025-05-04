import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div>
       <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand">
                        <img
                            src="https://i.pinimg.com/736x/55/6c/0e/556c0e669a6af4b2a73335bbf1fc5fd2.jpg"
                            height="60"
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </Link>
                    <div className='d-flex gap-2'>
                    <Link to={'/flowchart'}><p className='btn btn-primary'>profile</p></Link> 
                   <Link to={'/flowchart'}><p className='btn btn-primary'>Flow chart</p></Link> 
                   </div>
                  
                </div>
            </nav>
    </div>
  )
}

export default Navbar
