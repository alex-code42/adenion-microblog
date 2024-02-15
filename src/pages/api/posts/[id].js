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
    const postToUpdate = await Post.findByIdAndUpdate(id, request.body);
    // Find the joke by its ID and update the content that is part of the request body!
    response.status(200).json(postToUpdate);
    console.log("placetoupdate",postToUpdate)
    // If successful, you'll receive an OK status code.
  }

  if (request.method === "DELETE") {
    const postToDelete = await Post.findByIdAndDelete(id);
    // Declare jokeToDelete to be the joke identified by its id and delete it.
    // This line handles the entire deletion process.
    response.status(200).json(postToDelete);
  }
}