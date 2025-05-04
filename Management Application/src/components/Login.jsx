import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { onLogin, onRegister } from '../services/allAPI'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/ContextAPI'

const Login = () => {

    const navigate = useNavigate() // for navigating to other routes
    const { setToken } = useContext(AuthContext) // access global token setter

    // State to switch between Login/Register
    const [current, setCurrent] = useState("Login")

    // Form data state
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    // Loading state for spinner
    const [loading, setLoading] = useState(false)

    // Toggle between Login and Register view
    const onStateChange = () => {
        current == "Login" ? setCurrent("Register") : setCurrent("Login")
    }

    // Main button click handler
    const onBtnClick = async () => {
        if (current == "Register") {
            // Validation
            if (data.name && data.email && data.password) {
                setLoading(true)
                try {
                    const serverResponce = await onRegister(data) // API call
                    console.log(serverResponce.status)
                    if (serverResponce.status == 201) {
                        setLoading(false)
                        toast.success("OTP sent succesfully!") // OTP success
                        navigate('/otp') // Go to OTP page
                    } else if (serverResponce.status == 409) {
                        setLoading(false)
                        toast.error('User already exists') // User exists
                    }
                } catch (error) {
                    setLoading(false)
                    toast.error("Something went wrong!") // Catch block
                }
            } else {
                toast.error("All fields are required!") // Validation failed
            }
        } else {
            // Login block
            if (data.email && data.password) {
                try {
                    setLoading(true)
                    const serverResponce = await onLogin(data) // API call
                    console.log(serverResponce)
                    if (serverResponce.status == 200) {
                        // Save token and navigate to home
                        sessionStorage.setItem("token", serverResponce.data.token)
                        setToken(true)
                        toast.success("Login success")
                        navigate('/')
                        setLoading(false)
                    } else {
                        setLoading(false)
                        toast.error(serverResponce.response.data.message) // Error message from server
                    }
                } catch (error) {
                    setLoading(false)
                    toast.error("Something went wrong") // Catch block
                }
            } else {
                toast.error("All fields are required!") // Validation failed
            }
        }
    }

    return (
        <div className='container mt-3 '>
            <>
                {
                    loading ? // If loading is true, show spinner
                        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        :
                        // Main UI starts here
                        <div className="row d-flex align-items-center">
                            <div className="col-md-6 p-5 d-flex flex-column gap-4">
                                <div>
                                    {/* Title and toggle link */}
                                    <h1 style={{ fontWeight: 'bolder', textTransform: 'uppercase', fontSize: "40px" }}>
                                        {current == "Login" ? "Login to your account" : "Create an account"}
                                    </h1>
                                    <p>
                                        {current == "Login" ? "Don't have an account?" : "Already have an account?"}
                                        <span className='ms-2' onClick={onStateChange} style={{ color: 'blueviolet', textDecoration: 'underline', cursor: 'pointer' }}>
                                            {current == "Login" ? "Register" : "Login"}
                                        </span>
                                    </p>
                                </div>

                                {/* Name field only in Register */}
                                {
                                    current == "Register" ?
                                        <input onChange={(e) => setData({ ...data, name: e.target.value })} type="text" className='form-control' placeholder='name' />
                                        : ""
                                }

                                {/* Common Email and Password fields */}
                                <input onChange={(e) => setData({ ...data, email: e.target.value })} type="text" className='form-control' placeholder='email' />
                                <input onChange={(e) => setData({ ...data, password: e.target.value })} type="password" className='form-control' placeholder='password' max={6} />

                                {/* Terms checkbox only in Register */}
                                {
                                    current == "Register" ?
                                        <div className='d-flex align-items-center gap-2'>
                                            <input type="checkbox" />
                                            <p>I agree to the <span>Terms&Conditions</span></p>
                                        </div>
                                        : ""
                                }

                                {/* Button for Login/Register */}
                                <button onClick={onBtnClick} className='btn btn-primary rounded p-2'>
                                    {current == "Login" ? "Login" : "Create Account"}
                                </button>
                            </div>

                            {/* Right side image */}
                            <div className="col-md-6 p-2">
                                {
                                    current == "Login" ?
                                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-security-illustration-download-in-svg-png-gif-file-formats--account-secure-user-pack-files-folders-illustrations-7271013.png" class="w-100 img-fluid" alt="..." />
                                        :
                                        <img src='https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?semt=ais_hybrid&w=740' class="w-100 img-fluid" alt="..." />
                                }
                            </div>
                        </div>
                }
            </>
        </div>
    )
}

export default Login
