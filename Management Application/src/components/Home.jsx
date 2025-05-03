import React, { useCallback, useEffect } from 'react'
import FlowEditor from './FlowEditor'





const Home = () => {
   

    return (
        <div>
            <nav className="navbar bg-body-tertiary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img
                            src="https://i.pinimg.com/736x/55/6c/0e/556c0e669a6af4b2a73335bbf1fc5fd2.jpg"
                            height="60"
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </a>
                </div>
            </nav>
            <div style={{width:'100%',height:"100vh"}}>
          <FlowEditor/>
            </div>
        </div>
    )
}

export default Home
