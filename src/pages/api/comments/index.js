import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      // Handling GET request to retrieve all comments
      const comments = await Comment.find();
      return response.status(200).json(comments);
    }

    if (request.method === "POST") {
      // Handling POST request to create a new comment
      const commentData = request.body;

      try {
        // Validate if required fields are present in the request body
        if (!commentData.name || !commentData.email || !commentData.text || !commentData.postId) {
          return response.status(400).json({ error: "Name, Email, Text, and PostId are required fields." });
        }

        // Create a new Comment instance using the provided data
        const comment = new Comment(commentData);

        // Save the comment to the database
        await comment.save();

        // Respond with a success message
        response.status(201).json({ status: "Comment created" });
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
