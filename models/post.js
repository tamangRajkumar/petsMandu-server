import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    description: {
      type: {},
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    category: {
      type: {},
      require: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      url: String,
      public_id: String,
    },
    likes: [{ type: ObjectId, ref: "user" }],

    comments: [
      {
        text: String,
        created: {
          type: Date,
          dafault: Date.now,
        },
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
