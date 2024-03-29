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
 *    summary: Update or edit user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the user to be updated
 *        required: true
 *        schema:
 *          type: string
 *          example: 65a886f596842c89e2995245
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *                description: Username
 *                example: asep1
 *              email:
 *                type: string
 *                description: Email
 *                example: asep1@csm.com
 *              country:
 *                type: string
 *                description: Country
 *                example: Indonesia
 *              img:
 *                type: string
 *                format: binary
 *              city:
 *                type: string
 *                description: City
 *                example: Bogor
 *              phone:
 *                type: string
 *                description: Phone
 *                example: 082118418130
 *              password:
 *                 type: string
 *                 description: Password
 *                 example: password123
 *    responses:
 *      200:
 *        description: Successfully updated.
 *      500:
 *        description: Something went wrong.
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
