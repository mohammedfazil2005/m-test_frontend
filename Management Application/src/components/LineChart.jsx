import React, { useEffect, useState } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { io } from 'socket.io-client'
import baseURL from '../services/baseURL'
import { data } from 'react-router-dom'


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)
const LineChart = () => {
    const socket=io(baseURL)
    const [labels, setLabels] = useState([]);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidity,setHumidity]=useState([])
    const [tempM,setTempM]=useState([])
    const [humM,setumM]=useState([])
    
    const totalTemp=5
    useEffect(()=>{
        socket.on("payload",(mess)=>{
            const currentTime=new Date().toLocaleTimeString()
            setLabels((prev)=>{
            const newLabel= [...prev,currentTime]
            if(newLabel.length>totalTemp){
                newLabel.shift()
            }
            return newLabel
            })
            setTemperatureData((prev)=>{
                const newTemp=[...prev,mess.temperature]
                if(newTemp.length>totalTemp){
                    newTemp.shift()
                }
             
                return newTemp
            })
            setHumidity((prev)=>{
                const newHumidity=[...prev,mess.humidity]
                if(newHumidity.length>totalTemp){
                    newHumidity.shift()
                }
                return newHumidity
            })
            setTempM((prev) => {
                const payload={time:currentTime,data:mess.temperature}
                const newData = [...prev, payload];
                return newData.length > totalTemp ? newData.slice(-totalTemp) : newData;
              });
             setumM((prev)=>{
                const payload={time:currentTime,data:mess.humidity}
                const newData = [...prev, payload];
                return newData.length > totalTemp ? newData.slice(-totalTemp) : newData;
             }) 
            
       
        })
        return () => socket.off("payload"); 
    },[])


    const Linedata = {
        labels: labels, 
        datasets: [
          {
            label: "Temperature (°C)",
            data:temperatureData, 
            borderColor: "rgba(54, 162, 235, 1)", 
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
            pointBorderColor: "#fff",
            pointRadius: 6,
            pointHoverRadius: 8,
            tension: 0.4, 
            fill: true,
          },
          {
            label: "Humidity (%)", 
            data: humidity, 
            borderColor: "rgba(255, 99, 132, 1)", 
            backgroundColor: "rgba(255, 99, 132, 0.2)", 
            pointBackgroundColor: "rgba(255, 99, 132, 1)", 
            pointBorderColor: "#fff", 
            pointRadius: 6, 
            pointHoverRadius: 8, 
            tension: 0.4, 
            fill: true, 
          },
        ],
      };
      
      

      const Lineoptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#333",
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
          tooltip: {
            backgroundColor: "#000",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#ccc",
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#333",
              font: {
                size: 12,
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "#333",
              font: {
                size: 12,
              },
              callback: function (value) {
                return value;
              },
            },
            grid: {
              color: "#eee",
            },
          },
        },
      };

     




  return (
    <>
    <div className='container'>
      <div className=" d-flex justify-content-center align-items-center gap-5 box-parent">
        <div  style={{height:"450px",border:'1px solid black',boxShadow:'0px 5px 3px',width:"350px",background:"black",backgroundSize:'cover',borderRadius:'50px'}}>
            <div className='d-flex justify-content-center flex-column align-items-center mt-5 text-white'>
            <p>Temprature(c)</p>
            <h2>{tempM.length>0?`${tempM[tempM.length-1].data}°C`:'N/A'}</h2>
            </div>
           {tempM?.map((a)=>(
            <div className='d-flex justify-content-between p-3 text-white'>
            <p>{a.time}</p>
            <h6>{a.data}c <i className="fa-solid fa-sun"></i></h6>
           
        </div>
           ))}
        </div>
        <div style={{height:"450px",border:'1px solid black',boxShadow:'0px 5px 3px',width:"350px",background:"black",backgroundSize:'cover',borderRadius:'50px'}}>
            <div className='d-flex justify-content-center flex-column align-items-center mt-5 text-white'>
            <p>Humidity</p>
            <h2>{humM.length>0?`${humM[humM.length-1].data}%`:'N/A'}</h2>
            </div>
           {humM?.map((a,key)=>(
             <div className='d-flex justify-content-between p-3 text-white'>
             <p>{a.time}</p>
             <h6>{a.data}%<i class="fa-solid fa-water"></i></h6>
         </div>
           ))}

        </div>
      </div>
    </div>
    <div className='d-flex justify-content-center flex-column align-items-center' style={{marginTop:'60px'}}>
        <p>Chart showing live updates of Humidity and Temprature</p>
    </div>
    <div className='w-100 container mt-3' style={{height:'100vh'}}>
      <Line options={Lineoptions} data={Linedata}/>
      
    </div>
    </>
  )
}

export default LineChart
