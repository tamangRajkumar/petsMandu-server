import Post from "../models/post";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});


// Upload Image to cloudinary and response back image url and public id
export const uploadImage = async (req, res) => {
  console.log("req files=> ", req.files);

  try {
    const result = await cloudinary.uploader.upload(req.files.image.path);
    console.log("Uploaded image result=> ", result);
    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.log("Error=> ", error);
  }
};



// create post submit to database
export const createPost = (req, res) => {
  console.log(req.body);
};
