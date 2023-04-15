import axios from "axios"

export const newroomaction=(hoteldata,id)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_ROOM_REQUEST"});
        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        const {data}=await axios.post(`/api/room/create/${id}`,hoteldata,config);

        dispatch({
            type:"NEW_ROOM_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"NEW_ROOM_FAIL",
            payload:error.response.data.message,
        })
        
    }
};



export const reserveroomaction=(selectroom,alldate)=>async(dispatch)=>{
    try {
        dispatch({type:"RESERVE_ROOM_REQUEST"});

        // console.log(selectroom)
        // console.log(alldate)
        const config={
            headers:{
                "content-type":"application/json"
            }
        };

        // const {data}=await axios.put(`/api/room/availability/${selectroom}`,{alldate},config)

        const {data}= await Promise.all(
            selectroom.forEach(async(roomnoid)=>{
                await axios.put(`/api/room/reserve/${roomnoid}`,{alldate},config)
           })
        )
            

        


        dispatch({
            type:"RESERVE_ROOM_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"RESERVE_ROOM_FAIL",
            payload:error.response.data.message,
        })
        
    }
}