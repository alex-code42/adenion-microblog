import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import Form from '@/components/Form';
import useSWRMutation from "swr/mutation";


export default function EditPage() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data: post, isLoading, error } = useSWR(`/api/posts/${id}`);

  const { trigger, isMutating } = useSWRMutation(
    `/api/posts/${id}`,
    sendRequest
  );
  
  async function handleEditPosts(event) {
    console.log("Where is my data",event.target);
    event.preventDefault();
    const formData = new FormData(event.target);
    const placeData = Object.fromEntries(formData);
    console.log("Where is my data",postData);
    // Here you are preparing your updated data to be handed over to your sendRequest function.
    trigger(postData);
    // By calling trigger with our jokeData object, you provide your `sendRequest` function with the necessary `arg` object.
    push("/");
  }
  async function sendRequest(url, { arg }) {
    // The sendRequest function expects url and { arg } as parameters.
    // This naming convention isn't unintentional. It needs to be named like that.
    // This has to do with how useSWRMutation works.
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // This syntax follows that of any regular HTTP response.
    // Note the arg object that is passed as part of the response body.
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  console.log('Post edited in places', post);






  // return (...)




  

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Link href={`/places/${id}`} passHref legacyBehavior>Back
      </Link>
      <Form onSubmit={handleEditPlace} formName={'edit-place'} defaultData={place} />
    </>
  );
}