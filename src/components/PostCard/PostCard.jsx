import React, { useEffect, useState } from "react";

const PostCard = ({ id, slug,  title, excerpt, date, author, categories, tags }) => {
    let Newthemeidea;
  {
    ("use client");
    const [themeidea, setThemeidea] = useState("lite");
    useEffect(() => {
      const getThemeVal = document.body.id;
      setThemeidea(getThemeVal);
      Newthemeidea=themeidea
    });
  }

  return (
    <div className={`flex flex-col m-4 p-2`}>
      <div className="flex flex-col gap-4">
        <div className="text-xs md:text-sm flex items-center justify-start gap-4">
          <p>{date}</p>
          <div className=" flex gap-2">
            {categories.map((cat) => {
              return (
                <li
                  key={cat}
                  className={`bg-gray-100 rounded-full list-none px-3 py-1 ${
                    Newthemeidea == "darkMode" ? `text-white` : `text-black`
                  } `}
                >
                  {cat}
                </li>
              );
            })}
          </div>
        </div>
        <a href={`/read/${slug}`} className="text-base md:text-2xl font-bold">
          {title}
        </a>
        <div className="text-sm md:text-base font-light">{excerpt}</div>
        <div className="flex">
          {/* <img src="" alt="" /> */}
          <p className="text-sm">{author}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
