import { useRouter } from 'next/router';
import useSWR from 'swr';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from "@/components/navbar";
import CommentsList from '@/components/commentsList';
import CommentForm from '@/components/commentForm';

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
  return(
    <>
    
        <div>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
            <Navbar />
            <div className="mb-10 flex items-center justify-center gap-x-6">
                    <a
                        href={`${id}/edit`}
                        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Edit
                    </a>
                    <div><h2>Detail</h2></div>
                    <a
                        href="#"
                        onClick={deletePost}
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Delete
                    </a>
            </div>
            <img className="h-auto max-w-lg rounded-lg" src={postData.imageurl} alt="image description"></img>
            <div className="text-center mt-5">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    {postData.name}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    {postData.text}
                    </p>
                
            </div>
            <CommentsList id={id}/>
   </div>
            <CommentForm />
   </div>
    
    </>
  )


  return (
    <div>
      <h2>{postData.name}</h2>
      <p>{postData.text}</p>
      <button onClick={deletePost}>Delete Post</button>
      <Link href={`${id}/edit`}> Edit Post</Link>

    </div>
  );
}
