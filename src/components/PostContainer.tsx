import React from "react";
import { Link } from "react-router";
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
        <p className="text-gray-100 truncate w-[80%]  font-semibold">{title}</p>
        <p className="text-gray-100 font-semibold w-[20%] text-[12px] flex justify-end">
          {date}
        </p>
      </div>
      <p
        style={{ whiteSpace: "pre-line" }}
        className="text-gray-300 text-sm clamp text-justify "
      >
        {content}
      </p>
      <span
        className="text-white italic font-semibold cursor-pointer"
        onClick={sendToLink}
      >
        Read More
      </span>
    </div>
  );
};

export default PostContainer;
