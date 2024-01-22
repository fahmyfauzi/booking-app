import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import cloudinary from "../config/cloudinary.js";
import createError from "../utils/error.js";

const cloudinaryUpload = (photo) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      photo.tempFilePath,
      {
        public_id: new Date().getTime().toString(),
      },
      (error, result) => {
        if (error) {
          console.error("Upload file error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const addHotelHandler = async (req, res, next) => {
  try {
    const newHotelData = new Hotel(req.body);
    const { photos } = req.files;

    let images = [];
    if (photos && photos.length > 0) {
      const uploadPromises = photos.map((photo) => cloudinaryUpload(photo));
      images = await Promise.all(uploadPromises).catch((err) => {
        console.error("Error during photo upload:", err);
        throw err;
      });
    }

    if (images.length > 0) {
      newHotelData.photos = images.map((image) => image.public_id);
    }

    const newHotel = new Hotel(newHotelData);
    const savedHotel = await newHotel.save();

    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateHotelHandler = async (req, res, next) => {
  try {
    const hotelId = req.params.id;
    const hotelToUpdate = await Hotel.findById(hotelId);
    const { photos } = req.files;

    if (!hotelToUpdate) {
      return next(createError(404, "Hotel not found!"));
    }

    let images = [];
    if (photos && photos.length > 0) {
      const deletePromises = hotelToUpdate.photos.map((photo) => {
        cloudinary.uploader.destroy(photo);
      });
      images = await Promise.all(deletePromises).catch((err) => {
        console.error("Error during photo delete:", err);
        throw err;
      });

      const uploadPromises = photos.map((photo) => cloudinaryUpload(photo));
      images = await Promise.all(uploadPromises).catch((err) => {
        console.error("Error during photo upload:", err);
        throw err;
      });
    }

    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      photos
        ? {
            $set: {
              ...req.body,
              photos: images.map((image) => image.public_id),
            },
          }
        : { $set: { ...req.body } },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteHotelHandler = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      next(createError(404, "Hotel not found!"));
    }

    let images = [];
    if (hotel.photos) {
      const deletePromises = hotel.photos.map((photo) =>
        cloudinary.uploader.destroy(photo)
      );

      images = await Promise.all(deletePromises).catch((err) => {
        console.log("error delete photos: ", err);
        throw err;
      });
    }

    await Hotel.findByIdAndDelete(hotel);
    res.status(200).json("Hotel has been deleted!");
  } catch (error) {
    res.status(500).json(error);
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
