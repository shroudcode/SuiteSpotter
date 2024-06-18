import Hotel from "../models/Hotel.js";
import router from "../routes/hotels.js";

export const createHotel = async (req, res,next)=>{
    const newHotel = new Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    }
    catch(err){
        next(err); 
    }
}

export const updateHotel = async (req, res, next)=>{
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body}, {new:true})
        res.status(200).json(updatedHotel)

    }
    catch(err){
        next(err);
    }
}

export const deleteHotel = async (req, res, next)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("hotel has been deleted")
    }
    catch(err){
        next(err);
    }
}


export const getHotel = async (req, res, next) => {
        try{
            const hotel = await Hotel.findById(req.params.id)
            res.status(200).json(hotel)
        }
        catch(err){
            next(err);
        }
    }


export const getHotels = async (req, res, next)=>{
    
    const {min, max, limit, ...others} = req.query 
    try{
        const hotels = await Hotel.find({
            ...others,
             cheapest: {$gt: min | 1, $lt: max || 999999}}).limit(Number(limit));
        res.status(200).json(hotels)
    }
    catch(err){
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city =>{
           return Hotel.countDocuments({city:city}) 
        }))
        res.status(200).json(list)
    }
    catch(err){
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try{
        const hotelcount = await Hotel.countDocuments({type: "hotel"})
        const apartmentcount = await Hotel.countDocuments({type: "apartment"})
        const resortcount = await Hotel.countDocuments({type: "resort"})
        const villacount = await Hotel.countDocuments({type: "villa"})
        const cabincount = await Hotel.countDocuments({type: "cabin"})
        res.status(200).json(
            [
                {type : "hotel", count : hotelcount},
                {type : "apartment", count : apartmentcount},
                {type : "resort", count : resortcount},
                {type : "villa", count : villacount},
                {type : "cabin", count : cabincount}
            ]
        )
    }
    catch(err){
        next(err);
    }
};

