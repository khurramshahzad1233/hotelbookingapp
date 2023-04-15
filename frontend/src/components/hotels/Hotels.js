import React,{Fragment,useEffect,useState} from 'react'
import "./Hotels.css"
import Header from '../layout/header/Header';
import {getallsearchaction} from "../actions/hotelaction"
import {useDispatch,useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import {DateRange} from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns";
import {GiPerson} from "react-icons/gi";
import Searchitemcard from "./Searchitemcard"

const Hotels = () => {
const dispatch=useDispatch();
const location=useLocation();

const {searchhotel}=useSelector((state)=>state.searchhotelred)

const [destination,setDestination]=useState(location.state.destination||"")
const [date,setDate]=useState([
    {
        startDate:new Date(),
        endDate:new Date(Date.now()+24*60*60*1000),
        key:"selection"
    }
]);
const [option,setOption]=useState({
    adult:1,
    children:0,
    room:1
})
const [opencalender,setOpencalender]=useState(false);
const [min,setMin]=useState(1);
const [max,setMax]=useState(10000);
const [openoption,setOpenoption]=useState(false);




const opendatehandler=(e)=>{
    setOpencalender(!opencalender)

}

const openoptionhandler=(e)=>{
    setOpenoption(!openoption)
    

}

const counterhandler=(name,operation)=>{
    setOption((prev)=>{
        return{
            ...prev,
            [name]:operation==="i"?option[name]+1:option[name]-1,
        }
    })
    
};
useEffect(()=>{

    dispatch(getallsearchaction(destination,[min,max]))
},[dispatch,destination,min,max])

  return (
    <Fragment>
        <Header type={"list"}/>
        <div className="listContainer">
            <div className="listWrapper">
                <div className="listSearch">
                    <h1 className="IsTitle">Search</h1>
                    <div className="IsItem">
                        <label>Destination</label>
                        <input type="text"
                        placeholder='destination'
                        required
                        value={destination}
                        onChange={(e)=>setDestination(e.target.value)}
                        />
                    </div>
                    <div className="IsItem">
                        <label>Check in Date</label>
                        <span
                        onClick={opendatehandler}
                        >{`${format(date[0].startDate,'dd/MM/yyyy')}to${
                            format(date[0].endDate,"dd/MM/yyyy")
                        }`}</span>
                        {
                            opencalender &&(
                                <DateRange
                                minDate={new Date()}
                                ranges={date}
                                editableDateInputs={true}
                                onChange={(item)=>setDate([item.selection])}
                                />
                            )

                        }
                    </div>
                    <div className="IsItem">
                        <label>Option</label>
                        <div className="IsOptions">
                            <div className="IsOptionItem">
                                <span className="IsOptionText">
                                    Min Price <small>Per night</small>
                                </span>
                                <input type="number"
                                className='IsOptinInput'
                                value={min}
                                onChange={(e)=>setMin(e.target.value)}
                                // disabled={min <=1}
                                />
                            </div>
                            
                            <div className="IsOptionItem">
                                <span className="IsOptionText">
                                    Max price <small>Per night</small>
                                </span>
                                <input type="number"
                                className='IsOptionInput'
                                value={max}
                                onChange={(e)=>setMax(e.target.value)}
                                />
                            </div>

                            <div className="headersearchitem">
                                <GiPerson/>
                                <span className="headersearchtext"
                                onClick={openoptionhandler}
                                >{`
                                ${option.adult}adult.${option.children}children.${option.room}room
                                `}</span>
                                {openoption &&(
                                    <div className="options">
                                        <div className="optionitem">
                                            <span className="optiontext">Adult</span>
                                            <div className="optioncounter">
                                                <button
                                                className='optioncounterbutton'
                                                disabled={option.adult<=1}
                                                onClick={()=>counterhandler("adult","d")}
                                                >-</button>
                                                <span className="optioncounternumber">
                                                    {option.adult}
                                                </span>
                                                <button className="optioncounterbutton"
                                                onClick={()=>counterhandler("adult","i")}
                                                >+</button>
                                            </div>
                                        </div>

                                        <div className="optionitem">
                                            <span className="optiontext">Children</span>
                                            <div className="optioncounter">
                                                <button className="optioncounterbutton"
                                                disabled={option.children<=0}
                                                onClick={()=>counterhandler("children","d")}
                                                >-</button>
                                                <span className="optioncounternumber">
                                                    {option.children}
                                                </span>
                                                <button className="optioncounterbutton"
                                                onClick={()=>counterhandler("children","i")}
                                                >+</button>
                                            </div>
                                        </div>

                                        <div className="optionitem">
                                            <span className="optiontext">Room</span>
                                            <div className="optioncounter">
                                                <button className="optioncounterbutton"
                                                disabled={option.room<=1}
                                                onClick={()=>counterhandler("room","d")}
                                                >-</button>
                                                <span className="optioncounternumber">{
                                                option.room
                                                }</span>
                                                <button className="optioncounterbutton"
                                                onClick={()=>counterhandler("room","i")}
                                                >+</button>

                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="searchitem">{
            searchhotel && searchhotel.map((item)=>{
                return <Searchitemcard key={item._id} item={item} date={date} option={option}/>
            })
        }</div>
    </Fragment>
  )
}

export default Hotels