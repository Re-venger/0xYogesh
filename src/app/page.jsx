"use client";
import PostCard from "@/components/PostCard/PostCard";
import { useEffect, useState } from "react";

export default function Home() {

  const [blogpostData, setblogPostData] = useState();

  useEffect(() => {
    fetch("/api/posts/")
      .then((response) => response.json())
      .then((data) => setblogPostData(data));
  }, []);

  // console.log("blogposts: ",blogpostData);
  

  return (
    <div className="container mx-auto md:w-10/12 h-auto flex flex-col justify-between items-start">
      <section className="px-3 md:px-6 flex flex-col gap-3 md:gap-2  mb-6 md:mb-8">
        <h1 className="text-xl md:text-3xl font-bold ">Blogs & WriteUps</h1>
        <h3 className="text-xs md:text-lg font-semibold">
          All My Experiences and Learnings are here for you all !!
        </h3>
      </section>

      <div className="flex flex-col border border-gray-200 w-full mb-8 self-center"></div>

      <section className="flex flex-col gap-4">
        {blogpostData && blogpostData.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              author={post.author}
              featured_image={post.featured_image}
              reading_time={post.reading_time}
              categories={post.categories}
              tags={post.tags}
            />
          );
        })}
      </section>
    </div>
  );
}
