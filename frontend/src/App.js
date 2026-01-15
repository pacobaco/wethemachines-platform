import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";
import { fetchTopBlogPosts } from "./api/blogPosts";

export default function App() {
  const [cycle, setCycle] = useState(null);
  const [blogClusters, setBlogClusters] = useState([]);
  const dashboardRef = useRef(null);

  useEffect(() => {
    async function fetchCycle() {
      try {
        const res = await fetch("/api/cycle");
        const data = await res.json();
        setCycle(data);
      } catch (err) {
        console.error(err);
      }
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

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <h2>Welcome to Wethemachines</h2>
          <p>
            Converge knowledge, not prestige. Submit anonymously, watch clusters emerge, and participate in governance phases safely.
          </p>

          {/* Hero Stats */}
          {cycle && (
            <div id="hero-stats">
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Current Phase: {cycle.phase} | Submissions: {cycle.submissions} | Clusters: {cycle.clusters}
              </p>
            </div>
          )}

          {/* Top 3 Blog Clusters */}
          {blogClusters.length > 0 && (
            <div className="cluster-preview">
              <h4>Top Wethemachines Blog Posts</h4>
              <ul>
                {blogClusters.map(post => (
                  <li key={post.id}>
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="cta-button" onClick={scrollToDashboard}>
            Enter Platform
          </button>
        </div>
      </section>

      <div ref={dashboardRef}>
        {cycle ? <ConvergenceDashboard cycle={cycle} /> : <p>Loading platform…</p>}
      </div>
    </>
  );
}
