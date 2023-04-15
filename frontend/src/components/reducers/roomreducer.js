import {createReducer} from "@reduxjs/toolkit"

const newroominitialstate={
    newroom:{}
}

export const newroomreducer=createReducer(newroominitialstate,{
    NEW_ROOM_REQUEST:(state,action)=>{
        return{
            loading:true,
            newroom:{}
        }
    },
    NEW_ROOM_SUCCESS:(state,action)=>{
        return{
            loading:true,
            newroom:action.payload.data
        }
    },
    NEW_ROOM_FAIL:(state,action)=>{
        return{
            loading:false,
            newroom:{},
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



const reserveroominitialstate={
    updateroomavailability:{}
};

export const reserveroomreducer=createReducer(reserveroominitialstate,{
    RESERVE_ROOM_REQUEST:(state,action)=>{
        return{
            loading:true,
            updateroomavailability:{}
        }
    },
    RESERVE_ROOM_SUCCESS:(state,action)=>{
        return{
            loading:false,
            updateroomavailability:action.payload.success,
            isUpdated:true,
        }
    },
    RESERVE_ROOM_FAIL:(state,action)=>{
        return{
            loading:false,
            updateroomavailability:{},
            isUpdated:false,
            error:action.payload,
        }
    },
    RESERVE_ROOM_RESET:(state,action)=>{
        return{
            loading:false,
            isUpdated:false,
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