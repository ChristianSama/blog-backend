import express from "express";
import * as authController from "../controllers/auth";
import * as passportConfig from "../config/passport"

const router = express.Router();

router.get("/signup", passportConfig.isNotAuthenticated, authController.getSignup);

router.post("/signup", passportConfig.isNotAuthenticated, authController.postSignup);

router.get("/login", passportConfig.isNotAuthenticated, authController.getLogin);

router.post("/login", passportConfig.isNotAuthenticated, authController.postLogin);

router.post("/logout", passportConfig.isAuthenticated, authController.postLogout);

export default router;
