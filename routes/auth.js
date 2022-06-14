import express from "express";

const router = express.Router();

// import controllers
import { signUp, logIn } from "../controllers/auth";

router.post("/signup", signUp);
router.post("/logIn", logIn)

module.exports = router;
