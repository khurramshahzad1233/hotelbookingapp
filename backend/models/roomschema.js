import mongoose from "mongoose";
const kittySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,

    },
    maxpeople:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    roomnumber:[
        {
            number:{
                type:Number,
                required:true,
            },
            unavailabledate:[
                {
                    type:Date,
                }
            ]
        }
    ]
});

const roomdata=mongoose.model("room",kittySchema);
export default roomdata;