import Errorhandler from "../utils/errorhandler.js"
import catchasyncerror from "../middleware/catchasyncerror.js"
import hoteldata from "../models/hotelschema.js"
import cloudinary from "cloudinary"
import Apifeature from "../utils/apifeature.js"



export const getallhotelcontroller=catchasyncerror(async(req,res,next)=>{
    const allhotel=await hoteldata.find({});

    res.status(200).json({
        success:true,
        allhotel,
    })
});


export const searchhotelcontroller=catchasyncerror(async(req,res,next)=>{
    const resultperpage=10;
    const hotelcount=await hoteldata.countDocuments();
    const apifeature=new Apifeature(hoteldata.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage);

    let allhotel=await apifeature.query;
    let filterhotelcount=allhotel.length;

    res.status(200).json({
        success:true,
        allhotel,
        resultperpage,
        hotelcount,
        filterhotelcount,
    })
});


export const createhotelcontroller=catchasyncerror(async(req,res,next)=>{
    let images=[];
    if(typeof req.body.image==="string"){
        images.push(req.body.image)
    }else{
        images=req.body.image
    };


    let imageslink=[];
    for(let i=0; i<images.length; i++){
        const mycloud=await cloudinary.v2.uploader.upload(images[i],{
            folder:"hotel",
        });
        imageslink.push({
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        })
    };

    req.body.image=imageslink;

    const hotel=await hoteldata.create(req.body);

    res.status(201).json({
        success:true,
        hotel,
        message:"new hotel detail added successfully"
    })
});


export const updatehotelcontroller=catchasyncerror(async(req,res,next)=>{
    let hotel=await hoteldata.findById(req.params.id);
    if(!hotel){
        return next(new Errohandler("hotel not found",404))
    };

    let images=[];
    if(typeof req.body.image==="string"){
        images.push(req.body.image)
    }else{
        images=req.body.image
    };

    if(images!==undefined){
        for(let i=0; i<hotel.image.length; i++){
            await cloudinary.v2.uploader.destroy(hotel.image[i].public_id)
        };

        let imageslink=[];
        for(let i=0; i<images.length;i++){
            const mycloud=await cloudinary.v2.uploader.upload(images[i],{
                folder:"hotel",
            });
            imageslink.push({
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            })
        };
        req.body.image=imageslink;

    };

    hotel=await hoteldata.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
    });

    res.status(200).json({
        success:true,
        message:"hotel info updated successfully"
    })
});


export const getsinglehotelcontroller=catchasyncerror(async(req,res,next)=>{
    const hotel=await hoteldata.findById(req.params.id);

    if(!hotel){
        return next(new Errorhandler("hotel detail not found",400))

    }
    res.status(200).json({
        success:true,
        hotel,
    })
});


export const deletehotelcontroller=catchasyncerror(async(req,res,next)=>{
    let hotel=await hoteldata.findById(req.params.id);
    if(!hotel){
        return next(new Errorhandler("hotel not found",400))
    };

    for(let i=0; i<hotel.image.length; i++){
        await cloudinary.v2.uploader.destroy(hotel.image[i].public_id)
    };

    await hotel.remove();
    res.status(200).josn({
        success:true,
        message:"hotel deleted successfully"
    })
});


export const gethotelroomcontroller=catchasyncerror(async(req,res,next)=>{
    const hotel=await hoteldata.findById(req.params.id).populate("room");

    if(!hotel){
        return next(new Errorhandler("hotel detail not found",400))
    };

    let hotelroom=hotel.room;
    res.status(200).json({
        success:true,
        hotel,
        hotelroom,
    })
});


export const counthotelbytypecontroller=catchasyncerror(async(req,res,next)=>{
    const hotelcount=await hoteldata.countDocuments({type:"hotel"});
    const resortcount=await hoteldata.countDocuments({type:"resort"})
    const villacount=await hoteldata.countDocuments({type:"villa"})
    const apartmentcount=await hoteldata.countDocuments({type:"apartment"})
    const cabincount=await hoteldata.countDocuments({type:"cabin"});

    res.status(200).json([
        {type:"hotel",count:hotelcount},
        {type:"resort",count:resortcount},
        {type:"villa",count:villacount},
        {type:"apartment",count:apartmentcount},
        {type:"cabin",count:cabincount },
    ])
});


export const hotelcountbycitycontroller=catchasyncerror(async(req,res,next)=>{
    const cities=req.query.cities.split(",");
    const citieslist=await Promise.all(cities.map((city)=>{
        return hoteldata.countDocuments({city:city});
    }));

    res.status(200).json({
        success:true,
        citieslist,
    })
})