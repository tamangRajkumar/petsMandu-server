import express from "express";

const router = express.Router();

//import middlewares
import { requireSignin } from "../middlewares/auth";

// import controllers
import { signUp, logIn, currentUser } from "../controllers/auth";

router.post("/signup", signUp);
router.post("/logIn", logIn);

router.get("/current-user", requireSignin , currentUser);

module.exports = router;
