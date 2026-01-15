import { useEffect, useState, useRef } from "react";
import ConvergenceDashboard from "./ConvergenceDashboard";

export default function App() {
  const [cycle, setCycle] = useState(null);
  const dashboardRef = useRef(null);

  // Fetch live convergence stats for hero section and dashboard
  useEffect(() => {
    async function fetchCycle() {
      try {
        const res = await fetch("/api/cycle"); // make sure /api/cycle returns phase + counts
        const data = await res.json();
        setCycle(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCycle();
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
