import PostContainer from "./components/PostContainer";
import ProgressBar from "./components/progressbar";
import { client } from "./sanityClient";
import { useEffect, useState } from "react";
interface PostType {
  _id: string;
  title: string;
  slug: any; // you can replace `any` with proper slug type
  body: any[]; // array of Sanity blocks
  publishedAt: string;
}
function App() {
  const [posts, setPosts] = useState<PostType[]>([]);

  function reverseArr<T>(arr: T[]): T[] {
    const reversed: T[] = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{title, slug, body, publishedAt , _id}`)
      .then((data: PostType[]) => {
        // explicitly type data
        const newarr = reverseArr(data);
        setPosts(newarr);
      })
      .catch(console.error);
  }, []);
  return (
    <main className="flex justify-center w-[100vw]">
      <section className="mt-4 sm:p-4 px-4 py-4 w-[95%] max-w-[700px]">
        <h1 className="text-white sm:text-2xl text-xl flex justify-center">
          Tushar's Blog
        </h1>
        <ProgressBar />
        <h2 className="text-white sm:text-xl text-lg pt-3 mt-6 pb-2 italic">
          All Posts
        </h2>
        {posts.length !== 0
          ? posts.map(
              (post: {
                title: string;
                body: any;
                publishedAt: any;
                slug: any;
                _id: string;
              }) => (
                <PostContainer
                  id={post._id}
                  key={post._id}
                  title={post.title}
                  content={
                    Array.isArray(post.body)
                      ? post.body
                          .map((block) =>
                            block.children?.map((child: any) => child.text)
                          )
                          .join("\n")
                      : ""
                  }
                  date={post.publishedAt.slice(0, 10)}
                />
              )
            )
          : ""}
      </section>
    </main>
  );
}

export default App;
