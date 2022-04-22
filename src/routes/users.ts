import express from "express";
import { PrismaClient } from "@prisma/client";
import * as usersController from "../controllers/users";

const prisma = new PrismaClient();
const router = express.Router();

//Get users
router.get("/", usersController.getUsers);

//Get specific user
router.get("/:id", usersController.getUser);

//Order Alphabetically by name. Show last name in capital letters
router.get("/operation1", usersController.operation1);

//Show the users whose name start with "a", "b" and "c"
router.get("/operation2", usersController.operation2);

//Show how many users have names that start with "a", "b" and "c" for each one
router.get("/operation3", usersController.operation3);

export default router;
