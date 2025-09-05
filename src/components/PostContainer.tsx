import { useNavigate } from "react-router";
const PostContainer = ({
  id,
  title,
  content,
  date,
}: {
  id: string;
  title: string;
  content: string;
  date: string;
}) => {
  const navigate = useNavigate();
  function sendToLink() {
    return navigate(`/blog/${id}`);
  }
  return (
    <div className="py-4 ">
      <div className="flex gap-10 justify-between py-2 items-center">
        <p className="text-gray-100 truncate font-semibold">{title}</p>
      </div>
      <p
        style={{ whiteSpace: "pre-line" }}
        className="text-gray-300 text-sm clamp text-justify "
      >
        {content}
      </p>
      <div className="flex justify-between">
        <p
          className="text-white italic font-semibold cursor-pointer"
          onClick={sendToLink}
        >
          Read More
        </p>
        <p className="text-gray-100 font-semibold text-[12px] flex justify-end">
          {date}
        </p>
      </div>
    </div>
  );
};

export default PostContainer;
