"use client";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";

const PostPage = ({ params }) => {
  const { slug } = params;

  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getReadingtime = (content) => {
    const Contentlength = content.split(" ").length;
    const readingRate = Contentlength/225;
    return  Math.ceil(readingRate);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`/api/posts/${slug}`);

        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const data = await resp.json();
        setPostData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!postData) return <div>No post found</div>;

  return (
    <div className="container mx-auto w-10/12">
      <ul className="flex gap-2 text-sm mb-3 flex-wrap">
        {postData.categories.map((cats) => {
          return <li key={cats} className="bg-gray-200 rounded-full p-2">{cats}</li>;
        })}
      </ul>
      <h1 className="text-4xl font-semibold mb-6">{postData.title}</h1>

      <div className="flex items-center justify-between text-sm mb-6 px-2">
        <p className="">{postData.date}</p>
        <div className="flex gap-2">
          <p className="text-sm">{getReadingtime(postData.content)} min read</p> | 
          <p>{postData.author}</p>
        </div>
      </div>

      <ul className="flex gap-2 mb-4 flex-wrap">
        {postData.tags.map((tag) => {
          return (
            <li key={tag} className="bg-gray-200 rounded-full p-2 text-xs italic">
              #{tag}
            </li>
          );
        })}
      </ul>
      <Markdown>{postData.content}</Markdown>
    </div>
  );
};

export default PostPage;
