import useSWR from "swr";

export default function PostForm() {
  const posts = useSWR("/api/posts");
  // We're declaring posts here because we call the .mutate() method below.

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const postData = Object.fromEntries(formData);
    // We're declaring postData and filling it with the values we've extracted from our form via Object.fromEntries().

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Here we're using the API route we've built earlier.
    // We're declaring a response returning a promise while we're posting to our database.

    // Here we're using fetch and not swr, because swr is for data fetching, and not data mutation.
    // ... but we can notify swr about data changes using the mutate function! (See below.)

    // Our method is post, the body contains our postData JSON, and our header provides additional information about the data we're sending.

    // Our joke is on its way!

    if (response.ok) {
      // If our attempt at posting our joke is a success, we proceed here.
      await response.json();
      // At this point, the promise of response has resolved.
      posts.mutate();
      // Now we're notifying swr that our data has been mutated, which will trigger a rerender.
      // If we don't include this line, the page won't automatically refresh and our submitted joke won't be immediately visible.
      event.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
}