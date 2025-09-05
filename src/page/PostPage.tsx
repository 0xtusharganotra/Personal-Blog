import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../sanityClient";

import { urlFor } from "../components/SanityImageUrl";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    client
      .fetch(
        `*[_type == "post" && _id == $id][0]{title, body, publishedAt , mainImage}`,
        {
          id,
        }
      )
      .then(setPost)
      .catch(console.error);
  }, [id]);

  if (!post) return <p className="text-sm text-gray-400">Loading...</p>;

  const content = Array.isArray(post.body)
    ? post.body
        .map((block: any) =>
          block.children?.map((child: any) => child.text).join("")
        )
        .join("\n")
    : "";

  return (
    <main className="flex justify-center w-[100vw]">
      <section className="mt-4 sm:p-4 px-4 py-4 w-[95%] max-w-[700px]">
        <Link to="/" className="text-gray-400 underline text-sm">
          ← Back to Home
        </Link>
        <h1 className="sm:text-2xl text-xl font-bold text-white mt-6">
          {post.title}
        </h1>
        <p className="text-gray-400 text-sm float-right italic">
          {post.publishedAt.slice(0, 10)}
        </p>
        {post.mainImage && (
          <>
            {console.log(urlFor(post.mainImage).url())}
            <img
              src={urlFor(post.mainImage).url()}
              alt={post.title}
              className="max-w-[700px] w-[100%] "
            />
          </>
        )}
        <p
          style={{ whiteSpace: "pre-line" }}
          className="mt-4 text-gray-200 py-6"
        >
          {content}
        </p>
      </section>
    </main>
  );
};

export default PostPage;
