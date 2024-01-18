import express from "express";
import {
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getAllUserHandler,
} from "../controllers/users.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CEK VERIFY
// router.get("/check-authentication", verifyToken, (req, res, next) => {
//   res.send("hello user, youu are logged in!");
// });

/**
 * @swagger
 * tags:
 *   name: User
 *   description: user operation
 */

router.get("/check-user/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete your account");
});

router.get("/check-admin/:id", verifyAdmin, (req, res, next) => {
  res.send("hello user, you are logged in and you can delete all account");
});

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: add new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/User'
 *    responses:
 *      200:
 *        description: Successfully authenticated.
 *
 *      500:
 *        description: something went wrong
 */
//CREATE
router.post("/", verifyAdmin, addUserHandler);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: get detail user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id user want to get detail user
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a886f596842c89e2995245
 *    responses:
 *      200:
 *        description: Successfully updated.
 *
 *      500:
 *        description: something went wrong
 */

//DETAIL USER | GET USER BY ID
router.get("/:id", verifyUser, getUserByIdHandler);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: update or edit user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id user want to updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a886f596842c89e2995245
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: username
 *              email:
 *                type: string
 *                description: email
 *              country:
 *                type: string
 *                description: country
 *              img:
 *                type: string
 *                description: photo profile
 *              city:
 *                type: string
 *                description: city
 *              phone:
 *                type: string
 *                description: phone
 *              password:
 *                 type: string
 *                 description: password
 *            example:
 *              username: asep
 *              email: asep123@csm.com
 *              country: Indonesia
 *              img: asep.jpg
 *              city: Tasikmalaya
 *              phone: 628212345789
 *              password: "password123"
 *    responses:
 *      200:
 *        description: Successfully updated.
 *
 *      500:
 *        description: something went wrong
 */
//UPDATE
router.put("/:id", verifyUser, updateUserHandler);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: delete user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Id user want to updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a886f596842c89e2995245
 *    responses:
 *      200:
 *        description: Successfully deleted.
 *
 *      500:
 *        description: something went wrong
 */
//DELETE
router.delete("/:id", verifyUser, deleteUserHandler);

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: 'ok'
 *      500:
 *        description: something went wrong
 */

//GET ALL
router.get("/", verifyAdmin, getAllUserHandler);
export default router;
