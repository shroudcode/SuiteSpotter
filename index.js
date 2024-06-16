
import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
const app = express()
dotenv.config()

const connect = async() => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB!");
    } catch (error) {
    console.log(error);
    throw(error)
    }
};

//middlewares
app.use(express.json())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error handling middleware

app.use((err,req,res,next)=>{
    const errstatus = err.status || 500
    const errmsg = err.message || "something went wrong"
    return res.status(errstatus).json({
        success:false,
        status:errstatus,
        message:errmsg, 
        stack:err.stack,
    });
})


mongoose.connection.on("disconnected", ()=>{
    console.log("mongo disconnected");
})

// app.get("/users", (req, res)=>{
//     res.send("hello, youve requested for users")
// })




app.listen(5005, ()=>{
    console.log("connected to backend! listening on port 5005");
    connect()
})
