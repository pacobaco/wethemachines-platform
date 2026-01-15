import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";

export default function App() {
  const [cycle, setCycle] = useState(null);
  const [topClusters, setTopClusters] = useState([]);
  const dashboardRef = useRef(null);

  // Fetch live convergence stats and top clusters
  useEffect(() => {
    async function fetchCycle() {
      try {
        const res = await fetch("/api/cycle"); // cycle includes counts + topClusters
        const data = await res.json();
        setCycle(data);

        // For demo purposes, pick top 3 clusters
        if (data.clusters && data.clusters.length > 0) {
          setTopClusters(data.clusters.slice(0, 3));
        }
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
            Converge knowledge, not prestige. Submit anonymously, watch clusters form, and participate in governance phases.
          </p>

          {cycle && (
            <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
              Current Phase: {cycle.phase} | Submissions: {cycle.submissions} | Clusters: {cycle.clusters}
            </p>
          )}

          {/* Top clusters preview */}
          {topClusters.length > 0 && (
            <div className="cluster-preview">
              <h4>Top Clusters:</h4>
              <ul>
                {topClusters.map(c => (
                  <li key={c._id}>
                    <strong>{c.label}</strong> ({c.submissions.length} submissions)
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

      {/* React Dashboard */}
      <div ref={dashboardRef}>
        {cycle ? <ConvergenceDashboard cycle={cycle} /> : <p>Loading platform…</p>}
      </div>
    </>
  );
}
