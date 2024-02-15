import dbConnect from "../../../db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  await dbConnect();
  
  
  const { id } = request.query;

  if (request.method === "GET") {
    const post = await Post.findById(id);
    console.log("my Post Review",post);

    if (!post) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(post);
  }
  if (request.method === "PUT") {
    try {
      const postToUpdate = await Post.findByIdAndUpdate(
        id,
        request.body,
        { new: true, runValidators: true } // Options to return the updated document and run validation
      );

      if (!postToUpdate) {
        return response.status(404).json({ status: "Not Found" });
      }

      response.status(200).json(postToUpdate);
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  if (request.method === "DELETE") {
    const postToDelete = await Post.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json(postToDelete);
  }
}