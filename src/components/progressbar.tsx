import { useState, useEffect } from "react";
import { client } from "../sanityClient";

interface PostType {
  id: string;
}
const ProgressBar = () => {
  const [Postids, setpostids] = useState<PostType[]>([]);
  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{ _id}`)
      .then((data: PostType[]) => {
        // explicitly type data

        setpostids(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-[100%] pt-10 flex-col justify-center">
      <div className="sm:w-[90%] w-[100%] m-auto">
        <div className="flex justify-between mb-1">
          <span className="text-[11px] font-medium text-gray-300 dark:text-white">
            {Postids.length}/2000
          </span>
          <span className="text-[11px] font-medium text-grey-700 dark:text-white">
            {(Postids.length / 2000) * 100}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-white h-2.5 rounded-full"
            style={{ width: `${(Postids.length / 2000) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
