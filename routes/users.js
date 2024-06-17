import express from "express"
import User from "../models/User.js"
import createError from "../utils/error.js"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { get } from "mongoose";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//middleware

// router.get("/checkauthentication", verifyToken, (req, res, next)=>{
//     res.send("you are authenticated and logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req, res, next)=>{
//     res.send("you are logged in, and can delete your account ")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next)=>{
//     res.send("you are an admin, and can delete any account")
// })


//UPDATE
router.put("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GET ALL
router.get("/", verifyAdmin, getUsers);


export default router;