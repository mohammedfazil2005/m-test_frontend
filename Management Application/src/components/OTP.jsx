import React, { useState } from 'react'
import { onVerify } from '../services/allAPI' // API function to verify OTP
import toast from 'react-hot-toast' // Toast notifications
import { useNavigate } from 'react-router-dom' // For navigation

const OTP = () => {
    const navigate = useNavigate() // For route navigation
    const [OTP, setOTP] = useState("") // State to store OTP input
    const [loading, setLoading] = useState(false) // Loading state for spinner

    // Button click handler to verify OTP
    const onBtnClick = async () => {
        // Check if OTP length is 6
        if (OTP.length == 6) {
            try {
                setLoading(true) // Set loading to true
                const serverResponce = await onVerify(OTP) // Call the API for OTP verification
                console.log(serverResponce) // Log server response
                if (serverResponce.status == 201) {
                    toast.success("Verified successfully!") // Success message
                    setLoading(false) // Set loading to false
                    navigate('/') // Navigate to home page
                } else if (serverResponce.status == 401) {
                    toast.error(serverResponce.response.data.message) // Error message from server
                    setLoading(false) // Set loading to false
                }
            } catch (error) {
                toast.error("Something went wrong") // Catch block for errors
                setLoading(false) // Set loading to false
            }
        } else {
            toast.error("Please enter the 6 digit OTP!") // Validation failed (OTP length)
        }
    }

    return (
        <>
            {loading ? // If loading is true, show spinner
                <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div class="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <div className='container mt-3 '>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-6 p-5 d-flex flex-column gap-4">
                            <div>
                                {/* OTP request message */}
                                <h1 style={{ fontWeight: 'bolder', textTransform: 'uppercase', fontSize: "20px" }}>
                                    Please enter the OTP sent to your email/phone
                                </h1>
                                <p>(Check spam folder if you don’t see it.)</p>
                            </div>

                            {/* OTP input field */}
                            <input onChange={(e) => setOTP(e.target.value)} type="text" className='form-control p-3' placeholder='OTP' maxLength={6} />

                            {/* Submit button */}
                            <button className='btn btn-primary rounded p-2' onClick={onBtnClick}>Submit</button>
                        </div>

                        {/* Image section */}
                        <div className="col-md-6 p-2">
                            <img src="https://img.freepik.com/premium-vector/twostep-verification-flat-illustration_773186-1560.jpg?semt=ais_hybrid&w=740" class="w-100 img-fluid" alt="..." />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default OTP
