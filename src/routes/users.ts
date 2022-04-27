import express from "express";
import * as usersController from "../controllers/users";

const router = express.Router();

//Get users
router.get("/", usersController.getUsers);

//Order Alphabetically by name. Show last name in capital letters
router.get("/op1", usersController.operation1);

//Show the users whose name start with "a", "b" and "c"
router.get("/op2", usersController.operation2);

//Show how many users have names that start with "a", "b" and "c" for each one
router.get("/op3", usersController.operation3);

//Get specific user
router.get("/:id", usersController.getUser);


export default router;
