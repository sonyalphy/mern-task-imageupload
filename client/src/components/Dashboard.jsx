import React, { useContext, useEffect, useState } from 'react'
import {AuthContext} from './contexts/AuthContext'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default function Dashboard({history}) {
    const {user, signedIn} = useContext(AuthContext);
    const [photos, setPhotos] = useState([])
    const[isOpen, setIsOpen] = useState(true)
    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [photoStatus, setPublic] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    useEffect(() => {
        axios({
            url: 'http://localhost:8000/u/',
            method: 'GET',
            data: { id: user.uid},
            headers: { id: user.uid , contentType: 'application/json'}
        })
        .then(res => {
            console.log(res);
            setPhotos(res.data)
        })
    }, [])
    const getPhotos = () => {
        axios({
            url: 'http://localhost:8000/u/',
            method: 'GET',
            data: { id: user.uid},
            headers: { id: user.uid , contentType: 'application/json'}
        })
        .then(res => {
            console.log(res);
            setPhotos(res.data)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setUploading(true)
        const ext = photo.type.split('/')
        console.log(ext);
        const data = new FormData()
        data.append('name', photo.name)
        data.append('file', photo)
        data.append('ext', ext[1])
        data.append('uid', user.uid)
        data.append('visible', photoStatus)
        if(photo.size > 300000){
            setError('File size must be less than 500kb')
            setUploading(false)
            return
        }
        if(ext[0] == 'image'){
            setError('')
            axios({
                url: 'http://localhost:8000/upload',
                method: 'POST',
                data
            })
            .then(res => {
                console.log(res);
                setPhotos('')
                setName('')
                setPublic(false)
                setUploading(false)
                setIsOpen(false)
                getPhotos()
            })
            .catch(err => {
                console.log(err)
                setUploading(true)
            })
        }
    }
    return (
        
        <div className="container">
            <div className={isOpen ? 'modal-custom card none' : 'card modal-custom mt-3'}>
                <div className="card-header d-flex align-items-center justify-content-between">
                    <strong className="lead">Upload File</strong>
                    <button className="btn btn-danger" onClick={e => setIsOpen(true)}>Close</button>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {/* <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" required placeholder="Name for this image" className="form-control" value={name} onChange={e => setName(e.target.value) } />
                                <small id="passwordHelpBlock" class="form-text text-muted">
                                    Try to give a unique name to your image.
                                </small>
                            </div> */}
                            {/* <br/> */}
                            <div className="">
                                <label htmlFor="file" className="fileInput bg-info">Select File</label>
                                <input type="file" required id="file" accept=".png,.jpg,.jpeg,.svg" onChange={e => {
                                        setPhoto(e.target.files[0])
                                    }
                                } name="" style={{display:'none'}}/>
                                {}
                            </div>
                        </div>
                        <div className="form-group">
                            <select className="form-control" value={photoStatus} onChange={e => setPublic(e.target.value)}>
                                <option value="true">Public</option>
                                <option value="false">Private</option>
                            </select>
                        </div>
                        {uploading ? (
                            <button className="btn btn-primary btn-block mt-3" disabled={uploading}>Uploading</button>
                        ) : (
                            <button className="btn btn-primary btn-block mt-3">Upload</button>
                        )}
                        
                    </form>
                </div>
            </div>
            {user ? (
                <div className="card my-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <strong className="" style={{fontWeight: 'bold !important', color: '#555'}}>{user.email}</strong>
                        <button className="btn btn-primary" onClick={e => setIsOpen(false)}>Upload</button>
                    </div>
                    <div className="card-body">
                        {photos.length ? (
                           <div className="photos">
                               {photos.map(photo => (
                                <div className="photo-card" key={photo._id}>
                                        <img src={'data:image/'+ photo.ext +';base64,' + photo.photoURL} alt="" />
                                        <a href={'data:image/'+ photo.ext +';base64,' + photo.photoURL} download={photo.name} className="download"> <i className="fas fa-download"></i></a>
                                </div>
                               ))}
                           </div>
                        ) : (
                            <div className="alert alert-primary">No Photos</div>
                        )}
                    </div>
                </div>
            ) : (
                <Redirect to="/signin" />
            )}
        </div>
    )
}
