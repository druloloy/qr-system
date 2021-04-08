import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import QRCode from 'qrcode';

const Result = () => {
    const location = useLocation();
    // eslint-disable-next-line
    const [ errorMessage, setErrorMessage ] = useState('');

    const [qrcode, setQrCode] = useState('');

    useEffect(() => {
        if(!location.state) window.location = '/welcome'
        async function fetchData(){
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
            await axios.get(`/api/students/${location.state.params}`)
                .then(res=>res.data)
                .then(data=>{
                    QRCode.toDataURL(data.studID,options,
                        (err, res)=>{
                            if(err) return setErrorMessage(err);
    
                            setQrCode(res);
                        })
                })
                .catch(error=>{
                    setErrorMessage(error);
                })
        }
        fetchData(); 
    }, [location.state]);
    return !qrcode?(
        <div className="result-page">
            <h1>Loading...</h1>
        </div>
    ):errorMessage?(
        <div className="result-page">
            <h3>{errorMessage}</h3>
        </div>
    )
    :(
        <div className="result-page">
            <h1>You're all set!</h1>
            <a href={qrcode} download="qrcode-attendance"><img src={qrcode} alt="QR code" /></a>
            <p>Click the QR code to download.</p>
            <button onClick={()=>window.location="/welcome"} className="btn btn-green">finish</button>
        </div>
    )
}

export default Result;