import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

const addHotelHandler = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateHotelHandler = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteHotelHandler = async (req, res) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    res.status(500).json(err);
  }
};

const getHotelByIdHandler = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllHotelHandler = async (req, res) => {
  const { min, max, limit, ...others } = req.query;
  let hotels;
  try {
    if (Object.keys(others).length === 0 && !min && !max) {
      hotels = await Hotel.find().sort({ createdAt: -1 }).limit(limit, 5);
    } else {
      hotels = await Hotel.find({
        ...others,
        cheapestPrice: {
          $gt: min || 1,
          $lt: max || 99999,
        },
      }).limit(parseInt(limit, 10));
    }
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json();
  }
};

const countByCityHandler = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {}
};

const countByTypeHandler = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartementCount = await Hotel.countDocuments({ type: "apartement" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartements", count: apartementCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHotelRoomsHandler = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export {
  addHotelHandler,
  updateHotelHandler,
  deleteHotelHandler,
  getHotelByIdHandler,
  getAllHotelHandler,
  countByCityHandler,
  countByTypeHandler,
  getHotelRoomsHandler,
};
