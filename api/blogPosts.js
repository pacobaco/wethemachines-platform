// api/blogPosts.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Example JSON feed URL for blog posts
    const response = await fetch("https://www.wethemachines.com/2026/01/posts.json");
    const posts = await response.json();

    // Optional: only take top 5 posts
    const topPosts = posts.slice(0, 5).map(post => ({
      id: post.id,
      title: post.title,
      url: post.url,
      summary: post.summary || "",
      date: post.date || ""
    }));

    res.status(200).json(topPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
}