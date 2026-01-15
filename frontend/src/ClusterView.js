import { useEffect, useState } from "react";

export default function ClusterView({ phase }) {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    fetch("/api/synthesize")
      .then(res => res.json())
      .then(setClusters);
  }, []);

  if (!["Deliberation", "Convergence"].includes(phase)) return null;

  return (
    <section>
      <h3>Clusters</h3>
      <ul>
        {clusters.map(c => (
          <li key={c._id}>● {c.label} ({c.submissions.length})</li>
        ))}
      </ul>
    </section>
  );
}
