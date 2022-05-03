import express from "express";
import UserController from "../controllers/users";
import UserService from "../services/users.service";

const userService = new UserService
const userController = new UserController(userService);
const router = express.Router();

//Get users
router.get("/", userController.getUsers);

//Ajax Get all users
router.get("/all", userController.getAllUsers);

//Ajax Order Alphabetically by name. Show last name in capital letters
router.get("/op1", userController.getUsersAlphabetically);

//Ajax Show the users whose name start with "a", "b" and "c"
router.get("/op2", userController.getUsersABC);

//Ajax Show how many users have names that start with "a", "b" and "c" for each one
router.get("/op3", userController.countUsersABC);

//Get specific user
router.get("/:id", userController.getUser);


export default router;
