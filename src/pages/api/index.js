if (request.method === "POST") {
    try {
      const postData = request.body;
      // We're declaring postData to contain the body of our request sent by our form that we haven't created yet.
      // The body of our request might contain data in a variety of formats, but is typically an object.
      const post = new Joke(postData);
      // Utilizing our Joke scheme, we're creating a new post.
      // At this point we're sanitizing our data according to the schema of our Joke model.
      await post.save();
      // We've created a new post, now we're calling save() to have mongoose insert a new document into our database.
  
      // The three lines above are functionally the same as:
      // Joke.create(request.body)
      // It's just a somewhat less opaque way.
  
      response.status(201).json({ status: "Post created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }