import { useRouter } from 'next/router';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from 'react';

export default function CommentsList({ id }) {
  const [postData, setPostData] = useState(null);
  const router = useRouter(); // Add this line to initialize the router

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/comments`);
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

  console.log('All Reviews', postData);
  const filteredComments = postData?.filter((post) => post.postId === id);
  console.log('my Post Reviewv- id of the comment', filteredComments);

  async function deletePost(commentId) {

    
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    console.log('Is this the id of the comment?', commentId._id);

    if (confirmDelete) {
      try {
        await fetch(`/api/comments/${commentId}`, {
          method: 'DELETE',
        });
        router.push('/');
      } catch (deleteError) {
        console.error('Failed to delete post:', deleteError);
        // Handle delete error gracefully, e.g., display a user-friendly message
      }
    }
  }

  return (
    <div>
      <div className="mt-8">
        <ul role="list" className="divide-y divide-gray-100">
          {filteredComments?.map((comment) => (
            <li key={comment._id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{comment.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.text}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">14. Feb 2024</p>
                <a
                  href="#"
                  onClick={() => deletePost(comment._id)}
                  className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
