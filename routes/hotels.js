import express from "express"
import Hotel from "../models/Hotel.js"
import createError from "../utils/error.js"
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../controllers/hotel.js";
import { get } from "mongoose";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// router.get("/", (req, res)=>{
//     res.send("Hello, this is hotels endpoint");
// })

//CREATE

router.post("/", verifyAdmin, createHotel)

//UPDATE
router.put("/:id",verifyAdmin, updateHotel);
//DELETE
router.delete("/:id",verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType)


export default router;