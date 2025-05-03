import React, { useState } from 'react'
import { onVerify } from '../services/allAPI'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const OTP = () => {
    const navigate = useNavigate()
    const [OTP, setOTP] = useState("")
    const [loading,setLoading]=useState(false)


    const onBtnClick = async () => {
        if (OTP.length == 6) {
            try {
                setLoading(true)
                const serverResponce = await onVerify(OTP)
                console.log(serverResponce)
                if (serverResponce.status == 201) {
                    
                    toast.success("Verfied succesfully!")
                    setLoading(false)
                    navigate('/')
                } else if (serverResponce.status == 401) {
             
                    toast.error(serverResponce.response.data.message)
                    setLoading(false)
                }
            } catch (error) {
             
                toast.error("Something went wrong")
                setLoading(false)
            }
        } else {
            toast.error("Please enter the 6 digit OTP!")
        }
    }

   


    return (
        <>
            {loading ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>

                <div class="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div> : <div className='container mt-3 '>
                <div className="row d-flex align-items-center">
                    <div className="col-md-6 p-5 d-flex flex-column gap-4">
                        <div>
                            <h1 style={{ fontWeight: 'bolder', textTransform: 'uppercase', fontSize: "20px" }}>Please enter the OTP sent to your email/phone</h1>
                            <p>(Check spam folder if you don’t see it.)</p>
                        </div>
                        <input onChange={(e) => setOTP(e.target.value)} type="text" className='form-control p-3' placeholder='OTP' maxLength={6} />
                        <button className='btn btn-primary rounded p-2' onClick={onBtnClick}>Submit</button>
                    </div>
                    <div className="col-md-6 p-2">
                        <img src="https://img.freepik.com/premium-vector/twostep-verification-flat-illustration_773186-1560.jpg?semt=ais_hybrid&w=740" class="w-100 img-fluid" alt="..." />
                    </div>

                </div>
            </div>}

        </>
    )
}

export default OTP
