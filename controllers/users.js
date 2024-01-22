import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import createError from "../utils/error.js";

const addUserHandler = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUserHandler = async (req, res, next) => {
  try {
    const { img } = req.files;
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });

    const cloudinaryUpload = () => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          img.tempFilePath,
          {
            public_id: new Date().getTime().toString(),
          },
          (error, result) => {
            if (error) {
              reject(`Upload file error: ${error}`);
            } else {
              resolve(result);
            }
          }
        );
      });
    };

    //jika id tidak ada | user tidak ditemukan
    if (!user) {
      return next(createError(404, "User not found"));
    }

    //jika cookie tidak sama dengan id params
    if (req.user.id !== userId && !req.user.isAdmin) {
      return next(createError(401, "You not user or you are not admin"));
    }

    //jika image ada di dalam database

    if (user.img) {
      await cloudinary.uploader.destroy(user.img);
    }
    const cloudinaryResult = await cloudinaryUpload();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      img
        ? { $set: { ...req.body, img: cloudinaryResult.public_id } }
        : { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUserHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next(createError(404, "User is not found!"));
    }
    //jika cookie tidak sama dengan id params
    if (req.user.id !== userId) {
      return next(createError(401, "You not user"));
    }

    //jika user punya img
    if (user.img) {
      await cloudinary.uploader.destroy(user.img);
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserByIdHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUserHandler = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json();
  }
};
export {
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
};
