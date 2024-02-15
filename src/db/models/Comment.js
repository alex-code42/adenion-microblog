import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  email: { type: String },
  name: { type: String },
  text: { type: String },
  postId: { type: String },
  
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;