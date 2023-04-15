import express from "express"
import { createroomcontroller, getallroomcontroller, reserveroomcontroller } from "../controller/roomcontroller.js";
const router=express.Router()


router.route("/room/all").get(getallroomcontroller)
router.route("/room/create/:id").post(createroomcontroller);
router.route("/room/reserve/:id").put(reserveroomcontroller)

export default router;