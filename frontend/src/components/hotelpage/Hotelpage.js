import React,{Fragment,useState,useEffect} from 'react';
import "./Hotelpage.css";
// import Header from "../layout/header/Header"
import {FaSearchLocation,FaClosedCaptioning, FaArrowCircleLeft, FaArrowCircleRight} from "react-icons/fa";
import {hoteldetailaction} from "../actions/hotelaction"
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Reserve from "./Reserve";
import {hotelroomdetailaction} from "../actions/hotelaction"

const Hotelpage = () => {
    const dispatch=useDispatch();
   
    const {id}=useParams()

    const date=JSON.parse(localStorage.getItem("date"));
    const option=JSON.parse(localStorage.getItem("option"));
    let startDate=String(date[0].startDate).substring(0,10);
    let endDate=String(date[0].endDate).substring(0,10);
    const days=JSON.parse(localStorage.getItem("days"))
    
    
    

   
    // const singleday=24*60*60*1000;
    // function daydifference(date1,date2){
    //     const timediffernce=Math.abs(date2.getTime()-date1.getTime());
    //     const daydifference=Math.ceil(timediffernce/singleday);
    //     return daydifference;
    // }
    // const days=daydifference(date[0].endDate,date[0].startDate)
  

    const {hotel}=useSelector((state)=>state.hoteldetailred)
    

    const [open,setOpen]=useState(false);
    const [slidernumber,setSlidernumber]=useState(0);
    const [bookmodel,setBookmodel]=useState(false)

    const openhandler=(i)=>{
        setSlidernumber(i)
        setOpen(!open)
    }
    const handlemove=(direction)=>{
        let newslidernumber;

        if(direction==="l"){
            newslidernumber=slidernumber===0?5:slidernumber-1;
        }else{
            newslidernumber=slidernumber===5?0:slidernumber+1;
        }
        setSlidernumber(newslidernumber)



    }
    const bookhandler=(e)=>{
        setBookmodel(!bookmodel)

    }

    useEffect(()=>{

        dispatch(hoteldetailaction(id))
        dispatch(hotelroomdetailaction(id))
    },[dispatch,id])
  return (
    <Fragment>
        <div className="hotelContainer">{
            open && (
                <div className="slider">
                    <FaClosedCaptioning
                    className='close'
                    onClick={openhandler}
                    />
                    <FaArrowCircleLeft
                    className='arrow'
                    onClick={(e)=>handlemove("l")}
                    />

                    <div className="sliderWrapper">
                        <img src={hotel.image[slidernumber].url} alt="avatar" className="sliderImg"
                        />
                    </div>

                    <FaArrowCircleRight
                    className='arrow'
                    onClick={(e)=>handlemove("r")}
                    />


                </div>
            )
        }
        <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{hotel.name}</h1>
            <div className="hotelAddress">
                <FaSearchLocation/>
                <span>{hotel.address}</span>
            </div>
            <span className="hotelDistance">
                Excellent location {hotel.distance}m from Airport
            </span>
            <span className="hotelPriceHighlight">
                Book a stay over ${hotel.cheapestprice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">{
                hotel.image?.map((photo,i)=>(
                    <div className="hotelImgWrapper" key={i}>
                        <img src={hotel.image[i].url}
                        alt=""
                        className='hotelImg'
                        onClick={(e)=>openhandler(i)}
                        />
                    </div>
                ))
            }</div>

            <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{hotel.title}</h1>
                    <p className="hotelDesc">{hotel.description}</p>
                </div>
                <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days} -night stay plan</h1>
                    <span>Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!</span>
                  <h2>
                    <b>${days*hotel.cheapestprice*option.room} {days}{" "} nights</b>
                  </h2>
                  <button onClick={bookhandler}>Book Now</button>

                </div>
            </div>
        </div>
        </div>
        <div>{bookmodel && <Reserve hotelid={id} setBookmodel={setBookmodel}/>}</div>
        
    </Fragment>
  )
}



export default Hotelpage;