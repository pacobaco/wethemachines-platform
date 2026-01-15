export async function fetchTopBlogPosts() {
  try {
    const res = await fetch("/api/blogPosts");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}