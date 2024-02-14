import AddComments from "@/components/addcomment";
import Comments from "@/components/comments";
import Navbar from "@/components/navbar";

export default function Detail() {
    return (
        <div>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f8f4f3]">
            <Navbar />
            <div className="mb-10 flex items-center justify-center gap-x-6">
                    <a
                        href="#"
                        className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Edit
                    </a>
                    <div><h2>Detail</h2></div>
                    <a
                        href="#"
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Delete
                    </a>
            </div>
            <img class="h-auto max-w-lg rounded-lg" src="https://www.freecodecamp.org/news/content/images/size/w2000/2022/04/pexels-markus-winkler-4052195.jpg" alt="image description"></img>
            <div className="text-center mt-5">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Data to enrich your online business
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam occaecat fugiat aliqua.
                    </p>
                
            </div>
            <Comments />
   </div>
            <AddComments />
   </div>
    )
}