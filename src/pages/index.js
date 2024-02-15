import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';



const inter = Inter({ subsets: ["latin"] });




export default function Home() {
  
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/posts');
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


  return (
    <div>
    <Navbar />
   <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
    
   <ul role="list" className="divide-y divide-gray-100">
  {postData.map((post) => (
    <Link href={`posts/${post._id}`} key={post._id}>
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={post.imageurl} alt="" />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{post.name}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{post.text}</p>
          </div>
        </div>
      </li>
    </Link>
  ))}
</ul>
   </div>
   </div>
  );
}
