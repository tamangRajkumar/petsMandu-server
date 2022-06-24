import express from "express";
import formidable from "express-formidable"

const router = express.Router();

//import middlewares
import { requireSignin } from "../middlewares/auth";

// import controllers
import {  createPost, uploadImage } from "../controllers/post";

router.post("/create-post",requireSignin, createPost);

router.post("/upload-image", formidable(10*1024*1024), uploadImage)

module.exports = router;
