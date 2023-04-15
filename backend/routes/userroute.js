import express from "express"
import { deleteusercontroller, getallusercontroller, getsingleusercontroller, loginusercontroller, logoutusercontroller, registerusercontroller, updaterolcontroller } from "../controller/usercontroller.js";
const router=express.Router();


router.route("/user/all").get(getallusercontroller);
router.route("/user/register").post(registerusercontroller);
router.route("/user/login").get(loginusercontroller);
router.route("/user/logout").get(logoutusercontroller);
router.route("/user/:id").get(getsingleusercontroller)
router.route("/user/delete/:id").delete(deleteusercontroller)
router.route("/user/role/:id").put(updaterolcontroller)


export default router;