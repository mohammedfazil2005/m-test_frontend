import React, { useContext, useEffect } from 'react' // React and hooks
import { Link } from 'react-router-dom' // Link for navigation
import { onGetProfile } from '../services/allAPI' // API function to fetch profile data
import { useState } from 'react'; // useState hook to manage state
import Button from 'react-bootstrap/Button'; // Button component from React-Bootstrap
import Modal from 'react-bootstrap/Modal'; // Modal component from React-Bootstrap
import { AuthContext } from '../contexts/ContextAPI'; // Authentication context for managing user session
import toast from 'react-hot-toast'; // For displaying toast notifications

const Navbar = () => {
    const [show, setShow] = useState(false); // State to control modal visibility
    const { setToken } = useContext(AuthContext) // Get setToken function from AuthContext

    const [data, setData] = useState({}) // State to store user profile data

    // Functions to open and close the modal
    const handleClose = () => setShow(false); 
    const handleShow = () => setShow(true);

    // Fetch profile data function
    const onFetchProfile = async () => {
        const header = {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}` // Fetch token from sessionStorage
        }
        try {
            const serverResponce = await onGetProfile(header) // API call to fetch profile
            if (serverResponce.status == 200) {
                setData(serverResponce.data) // Set user data if response is successful
            }
        } catch (error) {
            console.log(error) // Log any errors
        }
    }

    // Logout function
    const onLogout = () => {
        sessionStorage.clear() // Clear sessionStorage on logout
        toast.success("Logged out") // Display success message
        setToken("Logout") // Update token status in AuthContext
    }

    useEffect(() => {
        onFetchProfile() // Fetch profile data when the component mounts
    }, []) // Empty dependency array means this runs once when the component mounts

    return (
        <div>
            {/* Navbar with branding and buttons */}
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
                        {/* Button to open profile modal */}
                        <button onClick={handleShow} className='btn btn-primary'>Profile</button>
                        {/* Link to flowchart page */}
                        <Link to={'/flowchart'}><p className='btn btn-primary'>Flow chart</p></Link>
                        {/* Logout button */}
                        <button onClick={onLogout} className='btn btn-danger'>Logout</button>
                    </div>
                </div>
            </nav>

            {/* Profile Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display user profile details */}
                    <p style={{ fontWeight: '300', textTransform: 'uppercase' }}><i class="fa-solid fa-user me-2"></i>{data?.data?.name}</p>
                    <p style={{ fontWeight: '300', textTransform: 'uppercase' }}><i class="fa-solid fa-envelope me-2"></i>{data?.data?.email}</p>
                </Modal.Body>
                <Modal.Footer>
                    {/* Close button in modal */}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Navbar
