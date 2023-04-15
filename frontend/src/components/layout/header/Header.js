import React,{Fragment,useState} from 'react'
import "./Header.css";
import {FaBed,FaCar,FaPlane,FaTaxi} from "react-icons/fa"
// import {GiPerson} from 'react-icons/gi';
import {useNavigate} from "react-router-dom";


const Header = ({type}) => {
    const navigate=useNavigate()

    const [destination,setDestination]=useState("");

    const headersearchhandler=(e)=>{

        navigate("/hotels", {state:{destination}})

    }
  return (
    <Fragment>
        <div className="header">
            <div className={
                type==="list"?"headercontainer listmode":"headercontainer"}>
                    <div className="headerlist">
                        <div className="headerlistitem">
                            <FaBed/>
                            <span>stays</span>
                        </div>
                        <div className="headerlistitem">
                        <FaPlane/>
                        <span>Flights</span>
                    </div>
                    <div className="headerlistitem">
                        <FaCar/>
                        <span>Car Rentals</span>
                    </div>
                    <div className="headerlistitem">
                        <FaBed/>
                        <span>Attractions</span>

                    </div>
                    <div className="headerlistitem">
                        <FaTaxi/>
                        <span>Airport Taxi</span>
                    </div>
                </div>
                {type!=="list"&&(
                    <Fragment>
                        <h1 className="headertitle">
                            A lifetime of discounts its genius
                        </h1>
                        <p className="headerdesc">
                        Get rewarded for your travels – unlock instant savings of 10% or
                        more with a free Lamabooking account
                        </p>
                        {/* {!user && <button className='headerbtn'>Sign in/Register</button>} */}
                        <div className="headersearch">
                            <div className="headersearchitem">
                                <FaBed className='headericon'/>
                                <input type="text"
                                placeholder='where are you goind'
                                required
                                className='headersearchinput'
                                value={destination}
                                onChange={(e)=>setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headersearchitem">
                                <button className="headerbtn"
                                onClick={headersearchhandler}
                                >Search</button>
                            </div>
                        </div>

                    </Fragment>
                )}


                </div>
        </div>
    </Fragment>
  )
}

export default Header