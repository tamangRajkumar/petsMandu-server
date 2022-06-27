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
  // console.log(req.body);
  // console.log(req.user)
  const { description, address, image } = req.body;
  // console.log(description, address, image)
  if (!description.length) {
    return res.json({
      error: "Description is needed",
    });
  }
  try {
    const post = new Post({
      description,
      address,
      image,
      postedBy: req.auth._id,
    });
    post.save();
    res.json(post);
  } catch (error) {
    console.log("Error=> ", error);
  }
};
