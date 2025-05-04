import React, { useCallback, useEffect } from 'react'
import FlowEditor from './FlowEditor'
import LineChart from './LineChart'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'






const Home = () => {


    return (
        <>
            <Navbar />
            <div>
                {/* <Cards/> */}
                <LineChart />
            </div>
        </>
    )
}

export default Home
