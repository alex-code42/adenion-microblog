import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from "@/components/navbar";

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

    return(
      <div>
        <Navbar />
            <form 
            onSubmit={handleSubmit}
            className="space-y-6 p-16" action="#" method="POST">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                    <label 
                    htmlFor="imageurl" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">imageurl</label>
                    <input 
                    onChange={handleInputChange}
                    value={formData.imageurl}
                    type="text" 
                    id="imageurl" 
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
  
              <div>
               
            <label 
                htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea 
                id="text" 
                value={formData.text}
                onChange={handleInputChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

         
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Post
                </button>
              </div>
            </form>
      </div>
    )
    }


//   return (
//     <div>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           placeholder="Enter your name"
//         />
//       </div>
//       <div>
//         <label htmlFor="imageurl">Image Url:</label>
//         <input
//           type="text"
//           id="imageurl"
//           value={formData.imageurl}
//           onChange={handleInputChange}
//           placeholder="Enter your imageurl"
//         />
//       </div>
//       <div>
//         <label htmlFor="text">Text:</label>
//         <textarea
//           id="text"
//           value={formData.text}
//           onChange={handleInputChange}
//           placeholder="Enter text"
//         ></textarea>
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//     </div>
//   );
// }