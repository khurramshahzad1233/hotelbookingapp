import React,{Fragment,useState,useEffect} from 'react';
import "./Newroom.css";
import {getallhotelaction} from "../../actions/hotelaction";
import {useDispatch,useSelector} from "react-redux";
import {newroomaction} from "../../actions/roomaction" 

const Newroom = () => {
    const dispatch=useDispatch()

    const {allhotel}=useSelector((state)=>state.allhotelred)

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("");
    const [maxpeople,setMaxpeople]=useState("");
    const [hotelid, setHotelid]=useState("");
    const [roomno,setRoomno]=useState("")
    
    // console.log(hotelid)
    // let data =[ [ [ '6', '63' ], '65' ], '36' ]
    // let flatten=data.flat(Infinity)
    
    // console.log(flatten)
    // const roomnumber=roomno.split(",").map((room)=>(room))
    // console.log(roomnumber)
    const roomsubmithandler=(e)=>{
        e.preventDefault();
        
        const myform=new FormData();
        myform.set("title",title);
        myform.set("description",description);
        myform.set("price",price);
        myform.set("maxpeople",maxpeople);
        const roomnumber=roomno.split(",").map((room)=>(room));
        roomnumber.forEach((roomno)=>{
            myform.append("roomnumber",roomno)
        })
        
        
     
        dispatch(newroomaction(myform,hotelid))




    }

    

    useEffect(()=>{

        
        dispatch(getallhotelaction())
    },[dispatch])
  return (
    <Fragment>
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>Add New Room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form
                        onSubmit={roomsubmithandler}
                        >
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='delux Room'
                                value={title}
                                onChange={(e)=>setTitle(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="text"
                                required
                                placeholder='king size bed, 1 bathroom'
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="number"
                                required
                                placeholder='1000 rupees'
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <input type="number"
                                required
                                placeholder='max people'
                                value={maxpeople}
                                onChange={(e)=>setMaxpeople(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <select 
                                id='hotelId'
                                onChange={(e)=>setHotelid(e.target.value)}
                                >
                                    <option value="">Choose hotel</option>
                                    {
                                    allhotel &&
                                    allhotel.map((hotel)=>(
                                        <option  key={hotel._id} value={hotel._id}>{hotel.title}</option>
                                    ))
                                }</select>
                                
                            </div>

                            <div className="formInput">
                                <textarea 
                                onChange={(e)=>setRoomno(e.target.value)}
                                placeholder="give comma between room numbers."
                                ></textarea>
                            </div>
                            <div className="formInput">
                                <input type="submit"
                                value="submit"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Newroom