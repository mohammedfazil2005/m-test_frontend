import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { onGetProfile } from '../services/allAPI'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../contexts/ContextAPI';
import toast from 'react-hot-toast';


const Navbar = () => {
    const [show, setShow] = useState(false);
    const {setToken}=useContext(AuthContext)

    const [data,setData]=useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFetchProfile=async()=>{
        const header={
            'Authorization':`Bearer ${sessionStorage.getItem('token')}`
        }
        try {
            const serverResponce=await onGetProfile(header)
            if(serverResponce.status==200){
                setData(serverResponce.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onLogout=()=>{
        sessionStorage.clear()
        toast.success("Logged out")
        setToken("Logout")
    }

    useEffect(()=>{
        onFetchProfile()
    },[])



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
                    <button onClick={handleShow} className='btn btn-primary'>Profile</button> 
                   <Link to={'/flowchart'}><p className='btn btn-primary'>Flow chart</p></Link> 
                   <button onClick={onLogout} className='btn btn-danger'>Logout</button> 
                   </div>
                  
                </div>
            </nav>
            <>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <p style={{fontWeight:'300',textTransform:'uppercase'}}><i class="fa-solid fa-user me-2"></i>{data?.data?.name}</p>
          <p style={{fontWeight:'300',textTransform:'uppercase'}}><i class="fa-solid fa-envelope me-2"></i>{data?.data?.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </>
    </div>
  )
}

export default Navbar
