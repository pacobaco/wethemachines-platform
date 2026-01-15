import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";

export default function App() {
  const [cycle, setCycle] = useState(null);
  const dashboardRef = useRef(null);

  // Fetch live convergence stats and clusters
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

    fetchCycle();
    const interval = setInterval(fetchCycle, 5000); // refresh every 5s
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
          <p>
            Submit anonymously, watch clusters emerge, and participate in governance phases safely.
          </p>

          {/* Hero Stats */}
          {cycle && (
            <div id="hero-stats">
              <p style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                Current Phase: {cycle.phase} | Submissions: {cycle.submissions} | Clusters: {cycle.clusters}
              </p>

              {/* Top clusters preview */}
              {cycle.clusters && cycle.clusters.length > 0 && (
                <div className="cluster-preview">
                  <h4>Top Clusters</h4>
                  <ul>
                    {cycle.clusters.slice(0, 3).map(c => (
                      <li key={c._id}>
                        <strong>{c.label}</strong> ({c.submissions.length} submissions)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <button className="cta-button" onClick={scrollToDashboard}>
            Enter Platform
          </button>
        </div>
      </section>

      {/* React Dashboard */}
      <div ref={dashboardRef}>
        {cycle ? <ConvergenceDashboard cycle={cycle} /> : <p>Loading platform…</p>}
      </div>
    </>
  );
}
