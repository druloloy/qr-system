import React, { useState } from 'react'
import axios from 'axios';
import QRCode from 'qrcode';
import Navbar from '../components/Navbar';

import {MdErrorOutline} from 'react-icons/md';

const QRhandler = ({qrcode}) => {
    return (
    <div className="image-holder">
        <a href={qrcode} download="qrcode-attendance" className="image-view">
            <img src={qrcode} id="qr" alt="QR code" />
        </a>
        <p>Click the QR code to download.</p>
    </div>
    )
}

const FindQR = () => {
    
    const [ qrcode, setQRCode ] = useState('');
    const [ studID, setStudID ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ errorStatus, setErrorStatus ] = useState(false);

    const findMyQR = async (e) => {
        e.preventDefault();
        setQRCode("");
        const options = {
            errorCorrectionLevel: 'high',
            width: 200,
            type: 'image/png',
            quality: 1,
            color: {
                dark: "#222",
                light: "#fff"
            }
        }
        await axios.get(`/api/students/${studID}`)
            .then(res=>res.data)
            .then(data=>{
                QRCode.toDataURL(data.studID,
                    options,
                    (err, res)=>{
                        if(err) return setErrorMessage(err);
                        setErrorMessage("");
                        setErrorStatus(false);
                        setQRCode(res);
                        
                    })
            })
            .catch(err=>{
                setErrorStatus(true);
                if(err.response){
                        const error = err.response.data.error.split(',');
                        console.log(error);
                    
                }
                if(err.request){
                    if(err.request.status === 0){
                        setErrorMessage("Please check your network connection. If error persists consult your admin.");
                    }
                    if(err.request.status === 404){
                        console.log(err.request)
                        setErrorMessage("Student not found.");
                    }
                }
                else{
                    setErrorMessage('Unknown error has occured. Please contact the admin.');
                }
            })
    }
    const errorStyle = {
        display: errorStatus? "flex": "none"
    }
    return (
        <div className="find-page">
            <Navbar path="/welcome" title="Home"/> 
            <h1>Find My QR Code</h1>
            <form onSubmit={findMyQR}>
                {
                    qrcode? <QRhandler qrcode={qrcode}/>: <></>
                }

                <div style={errorStyle} className="error-div" id="error-handled">
                    <MdErrorOutline style={{fontSize:"2rem"}}/>{errorMessage}
                </div>

                <div className="form-control full">
                    <label htmlFor="id_finder">Student ID</label>
                    <input
                    id="id_finder" 
                    type="text"
                    placeholder="XX-XXXXX"
                    pattern="^(\d{2}-\d{5})$"
                    required="yes"
                    onChange={(e)=>setStudID((name)=>name=e.target.value)}
                    />
                    <button className="btn full btn-green">find</button>
                </div>
            </form>
        </div>
    )
}

export default FindQR
