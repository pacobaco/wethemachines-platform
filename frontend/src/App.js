import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";
import { fetchTopBlogPosts } from "./api/blogPosts";
import { Tooltip } from "react-tooltip";

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
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Welcome to Wethemachines</h2>
          <p>Converge knowledge, not prestige. Submit anonymously, watch clusters emerge, and participate in governance phases safely.</p>

          {cycle && (
            <>
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Current Phase: {cycle.phase} | Submissions: {cycle.submissions} | Clusters: {cycle.clusters}
              </p>

              {/* Phase Progress Bar */}
              <progress value={cycle.attestations} max={cycle.attestationThreshold} style={{ width: "100%", marginBottom: "1rem" }} />

              {/* Top Cluster Bubble Chart */}
              <div style={{ height: 200, marginBottom: "1rem" }}>
                <svg width="100%" height="100%">
                  {cycle.clusters.slice(0, 5).map((c, idx) => (
                    <circle
                      key={c._id}
                      cx={50 + idx * 80}
                      cy={100}
                      r={10 + c.submissions.length * 3}
                      fill={`hsl(${idx * 60}, 70%, 50%)`}
                      data-tip={`${c.label} (${c.submissions.length} submissions)`}
                    />
                  ))}
                </svg>
                <Tooltip />
              </div>

              {/* Top 3 Blog Posts */}
              {blogClusters.length > 0 && (
                <div className="cluster-preview">
                  <h4>Top Blog Posts</h4>
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
            </>
          )}

          <button className="cta-button" onClick={scrollToDashboard}>Enter Platform</button>
        </div>
      </section>

      {/* Dashboard */}
      <div ref={dashboardRef}>
        {cycle ? <ConvergenceDashboard cycle={cycle} /> : <p>Loading platform…</p>}
      </div>
    </>
  );
}