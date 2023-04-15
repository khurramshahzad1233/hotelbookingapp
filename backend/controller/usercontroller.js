import Errorhandler from "../utils/errorhandler.js"
import catchasyncerror from "../middleware/catchasyncerror.js"
import userdata from "../models/userschema.js"
import sendtoken from "../utils/sendtoken.js";
import cloudinary from "cloudinary"


export const getallusercontroller=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find({});

    res.status(200).json({
        success:true,
        alluser,
    })
});

export const registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale",
    });

    const {name,email,password,phone,city,country}=req.body;
    const user=await userdata.create({
        name,email,password,phone,city,country,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });

    sendtoken(res,user,201,"new user created successfully")
});


export const loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(
            new Errorhandler("please enter email and password",400)
        )
    };

    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("incorrect email or password",401))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(
            new Errorhandler("incorrect password",401)
        )
    };

    sendtoken(res,user,200,"welcome back")
});


export const logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        samesite:"none",
    }).json({
        success:true,
        message:"logout successfully",
    })
});


export const getsingleusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    res.status(200).json({
        success:true,
        user,
    })
});


export const deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user not found",404))
    };

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    await user.remove();

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
});


export const updaterolcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user not found",400))
    };
    if(user.role==="user"){
        user.role="admin"
    }else{
        user.role="user"
    };
    await user.save();

    res.status(200).json({
        success:true,
        message:"updated role successfully"
    })
});