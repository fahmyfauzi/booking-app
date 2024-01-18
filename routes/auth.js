import express from "express";

import { registerHandler, loginHandler } from "../controllers/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *        User:
 *             type: object
 *             required:
 *                  - username
 *                  - email
 *                  - password
 *             properties:
 *                  _id:
 *                       type: string
 *                       description: The auto-generate id of user collection
 *                  username:
 *                       type: string
 *                       description: username
 *                  email:
 *                       type: string
 *                       description: email
 *                  country:
 *                       type: string
 *                       description: country
 *                  img:
 *                       type: string
 *                       description: photo profile
 *                  city:
 *                       type: string
 *                       description: city
 *                  phone:
 *                       type: string
 *                       description: phone
 *                  password:
 *                       type: string
 *                       description: password
 *                  isAdmin:
 *                       type: boolean
 *                       description: isAdmin
 *                       default: false
 *
 *             example:
 *                  _id : 65a886f596842c89e2995245
 *                  username: asep
 *                  email: asep@csm.com
 *                  country: Indonesia
 *                  img: asep.jpg
 *                  city: tasikmalaya
 *                  phone: 62821184130
 *                  password: password123
 *                  isAdmin: false
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: authentication apis
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: register new user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: user created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: server internal error
 *
 */

router.post("/register", registerHandler);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *                  username:
 *                       type: string
 *                       example: asep
 *                  password:
 *                       type: string
 *                       example: password123
 *    responses:
 *      200:
 *        description: Successfully authenticated.
 *
 *      500:
 *        description: something went wrong
 */
router.post("/login", loginHandler);

export default router;
