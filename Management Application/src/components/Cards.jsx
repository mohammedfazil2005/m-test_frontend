import React from 'react'

const Cards = () => {
  return (
    <div style={{background:'url("https://images.pexels.com/photos/997494/pexels-photo-997494.jpeg?cs=srgb&dl=pexels-ridoframe-997494.jpg&fm=jpg")',height:'100vh'}}>
    <div className='container'>
      <div className=" d-flex justify-content-center align-items-center gap-5">
        <div className='shadow' style={{height:"450px",border:'1px solid black',boxShadow:'0px 0px 3px',width:"300px",background:"url(https://images.unsplash.com/photo-1517841936870-0116673b9fc4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3Vuc2V0JTIwZGFya3xlbnwwfHwwfHx8MA%3D%3D)",backgroundSize:'cover'}}>
            <div className='d-flex justify-content-center flex-column align-items-center mt-5 text-white'>
            <p>Temprature(c)</p>
            <h2>16c</h2>
            </div>
            <div className='d-flex justify-content-between p-3 text-white'>
                <p>10:30</p>
                <i className="fa-solid fa-sun"></i>
            </div>

        </div>
        <div  className='shadow'style={{height:"450px",border:'1px solid black',boxShadow:'0px 0px 3px',width:"300px",background:"url(https://c0.wallpaperflare.com/preview/974/120/882/plant-leaf-fern-dark.jpg)",backgroundSize:'cover'}}>
            <div className='d-flex justify-content-center flex-column align-items-center mt-5 text-white'>
            <p>Humidity</p>
            <h2>16c</h2>
            </div>
            <div className='d-flex justify-content-between p-3 text-white'>
                <p>10:30</p>
                <i className="fa-solid fa-sun"></i>
            </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default Cards
