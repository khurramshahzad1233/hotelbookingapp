import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
const kittySchema=new mongoose.Schema({
    name:{
        type:String,
        requied:true,
        minLength:[3,"name should be more then 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Plz enter your email address"],
        unique:[true,"email already exist"],
        validate:validator.isEmail,
    },
    password:{
        type:String,
        required:[true,"plz enter password"],
        minLength:[4,"password should be more then 4 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    phone:{
        type:Number,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    }
});

kittySchema.pre("save",async function(){
    if(!this.isModified("password")){
        return next()
    };
    this.password=await bcrypt.hash(this.password,10) 
});

kittySchema.methods.comparepassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

kittySchema.methods.getjwttoken=function(){
    jwt.sign({id:this._id},process.env.jwt_secret,{
        expiresIn:"5d"
    })
    ;
}

const userdata=mongoose.model("user",kittySchema);
export default userdata;