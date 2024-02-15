import dbConnect from "../../../db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();
  
  
  const { id } = request.query;

  if (request.method === "GET") {
    const comment = await Post.findById(id);
    console.log("my Post Review",comment);

    if (!comment) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(post);
  }
  

  if (request.method === "DELETE") {
    const commentToDelete = await Comment.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json(commentToDelete);
  }
}