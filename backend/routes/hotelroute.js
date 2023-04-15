import express from "express"
import { createhotelcontroller, getallhotelcontroller, gethotelroomcontroller, getsinglehotelcontroller, searchhotelcontroller } from "../controller/hotelcontroller.js";
const router=express.Router();


router.route("/hotel/all").get(getallhotelcontroller);
router.route("/hotel/search").get(searchhotelcontroller);
router.route('/hotel/create').post(createhotelcontroller);
router.route("/hotel/:id").get(getsinglehotelcontroller);
router.route("/hotel/room/:id").get(gethotelroomcontroller)

export default router;