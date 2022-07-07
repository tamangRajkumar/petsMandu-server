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
  // console.log(req.auth._id)
  const { description, address, category, image } = req.body;
  // console.log(description, address, image)
  if (!(description.length && address.length && category.length)) {
    return res.json({
      error: "Description is needed",
    });
  }
  try {
    const post = new Post({
      description,
      address,
      category,
      image,
      postedBy: req.auth._id,
    });
    post.save();
    return res.json({
      saved: "true",
      post,
    });
  } catch (error) {
    console.log("Error=> ", error);
  }
};

// Fetch user post in dashboard
export const userPosts = async (req, res) => {
  // console.log(req.auth);
  try {
    const posts = await Post.find({ postedBy: req.auth._id })
      .populate("postedBy", "_id image")
      .sort({ createdAt: -1 })
      .limit(10);
    console.log(posts);
    return res.json(posts);
  } catch (error) {
    console.log("Error=>", error);
  }
};

// delete post
export const deletePost = async (req, res) => {
  // console.log(req.params._id);
  try {
    const post = await Post.findByIdAndDelete(req.params._id);
    // console.log(post.image)
    if (post.image && post.image.public_id) {
      const deleteImage = await cloudinary.uploader.destroy(
        post.image.public_id
      );
    }
    res.json({ deleted: "true" });
  } catch (error) {
    console.log("Error=> ", error);
  }
};

export const fetchPostsByCategory = async (req, res) => {
  console.log(req.body);
  // const category = req.body;

  // console.log(category);
  // try {
  //   const posts = await Post.find({ category: category })
  //     .populate("postedBy", "_id image")
  //     .sort({ createdAt: -1 })
  //     .limit(10);
  //   console.log(posts);
  //   return res.json(posts);
  // } catch (error) {
  //   console.log("Error=> ", error);
  // }
};
