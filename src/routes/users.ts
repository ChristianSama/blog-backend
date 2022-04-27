import express from "express";
import * as usersController from "../controllers/users";

const router = express.Router();

//Get users
router.get("/", usersController.getUsers);

//Ajax Get all users
router.get("/all", usersController.getAllUsers);

//Ajax Order Alphabetically by name. Show last name in capital letters
router.get("/op1", usersController.getUsersAlphabetically);

//Ajax Show the users whose name start with "a", "b" and "c"
router.get("/op2", usersController.getUsersABC);

//Ajax Show how many users have names that start with "a", "b" and "c" for each one
router.get("/op3", usersController.countUsersABC);

//Get specific user
router.get("/:id", usersController.getUser);


export default router;
