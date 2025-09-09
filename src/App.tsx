import PostContainer from "./components/PostContainer";
import ProgressBar from "./components/progressbar";
import { client } from "./sanityClient";
import axios from "axios";
import { useEffect, useState } from "react";
interface PostType {
  _id: string;
  title: string;
  slug: any; // you can replace `any` with proper slug type
  body: any[]; // array of Sanity blocks
  publishedAt: string;
}

interface Quotes {
  author: string;
  quote: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function getQuotes() {
      try {
        const response = await axios.get<{
          quotes: Quotes[];
        }>("/Quotes.json");
        const quotes = response.data.quotes;

        // Fixed start date
        const startDate = new Date("2025-09-08");
        const today = new Date();

        // Difference in days
        const diffTime = today.getTime() - startDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // Loop through quotes
        const quoteIndex = diffDays % quotes.length;

        const todaysQuote = quotes[quoteIndex];

        setQuote(todaysQuote.quote);
        setAuthor(todaysQuote.author);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    }

    getQuotes();
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post" ] | order(publishedAt desc) {title, slug, body, publishedAt , _id}`
      )
      .then((data: PostType[]) => {
        // explicitly type data

        setPosts(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main className="flex justify-center w-[100vw]">
      <section className="mt-4 sm:p-4 px-4 py-4 w-[95%] max-w-[700px]">
        <h1 className="text-white sm:text-2xl text-xl flex justify-center">
          Personal Dojo
        </h1>
        {quote && (
          <p className="text-white m-auto text-center my-7 px-4 py-2 text-md bg-gray-800 flex flex-col rounded-xl">
            <span>
              <i>"{quote}"</i>
            </span>
            <span className="text-[11px]">
              <i> -{author}</i>
            </span>
          </p>
        )}
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
