import dbConnect from "../../../db/connect";
import Post from "@/db/models/Post";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      // Handling GET request to retrieve all posts
      const posts = await Post.find();
      return response.status(200).json(posts);
    }

    if (request.method === "POST") {
      // Handling POST request to create a new post
      const postData = request.body;

      try {
        // Validate if required fields are present in the request body
        if (!postData.name || !postData.imageurl || !postData.text) {
          return response.status(400).json({ error: "Name, Image URL, and Text are required fields." });
        }

        // Create a new Post instance using the provided data
        const post = new Post(postData);

        // Save the post to the database
        await post.save();

        // Respond with a success message
        response.status(201).json({ status: "Post created" });
      } catch (error) {
        console.error(error);
        response.status(400).json({ error: error.message });
      }
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
