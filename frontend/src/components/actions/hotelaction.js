import axios from "axios"

export const getallsearchaction=(keyword="",price=[1,10000])=>async(dispatch)=>{
    try {
        dispatch({type:"SEARCH_HOTEL_REQUEST"})

        let link=`/api/hotel/search?feature=false&keyword=${keyword}&cheapestprice[gte]=${price[0]}&cheapestprice[lte]=${price[1]}`

        const {data}=await axios.get(link);

        dispatch({
            type:"SEARCH_HOTEL_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"SEARCH_HOTEL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}

export const clearerror=()=>async(dispatch)=>{
    dispatch({type:"CLEAR_ERROR"})
};



export const createhotelaction=(hoteldata)=>async(dispatch)=>{
    try {
        dispatch({type:"NEW_HOTEL_REQUEST"})

        const config={
            headers:{
                "content-type":"multipart/form-data"
            },
        };

        const {data}=await axios.post(`/api/hotel/create`,hoteldata,config);

        dispatch({
            type:"NEW_HOTEL_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"NEW_HOTEL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}



export const getallhotelaction=()=>async(dispatch)=>{
    try {
        dispatch({type:"ALL_HOTEL_REQUEST"});
        const {data}=await axios.get(`/api/hotel/all`);

        dispatch({
            type:"ALL_HOTEL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"ALL_HOTEL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


export const hoteldetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"HOTEL_DETAIL_REQUEST"})
        const {data}=await axios.get(`/api/hotel/${id}`);

        dispatch({
            type:"HOTEL_DETAIL_SUCCESS",
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:"HOTEL_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
};



export const hotelroomdetailaction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:"HOTEL_ROOM_DETAIL_REQUEST"})
        const {data}=await axios.get(`/api/hotel/room/${id}`);

        dispatch({
            type:"HOTEL_ROOM_DETAIL_SUCCESS",
            payload:data,
        })
        
    } catch (error) {
        dispatch({
            type:"HOTEL_ROOM_DETAIL_FAIL",
            payload:error.response.data.message,
        })
        
    }
}


