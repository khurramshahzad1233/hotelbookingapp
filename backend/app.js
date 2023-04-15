import express from "express";
import Errormiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

import fileUpload from "express-fileupload";
import user from "./routes/userroute.js"
import hotel from "./routes/hotelroute.js";
import room from "./routes/roomroute.js";

import cors from "cors"

const app=express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload());


app.use("/api",user);
app.use("/api",hotel)
app.use("/api",room)

app.use(Errormiddleware)
export default app;