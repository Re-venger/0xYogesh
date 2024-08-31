import { getStoredFilesById } from "../../../../../lib/posts";

export async function GET(req, { params }) {
  const { slug } = params;

  // console.log("Slug: ", slug);
  
  try {
    const post = await getStoredFilesById(slug);

    if (!post) {
      return new Response(JSON.stringify({ error: "Post Not Found" }), { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
