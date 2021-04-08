import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';
import {MdErrorOutline} from 'react-icons/md';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Form = () => {

    const history = useHistory();

    // error message
    const [ errorMessage, setErrorMessage ] = useState('');

    // basic informations
    const [ fName, setFName ] = useState('');
    const [ mName, setMName ] = useState('');
    const [ lName, setLName ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ birthdate, setBirthdate ] = useState(Date.now);

    // contact informations
    const [ email, setEmail ] = useState('');
    const [ contactNumber, setContactNumber ] = useState('');
    const [ addressLine1, setAddressLine1 ] = useState('');
    const [ addressLine2, setAddressLine2 ] = useState('');

    // school information
    const [ studentID, setStudentID ] = useState('');
    const [ yearLevel, setYearLevel ] = useState('');
    const [ course, setCourse ] = useState('');
    const [ section, setSection ] = useState('');

    // agree to the data usage condition
    // eslint-disable-next-line
    const [ agreeCondition, setAgreeCondition ] = useState(false);

    // error style
    const errorStyle = {
        display: errorMessage? "flex": "none"
    }

    const formSubmit = async (e)=>{
        const data = {
            first_name: fName,
            middle_name: mName,
            last_name: lName,
            contact_number: contactNumber,
            address_line1: addressLine1,
            addres_line2: addressLine2,
            student_id: studentID,
            year_level: yearLevel,
            birthdate,
            section,
            gender,
            course,
            email,
        }
        e.preventDefault();
        // forward the form to the server
        await axios.post('/api/students/add', data)
            .then(res=>{
                history.push('/result', 
                {
                    params: studentID
                });
            })
            .catch(err=>{
                if(err.response){
                const error = err.response.data.error.split(',');
                console.log(err.response)
                setErrorMessage(error[0])
            }
            else if(err.request){
                if(err.request.status === 0){
                    setErrorMessage("Please check your network connection. If error persists consult your admin.");
                }
            }
            else{
                setErrorMessage('Unknown error has occured. Please contact the admin.');
            }
            
        })    
    }
    return (
        <div className="form-page">
            <h1>Fill out to generate QR code.</h1>
            <form onSubmit={formSubmit} className="form">
                <div id="basic-information">
                    <label htmlFor="first_name">Full Name</label>
                    <div className="form-control">

                        <input 
                            type="text"
                            id="first_name"
                            placeholder="First Name"
                            required="yes"
                            onChange={(e)=>setFName((name)=>name=e.target.value)}
                        />
                        <input 
                            type="text"
                            id="middle_name"
                            placeholder="Middle Name"
                            required="no"
                            onChange={(e)=>setMName((name)=>name=e.target.value)}
                        />
                        <input 
                            type="text"
                            id="last_name"
                            placeholder="Last Name"
                            required="yes"
                            onChange={(e)=>setLName((name)=>name=e.target.value)}
                        />
                    </div>

                    <label htmlFor="gender">Gender</label>
                    <div className="form-control closed">
                        <label htmlFor="gender-male">
                            <input 
                                id="gender-male"
                                type="radio" 
                                name="gender"
                                value="Male"
                                onChange={(e)=>setGender((gen)=>gen=e.target.value)}
                                required="yes"
                            />
                            -Male
                        </label>
                        <label htmlFor="gender-female">
                            <input 
                                id="gender-female"
                                type="radio"
                                name="gender"
                                value="Female" 
                                onChange={(e)=>setGender((gen)=>gen=e.target.value)}
                            />
                            -Female
                        </label>
                        <label htmlFor="gender-other">
                            <input 
                                id="gender-other"
                                type="radio"
                                name="gender" 
                                value="Other"
                                onChange={(e)=>setGender((gen)=>gen=e.target.value)}
                            />
                            -Other
                        </label>
                    </div>
                    <label htmlFor="birthdate">Birthdate</label>
                    <div className="form-control">
                        <DatePicker 
                            id="birthdate"
                            className="datepicker"
                            selected={birthdate}
                            required="yes"
                            onChange={(e)=>setBirthdate(e)}
                        />
                    </div>

                </div>
                <div id="contact-information">
                    <label htmlFor="email_address">Email Address</label>
                        <div className="form-control full">
                            <input 
                                type="email"
                                id="email_address"
                                placeholder="email@example.com"
                                required="yes"
                                onChange={(e)=>setEmail((email)=>email=e.target.value)}
                            />
                        </div>
                    <label htmlFor="contact_number">Contact Number</label>
                        <div className="form-control full">
                            <input 
                                type="text"
                                id="contact_number"
                                placeholder="09xxxxxxxxx"
                                pattern="(09\d{9})"
                                required="yes"
                                onChange={(e)=>setContactNumber((contact)=>contact=e.target.value)}
                            />
                        </div>
                    <label htmlFor="address_line1">Address Line 1</label>
                    <div className="form-control full">
                        <input 
                                type="text"
                                id="address_line1"
                                placeholder="Required"
                                required="yes"
                                onChange={(e)=>setAddressLine1((address)=>address=e.target.value)}
                        />
                    </div>
                    <label htmlFor="address_line2">Address Line 2</label>
                    <div className="form-control full">
                        <input 
                                type="text"
                                id="address_line2"
                                placeholder="Optional"
                                onChange={(e)=>setAddressLine2((address)=>address=e.target.value)}
                        />
                    </div>

                </div>
                <div id="school-information"> 
                <label htmlFor="student_id">Student ID</label>
                    <div className="form-control full">    
                        <input 
                                type="text"
                                id="student_id"
                                placeholder="XX-XXXXX"
                                pattern="^(\d{2}-\d{5})$"
                                onChange={(e)=>setStudentID((studID)=>studID=e.target.value)}
                        />
                    </div>
                    <label htmlFor="year_level">Year Level</label>
                    <div className="form-control full">    
                        <select 
                        id="year_level"
                        defaultValue=""
                        required="yes"
                        onChange={(e)=>setYearLevel((year)=>year=e.target.value)}>
                            <option disabled value="">Select Year Level</option>
                            <option>1st Year</option>
                            <option>2nd Year</option>
                            <option>3rd Year</option>
                            <option>4th Year</option>
                        </select>
                    </div>
                    <label htmlFor="course" >Course and Section</label>
                    <div className="form-control">
                        <select
                        id="course" 
                        defaultValue=""
                        required="yes"
                        onChange={(e)=>setCourse((course)=>course=e.target.value)}>
                            <option disabled value="">Select course</option>
                            <option>BSCS</option>
                            <option>BSIT</option>
                            <option>BSCE</option>
                        </select>
                        <select 
                        id="section"
                        defaultValue=""
                        required="yes"
                        onChange={(e)=>setSection((section)=>section=e.target.value)}>
                            <option disabled value="">Select section</option>
                            <option>A21</option>
                            <option>B21</option>
                            <option>C21</option>
                            <option>D21</option>
                            <option>E21</option>
                            <option>F21</option>
                        </select>
                    </div>
                </div>
                <div id="agreement">
                    <label htmlFor="agree_box">
                        <input 
                        type="checkbox" 
                        id="agree_box"
                        required="yes" 
                        onChange={(e)=>setAgreeCondition((agree)=>agree=e.target.checked)}/>
                        <span>I understand and agree on the <a href="https://www.example.com"> 
                        <strong>Data Usage Agreement</strong></a></span>
                    </label>
                </div>
                
                <div style={errorStyle} className="error-div" id="error-handled">
                    <MdErrorOutline style={{fontSize:"2rem"}}/>{errorMessage}
                </div>
                
                <div id="btn-holder">
                    <Link to="/welcome" 
                    className="btn btn-red">Back</Link>
                    <button 
                    className="btn btn-green" 
                    type="submit">
                        Proceed
                    </button>
                </div>
                
            </form>
        </div>
    )
    
}

export default Form;