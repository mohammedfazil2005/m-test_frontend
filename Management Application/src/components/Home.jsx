import React, { useCallback, useEffect } from 'react'
import FlowEditor from './FlowEditor'
import LineChart from './LineChart'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'






const Home = () => {
   

    return (
        <div>
            <Navbar/>
            {/* <div className="container">
                <LineChart/>
            </div> */}
          <div>
                {/* <Cards/> */}
                <LineChart/>
                </div>
            
    
           
        </div>
    )
}

export default Home
