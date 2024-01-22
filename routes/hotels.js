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
 *                  _id:
 *                      type: string
 *                      description: The auto generate id of hotel collection
 *                      example: 65a88bdbed7d9edbd055b313
 *                  name:
 *                       type: string
 *                       description: Hotel name
 *                       example: Hotel Oyo Syariah Bandung
 *                  type:
 *                       type: string
 *                       description: Hotel type
 *                       example: hotel
 *                  city:
 *                       type: string
 *                       description: City
 *                       example: Bandung
 *                  address:
 *                       type: string
 *                       description: address
 *                       example: JL. Soekarno No.456, Blok Harimau III
 *                  distance:
 *                       type: string
 *                       description: distance
 *                       example: 58 KM
 *                  photos:
 *                       type: array
 *                       items:
 *                        type: string
 *                        format: binary
 *                  title:
 *                       type: string
 *                       description: title hotel
 *                       example: Hotel Murah Nyaman
 *                  desc:
 *                       type: string
 *                       description: description hotel
 *                       example: 3 Kasur, Kamar mandi dalam, Free Wifi
 *                  rating:
 *                       type: number
 *                       description: rating min 0 , max 5
 *                       example: 4
 *                  rooms:
 *                        type: array,
 *                        description: rooms hotel
 *                  cheapestPrice:
 *                       type: number
 *                       description: cheapest price
 *                       example: 130000
 *                  featured:
 *                       type: boolean
 *                       descriiption: featured hotel default false
 *                       example: false
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
 *        multipart/form-data:
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
 *        multipart/form-data:
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
