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
              <div className=" shrink-0 items-end sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">14. Feb 2024</p>
                <a
                  href="#"
                  onClick={() => deletePost(comment._id)}
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-120 duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>


                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
