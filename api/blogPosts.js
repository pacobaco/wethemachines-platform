// frontend/src/api/blogPosts.js
export async function fetchTopBlogPosts() {
  try {
    const res = await fetch("https://www.wethemachines.com/2026/01/posts.json"); 
    // Example: [{id, title, url, summary}]
    const data = await res.json();
    return data.slice(0, 3); // top 3
  } catch (err) {
    console.error(err);
    return [];
  }
}
