import Errorhandler from "../utils/errorhandler.js"
import catchasyncerror from "../middleware/catchasyncerror.js"
import roomdata from "../models/roomschema.js"
import hoteldata from "../models/hotelschema.js"



export const getallroomcontroller=catchasyncerror(async(req,res,next)=>{
    const allroom=await roomdata.find({})

    res.status(200).json({
        success:true,
        allroom,
    })
});


export const getsingleroomcontroller=catchasyncerror(async(req,res,next)=>{
    const room=await roomdata.findById(req.params.id)
    if(!room){
        return next(new Errorhandler("room not found",400))
    };
    res.status(200).json({
        success:true,
        room,
    })
});


export const createroomcontroller=catchasyncerror(async(req,res,next)=>{
    const hotelid=req.params.id;
    let roomnumber=req.body.roomnumber;
    let flatten=roomnumber.flat(Infinity)

    let roomno=[];

    for(let i=0; i<flatten.length; i++){
        roomno.push({
            number:flatten[i]
        })
    };

    req.body.roomnumber=roomno;

    const room=await roomdata.create(req.body);
    const hotel=await hoteldata.findById(hotelid);
    if(!hotel){
        return next(new Errorhandler("hotel not found",400))
    };
    if(room){
        hotel.room.push(room);
        await hotel.save({validateBeforeSave:false})
    };
    res.status(201).json({
        success:false,
        room,
        hotel,
        message:"room info added successfully"
    })
});


export const updateroomcontroller=catchasyncerror(async(req,res,next)=>{
    let room=await roomdata.findById(req.params.id);
    if(!room){
        return next(new Errorhandler("room info not found",400))
    };
    room=await roomdata.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    });
    res.status(200).json({
        success:true,
        room,
    })
});


export const deleteroomcontroller=catchasyncerror(async(req,res,next)=>{
    const id=req.params.id;
    let hotel=await hoteldata.findById(id);

    if(!hotel){
        return next(new Errorhandler("hotel not found with this id",400))
    };
    let roomid=req.params.roomid;
    let deleteroom=await roomdata.findById(roomid);
    await deleteroom.remove();
    await hotel.room.remove(deleteroom);
    await hotel.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message:"room info deleted successfully",
    })
});


export const reserveroomcontroller=catchasyncerror(async(req,res,next)=>{
    let {alldate}=req.body;

    let updatedate=await roomdata.updateOne(
        {"roomnumber._id":req.params.id},
        {
            $push:{
                "roomnumber.$.unavailabledate":alldate
            },
        }
    );
    res.status(200).json({
        success:true,
        message:"dates updated successfully"
    })
});