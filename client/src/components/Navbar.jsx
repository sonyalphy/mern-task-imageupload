import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import app from '../firebase/config'
import {AuthContext} from './contexts/AuthContext'
export default function Navbar() {
    const { user } = useContext(AuthContext);
    return (
        <div className="container-fluid bg-dark">
            <nav className=" container navbar navbar-dark d-flex">
                <Link to={user ? '/' : '/signin'} className="navbar-brand" href="#">PhotoGallery</Link>
                <div className="links d-flex">
                    {!!user ? (
                        <>
                            <button className="btn btn-danger" onClick = {() => {app.auth().signOut();} }>Logout</button> 
                        </>
                        ) : (
                        <>
                            <Link className="nav-link text-white" to='/signup'>Signup</Link>
                            <Link className="nav-link text-white" to='/signin'>Login</Link>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}
