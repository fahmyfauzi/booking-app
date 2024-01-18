import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoomHandler,
  updateRoomHandler,
  deleteRoomHandler,
  getAllRoomHandler,
  getRoomByIdHandler,
} from "../controllers/room.js";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *        Room:
 *             type: object
 *             required:
 *                  - title
 *                  - price
 *                  - maxPeople
 *                  - desc
 *                  - roomNumbers
 *             properties:
 *                  _id:
 *                       type: string
 *                       description: The auto-generate id of user collection
 *                  price:
 *                       type: string
 *                       description: Price room
 *                  maxPeople:
 *                       type: string
 *                       description: maxPeople
 *                  desc:
 *                       type: string
 *                       description: description hotel
 *                  roomNumbers:
 *                       type: array
 *                       description: room numbers
 *             example:
 *                  _id: 65a89ff34582d313337a1909
 *                  title: Room Adem
 *                  price: 250000
 *                  maxPeople: 4
 *                  desc: Room adem jauh dari jalan raya.
 *                  roomNumbers: [{numbers:101},{numbers:102},{numbers:103},{numbers:104}]
 */

/**
 * @swagger
 * tags:
 *   name: Room
 *   description: Room operation
 */

/**
 * @swagger
 * /api/rooms/{hotelid}:
 *  post:
 *    summary: add new rooms
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: hotelid
 *        description: hotel id want to add room
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Room'
 *    responses:
 *      201:
 *        description: Room successfully created.
 *      500:
 *        description: something went wrong
 */

//CREATE
router.post("/:hotelid", verifyAdmin, createRoomHandler);

/**
 * @swagger
 * /api/rooms/{id}:
 *  put:
 *    summary: update or edit rooms
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id room want to updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a89ff34582d313337a1909
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Room'
 *    responses:
 *      200:
 *        description: Successfully updated.
 *
 *      500:
 *        description: something went wrong
 */
//UPDATE
router.put("/:id", verifyAdmin, updateRoomHandler);

/**
 * @swagger
 * /api/rooms/{id}/{hotelid}:
 *  delete:
 *    summary: delete room
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id room want to deleted
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a89ff34582d313337a1909
 *      - in: path
 *        name: hotelid
 *        description:  where hotel id
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a88bdbed7d9edbd055b313
 *    responses:
 *      200:
 *        description: Successfully updated.
 *
 *      500:
 *        description: something went wrong
 */
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoomHandler);

/**
 * @swagger
 * /api/rooms/{id}:
 *  get:
 *    summary: get detail room
 *    tags: [Room]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id room want to get detail hotel
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a89ff34582d313337a1909
 *    responses:
 *      200:
 *        description: Successfully get detail hotel.
 *
 *      500:
 *        description: something went wrong
 */
// GET
router.get("/:id", getRoomByIdHandler);

/**
 * @swagger
 * /api/rooms:
 *  get:
 *    summary: Get all rooms
 *    tags: [Room]
 *    responses:
 *      200:
 *        description: successfully get all rooms
 *      500:
 *        description: something went wrong
 */
//GET ALL
router.get("/", getAllRoomHandler);

export default router;
