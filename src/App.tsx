import PostContainer from "./components/PostContainer";
import { client } from "./sanityClient";
import { useEffect, useState } from "react";
function App() {
  const [posts, setPosts] = useState([]);

  function reversearr(arr) {
    const reversed = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      reversed.push(arr[i]);
    }
    return reversed;
  }

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{title, slug, body, publishedAt , _id}`)
      .then((data) => {
        console.log(data);
        const newarr = reversearr(data);
        setPosts(newarr);
      })
      .catch(console.error);
  }, []);
  return (
    <main className="flex justify-center w-[100vw]">
      <section className="m-4 sm:p-4 px-4 py-4">
        <h1 className="text-white sm:text-2xl text-xl flex justify-center">
          Tushar's Blog
        </h1>
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
