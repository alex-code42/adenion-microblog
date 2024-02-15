import { useRouter } from 'next/router';

export default function Form({ defaultData }) {
  const router = useRouter();
  const { id } = router.query;

  async function editPost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log('Form Data:', formData);

    const placeData = {};
    
    // Iterate through formData.entries() and convert them to a plain object
    for (const [key, value] of formData.entries()) {
      placeData[key] = value;
    }

    console.log('Post Data:', placeData);
    
    await sendRequest(`/api/posts/${id}`, { arg: placeData });
    router.push('/');
  }

  async function sendRequest(url, { arg }) {
    console.log('Sending Request to:', url);
    console.log('Request Data:', arg);

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(arg),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status}`);
    }

    // You can handle the response here if needed
    const responseData = await response.json();
    console.log('Response Data:', responseData);
  }

  return (
    <form onSubmit={editPost}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          defaultValue={defaultData?.name}
        />
      </div>
      <div>
        <label htmlFor="imageurl">Image Url:</label>
        <input
          type="text"
          id="imageurl"
          placeholder="Enter your imageurl"
          defaultValue={defaultData?.imageurl}
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          placeholder="Enter text"
          defaultValue={defaultData?.text}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
