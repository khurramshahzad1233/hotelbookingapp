import app from "./app.js";
import dotenv from "dotenv"
if(process.config.env!=="PRODUCTION"){
    dotenv.config({path:"backend/config.env"})
};

import cloudinary from "cloudinary"
import mongoose from "mongoose";

import http from "http"
import {Server} from "socket.io";
import {createServer} from "http"

mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongodb);
  
}

cloudinary.config({
  cloud_name:process.env.cloudinary_name,
  api_key:process.env.cloudinary_api_key,
  api_secret:process.env.cloudinary_api_secret,
})




// socket implementation


const httpServer=createServer(app);

const io=new Server(httpServer,{
  cors:{
    origin:"*",
    methods:["GET","POST","PUT","DELETE"]
  },

  connectionStateRecovery: {
    // default values
    maxDisconnectionDuration: 2 * 60 * 1000,
    skipMiddlewares: true,
  },
});

const alluser=[]

io.on("connection",(socket)=>{

  socket.on("onlogin",(user)=>{
    const updateuser={
      ...user,
      online:true,
      socketid:socket._id,
      messages:[]
    };
    

    const existuser=alluser.find((item)=>item.name===updateuser.name);
    if(existuser){
      existuser.socketid=socket.id;
      existuser.online=true
    }else{
      alluser.push(updateuser)
    };

    const admin=alluser.find((item)=>item.name==="admin"&& item.online);
    if(admin){
      io.to(admin.socketid).emit("updateuser",updateuser)
    };
    if(updateuser.name==="admin"){
      io.to(updateuser.socketid).emit("userlist",alluser);
    }
   
  });

  socket.on("selecteduser",(user)=>{
    const admin=alluser.find((item)=>item.name==="admin" && item.online);
    if(admin){
      const existuser=alluser.find((item)=>item.name===user.name);
      io.to(admin.socketid).emit("selecteduser",existuser)
    }
  })

  socket.on("sendmessage",(message)=>{
    if(message.from==="admin"){
      const user=alluser.find((item)=>item.name===message.to && item.online);

      if(user){
        io.to(user.socketid).emit("message",message);
        user.messages.push(message);
      }else{
        io.to(socket.id).emit("message",{
          from:"system",
          to:"admin",
          body:"user is not online",
        })
      }
    }else{
      const admin=alluser.find((item)=>item.name==="admin"&& item.online);
      if(admin){
        io.to(admin.socketid).emit("message",message);
        const user=alluser.find((item)=>item.name===message.from && item.online);
        if(user){
          user.messages.push(message);
        }
      }else{
        io.to(socket.id).emit("message",{
          from:"system",
          to:message.from,
          body:"sorry: admin is not online right now"
        });
      }
    }
  })




  socket.on("disconnect",()=>{
    const user=alluser.find((item)=>item.socketid===socket.id);

    if(user){
      user.online=false;
      const admin=alluser.find((item)=>item.name==="admin" && item.online);
      if(admin){
        io.to(admin.socketid).emit("updateuser",user)
      }
    }
  })
})




httpServer.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
});

