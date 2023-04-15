import React,{Fragment} from 'react';
import "./Searchitemcard.css";

import {Link,useNavigate} from "react-router-dom"

const Searchitemcard = ({item,date,option}) => {
  const navigate=useNavigate()
    const singleorderhandler=(e)=>{
        navigate(`/hotel/${item._id}`);
        localStorage.setItem("date",JSON.stringify(date))
        localStorage.setItem("option",JSON.stringify(option));
        localStorage.setItem("days",JSON.stringify(days))

    }
    const singleday=24*60*60*1000;
    function daydifference(date1,date2){
        const timediffernce=Math.abs(date2.getTime()-date1.getTime());
        const daydifference=Math.ceil(timediffernce/singleday);
        return daydifference;
    }
    const days=daydifference(date[0].endDate,date[0].startDate)
    console.log(days)
  return (
    <Fragment>
        <div className="sarchItem">
            <img src={item.image[0].url} alt="" className='siImg'/>
            <div className="siDesc">
                <h1 className="siTitle">{item.hotelname}</h1>
                <span className="siDistance">{item.distance} m from airport</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air Conditioning
                </span>
                <span className="siFeatures">{item.description}</span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so locl in this great price today!
                </span>
            </div>
            <div className="siDetails">{item.averagerating &&
            <div className="siRating">
                <span>Excellent</span>
                <button>{item.averagerating}</button>
            </div>
            }
            <div className="siDetailTexts">
                <span className="siPrice">${item.cheapestprice}</span>
                <span className="siTaxOp">includes taxes and fees</span>
                {/* <Link to={`/hotels/${item._id}`}> */}
                    <button className="siCheckButton" onClick={singleorderhandler}>see availability
                    </button>
                {/* </Link> */}
            </div>
            </div>
        </div>
        
        
    </Fragment>

  )
}

export default Searchitemcard