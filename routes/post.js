import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//import middlewares
import { requireSignin } from "../middlewares/auth";

// import controllers
import {
  createPost,
  uploadImage,
  userPosts,
  deletePost,
  adoptPets,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);

router.post("/upload-image", formidable(10 * 1024 * 1024), uploadImage);
router.get("/user-posts", requireSignin, userPosts);
router.delete("/delete-post/:_id", requireSignin, deletePost);
router.get("/adoptpets", adoptPets);

module.exports = router;
