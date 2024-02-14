import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  post: { type: String, required: true },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;