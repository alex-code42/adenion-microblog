import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Edit() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    imageurl: '',
    text: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can add logic to send the formData to your MongoDB database.
    // For example, you can use fetch or an API library to make a POST request.

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data updated successfully!');
        // Redirect or perform any other actions upon successful submission.
        router.push('/');
      } else {
        console.error('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

    

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="imageurl">Image Url:</label>
        <input
          type="text"
          id="imageurl"
          value={formData.imageurl}
          onChange={handleInputChange}
          placeholder="Enter your imageurl"
        />
      </div>
      <div>
        <label htmlFor="text">Text:</label>
        <textarea
          id="text"
          value={formData.text}
          onChange={handleInputChange}
          placeholder="Enter text"
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}