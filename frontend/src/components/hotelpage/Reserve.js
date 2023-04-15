import React,{Fragment,useState} from 'react';
import "./Reserve.css"
import { BsXCircle} from "react-icons/bs";
import {reserveroomaction} from "../actions/roomaction"
import {useDispatch,useSelector} from "react-redux"

const Reserve = ({hotelid,setBookmodel}) => {
    const dispatch=useDispatch();

    const [selectroom,setSelectroom]=useState([])

    const {room}=useSelector((state)=>state.hotelroomdetailred);
    let date=JSON.parse(localStorage.getItem("date"));
    let startDate=String(date[0].startDate).substring(0,10);
    let endDate=String(date[0].endDate).substring(0,10);
    

    
   
    

    let getdaterange=(startDate,endDate)=>{
        const start=new Date(startDate);
        const end=new Date(endDate);
        
        const date=new Date(start.getTime());

        let dates=[];

        while (date<=end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1)

            
        }
        return dates



    };
    const alldate=getdaterange(startDate,endDate)
    // console.log(alldate)

    const isAvailable=(rnumber)=>{
        const isFound=rnumber.unavailabledate.some((date)=>
        alldate.includes(new Date(date).getTime())
        );
        return !isFound;

    }
   

    const checkboxhandler=(e)=>{
        const checked=e.target.checked;
        const value=e.target.value;
        setSelectroom(
            checked?[...selectroom,value]:selectroom.filter((item)=>item!==value)
        )

    }
    // console.log(alldate)
    // console.log(selectroom)


    const reserveroomhandler=(e)=>{
        dispatch(reserveroomaction(selectroom,alldate))

    }

   
    
  return (
    <Fragment>
        <div className="reserve">
            <div className="rContainer">
                <BsXCircle
                className='rClose'
                onClick={()=>setBookmodel(false)}
                />
                <span>Select your room</span>

                {
                    room && room.map((item)=>{
                        return <div key={item._id} className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle">{item.title}</div>
                                <div className="rDesc">{item.description}</div>
                                <div className="rMax">
                                    Max People: <b>{item.maxpeople}</b>
                                </div>
                                <div className="rPrice">{item.price}</div>
                            </div>
                            <div className="rSelectRooms">{
                                item.roomnumber.map((rnumber)=>(
                                    <div className="room" key={rnumber._id}>
                                        <label>{rnumber.number}</label>
                                        <input type="checkbox"
                                        value={rnumber._id}
                                        onChange={checkboxhandler}
                                        disabled={!isAvailable(rnumber)}

                                        />
                                    </div>
                                ))
                            }</div>
                        </div>
                    })
                }
                <button className="rButton" onClick={reserveroomhandler}>Reserve Now</button>
               
 
            </div>
        </div>
    </Fragment>
  )
}

export default Reserve