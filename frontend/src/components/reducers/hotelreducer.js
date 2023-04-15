import {createReducer} from "@reduxjs/toolkit"

const searchhotelinitialstate={
    searchhotel:[]
};

export const searchhotelreducer=createReducer(searchhotelinitialstate,{
    SEARCH_HOTEL_REQUEST:(state,action)=>{
        return{
            loading:true,
            searchhotel:[]
        }
        
    },
    SEARCH_HOTEL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            searchhotel:action.payload.allhotel,
        }
    },
    SEARCH_HOTEL_FAIL:(state,action)=>{
        return{
            loading:false,
            searchhotel:[],
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    },
});


const newhotelinitialstate={
    newhotel:{}
};
export const newhotelreducer=createReducer(newhotelinitialstate,{
    NEW_HOTEL_REQUEST:(action,state)=>{
        return{
            loading:true,
            newhotel:{}
        }
    },
    NEW_HOTEL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            newhotel:action.payload.success,
            isCreated:true,
        }
    },
    NEW_HOTEL_FAIL:(state,action)=>{
        return{
            loading:false,
            newhotel:{},
            isCreated:false,
            error:action.payload,
        }
    },
    NEW_HOTEL_RESET:(state,action)=>{
        return{
            loading:false,
            isCreated:false,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
                ...state,
                error:null,
            }
        },
        default:(state,action)=>{
            return{
                state,
            }
        }
    }
)


const allhotelinitialstate={
    allhotel:[]
};
export const allhotelreducer=createReducer(allhotelinitialstate,{
    ALL_HOTEL_REQUEST:(state,action)=>{
        return{
            loading:true,
            allhotel:[]
        }
    },
    ALL_HOTEL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            allhotel:action.payload.allhotel,
        }
    },
    ALL_HOTEL_FAIL:(state,action)=>{
        return{
            loading:false,
            allhotel:[],
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
})



const hoteldetailinitialstate={
    hotel:{}
};

export const hoteldetailreducer=createReducer(hoteldetailinitialstate,{
    HOTEL_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:true,
            hotel:{}
        }
    },
    HOTEL_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:false,
            hotel:action.payload.hotel,
        }
    },
    HOTEL_DETAIL_FAIL:(state,action)=>{
        return{
            loading:false,
            hotel:{},
            error:action.payload,
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
});


const hotelroomdetailinitialstate={
    room:{}
};

export const hotelroomdetailreducer=createReducer(hotelroomdetailinitialstate,{
    HOTEL_ROOM_DETAIL_REQUEST:(state,action)=>{
        return{
            loading:false,
            room:{}
        }
    },
    HOTEL_ROOM_DETAIL_SUCCESS:(state,action)=>{
        return{
            loading:true,
            room:action.payload.hotelroom,
        }
    },
    HOTEL_ROOM_DETAIL_FAIL:(state,action)=>{
        return{
            loading:false,
            room:{},
            error:action.payload
        }
    },
    CLEAR_ERROR:(state,action)=>{
        return{
            ...state,
            error:null,
        }
    },
    default:(state,action)=>{
        return{
            state,
        }
    }
})