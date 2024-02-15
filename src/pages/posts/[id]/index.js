import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { useState, useEffect } from 'react';

export default function PostsDetails() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log("my Post Review", postData);

  async function deletePost() {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      try {
        await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
        });
        router.push('/');
      } catch (deleteError) {
        console.error('Failed to delete post:', deleteError);
        // Handle delete error gracefully, e.g., display a user-friendly message
      }
    }
  }

  if (!isReady || postData === null) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>{postData.name}</h2>
      <p>{postData.text}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}
