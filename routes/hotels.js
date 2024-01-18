//import packages
import express from "express";

//import files
import {
  addHotelHandler,
  updateHotelHandler,
  deleteHotelHandler,
  getHotelByIdHandler,
  getAllHotelHandler,
  countByCityHandler,
  countByTypeHandler,
  getHotelRoomsHandler,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *        Hotel:
 *             type: object
 *             required:
 *                  - name
 *                  - type
 *                  - city
 *                  - address
 *                  - distance
 *                  - title
 *                  - desc
 *                  - cheapestPrice
 *             properties:
 *                  id:
 *                      type: string
 *                      description: The auto generate id of hotel collection
 *                  name:
 *                       type: string
 *                       description: Hotel name
 *                  type:
 *                       type: string
 *                       description: Hotel type
 *                  city:
 *                       type: string
 *                       description: City
 *                  address:
 *                       type: string
 *                       description: address
 *                  distance:
 *                       type: string
 *                       description: distance
 *                  photos:
 *                       type: array
 *                       description: photos
 *                  title:
 *                       type: string
 *                       description: title hotel
 *                  desc:
 *                       type: string
 *                       description: description hotel
 *                  rating:
 *                       type: number
 *                       description: rating min 0 , max 5
 *                  rooms:
 *                        type: array,
 *                        description: rooms hotel
 *                  cheapestPrice:
 *                       type: number
 *                       description: cheapest price
 *                  featured:
 *                       type: boolean
 *                       descriiption: featured hotel default false
 *
 *             example:
 *                  _id: 65a88bdbed7d9edbd055b313
 *                  name: Oyo Syariah Bandung
 *                  type: hotel
 *                  city: Bandung
 *                  address: jl. soekarno no 556 blok 3
 *                  distance: 5 km
 *                  photos: [oyo1.jpg, oyo2.jpg, oyo3.jpg]
 *                  title: Hotel Nyaman Bandung
 *                  desc: 2 kamar , 1 kamar mandi dalam, free wifi
 *                  rating: 4
 *                  rooms: 65a89ff34582d313337a1909
 *                  cheapestPrice: 250000
 *                  featured: false
 */

/**
 * @swagger
 * tags:
 *   name: Hotel
 *   description: Hotel operation
 */

/**
 * @swagger
 * /api/hotels:
 *  post:
 *    summary: add new hotel
 *    tags: [Hotel]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Hotel'
 *    responses:
 *      201:
 *        description: Hotel successfully created.
 *      500:
 *        description: something went wrong
 */

//CREATE
router.post("/", verifyAdmin, addHotelHandler);

/**
 * @swagger
 * /api/hotels/{id}:
 *  put:
 *    summary: update or edit hotel
 *    tags: [Hotel]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id hotel want to updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Hotel'
 *    responses:
 *      200:
 *        description: Successfully updated.
 *
 *      500:
 *        description: something went wrong
 */
//UPDATE
router.put("/:id", verifyAdmin, updateHotelHandler);

/**
 * @swagger
 * /api/hotels/{id}:
 *  delete:
 *    summary: delete hotel
 *    tags: [Hotel]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id user want to updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    responses:
 *      200:
 *        description: Successfully deleted hotel.
 *
 *      500:
 *        description: something went wrong
 */
//DELETE
router.delete("/:id", verifyAdmin, deleteHotelHandler);

/**
 * @swagger
 * /api/hotels/find/{id}:
 *  get:
 *    summary: get detail hotel
 *    tags: [Hotel]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id hotel want to get detail hotel
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    responses:
 *      200:
 *        description: Successfully get detail hotel.
 *
 *      500:
 *        description: something went wrong
 */
// GET
router.get("/find/:id", getHotelByIdHandler);

/**
 * @swagger
 * /api/hotels:
 *  get:
 *    summary: Get all hotels
 *    tags: [Hotel]
 *    parameters:
 *      - in: query
 *        name: min
 *        description: minimal price hotel. example 100000
 *        schema:
 *          type: string
 *      - in: query
 *        name: max
 *        description: maximal price hotel. example 300000
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        description: show limit hotels. example 10
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: successfully get all hotel
 *      500:
 *        description: something went wrong
 */
//GET ALL
router.get("/", getAllHotelHandler);

/**
 * @swagger
 * /api/hotels/countByCity:
 *  get:
 *    summary: get hotels count by cities
 *    tags: [Hotel]
 *    parameters:
 *      - in: query
 *        name: cities
 *        description: get hotel count by cities
 *        schema:
 *          type: string
 *          example: Bandung,Jakarta,Ciamis,Tasikmalaya
 *    responses:
 *      200:
 *        description: Successfully get detail hotel.
 *      500:
 *        description: something went wrong
 */
//COUNT BY CITY, TYPE
router.get("/countByCity", countByCityHandler);

/**
 * @swagger
 * /api/hotels/countByType:
 *  get:
 *    summary: get hotels count by type
 *    tags: [Hotel]
 *    responses:
 *      200:
 *        description: Successfully get detail hotel.
 *      500:
 *        description: something went wrong
 */
router.get("/countByType", countByTypeHandler);

/**
 * @swagger
 * /api/hotels/room/{id}:
 *  get:
 *    summary: get detail user
 *    tags: [Hotel]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: get hotel and room
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    responses:
 *      200:
 *        description: Successfully get hotel and room
 *      500:
 *        description: something went wrong
 */
router.get("/room/:id", getHotelRoomsHandler);

export default router;
