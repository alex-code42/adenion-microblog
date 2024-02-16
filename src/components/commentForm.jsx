import { useState } from 'react';
import { useRouter } from 'next/router';

export default function CommentForm() {
  const router = useRouter();
  const { id } = router.query;
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
    postId: id,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    }),setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you can add logic to send the formData to your MongoDB database.
    // For example, you can use fetch or an API library to make a POST request.

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('This are my comments--->>>Data:', formData);

      if (response.ok) {
        console.log('Data updated successfully!');
        // Redirect or perform any other actions upon successful submission.
        mutate();
        router.push(`/posts/${id}`);
      } else {
        console.error('Failed to update data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


    return (
      <>
    
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="">
          
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Leave a comment
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form 
            onSubmit={handleSubmit}
            className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                    <label 
                    htmlFor="name" 
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input 
                    onChange={handleInputChange}
                    type="text" 
                    id="name" 
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
  
              <div>
               
            <label 
                htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea 
                id="text" 
                onChange={handleInputChange}
                maxLength={150}
                 rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                       <p className="text-sm font-semibold leading-6 text-gray-900">Verbleibende Zeichen: {150 - inputValue.length}</p>


         
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
        </div>
      </>
    )
  }
  