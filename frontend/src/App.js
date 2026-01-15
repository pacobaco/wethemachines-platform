import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";
import { fetchTopBlogPosts } from "./api/blogPosts";

export default function App() {
  const [cycle, setCycle] = useState(null);
  const [blogClusters, setBlogClusters] = useState([]);
  const dashboardRef = useRef(null);
  const clustersRef = useRef(null);
  const blogRef = useRef(null);

  useEffect(() => {
    async function fetchCycle() {
      const res = await fetch("/api/cycle");
      const data = await res.json();
      setCycle(data);
    }

    async function loadBlogClusters() {
      const posts = await fetchTopBlogPosts();
      setBlogClusters(posts);
    }

    fetchCycle();
    loadBlogClusters();

    const interval = setInterval(fetchCycle, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToRef = ref => ref.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <h2>Welcome to Wethemachines</h2>
          <p>Converge knowledge, not prestige. Submit anonymously, watch clusters emerge, and participate in governance phases safely.</p>

          {cycle && (
            <div id="hero-stats">
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Current Phase: {cycle.phase} | Submissions: {cycle.submissions} | Clusters: {cycle.clusters}
              </p>
            </div>
          )}

          {/* Top 3 Blog Posts */}
          {blogClusters.length > 0 && (
            <div className="cluster-preview" id="blog">
              <h4>Top Blog Posts</h4>
              <ul>
                {blogClusters.slice(0, 3).map(post => (
                  <li key={post.id}>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
<button
  className="cta-button"
  onClick={() => dashboardRef.current?.scrollIntoView({ behavior: "smooth" })}
>
  Enter Platform
</button>
         
        </div>
      </section>

      {/* Dashboard */}
<div ref={dashboardRef} id="dashboard">
  {cycle ? (
    <ConvergenceDashboard
      cycle={cycle}
      clustersRef={clustersRef}
      blogRef={blogRef}
      blogClusters={blogClusters}
    />
  ) : (
    <p>Loading platform…</p>
  )}
</div>   
    </>
  );
}