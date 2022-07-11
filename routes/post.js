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
  fetchPostsByCategory,
  fetchIndividualPost,
  fetchPostToEdit,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);

router.post("/upload-image", formidable(10 * 1024 * 1024), uploadImage);
router.get("/user-posts", requireSignin, userPosts);
router.delete("/delete-post/:_id", requireSignin, deletePost);
router.post("/fetchpostsbycategory", fetchPostsByCategory);
router.get("/fetchindividualpost/:_id", fetchIndividualPost);
router.post("/fetchposttoedit", fetchPostToEdit);

module.exports = router;
