import React from "react";
import { Link } from "react-router-dom";
import appwriteDataBase from "../appwrite/database";

function BlogCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-[90%] bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-center ">
        <div className="w-full justify-center pt-4ww p-2 flex items-center">
          <img
            src={appwriteDataBase.getImagepreview(featuredImage)}
            alt={title}
            className="rounded-xl h-[18rem] w-[80%]  border-4 border-violet-300"
          />
        </div>
        <h2 className="text-xl font-bold truncate">{title}</h2>
      </div>
    </Link>
  );
}

export default BlogCard;
