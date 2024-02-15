import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  name: { type: String },
  imageurl: { type: String },
  text: { type: String },
  
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;