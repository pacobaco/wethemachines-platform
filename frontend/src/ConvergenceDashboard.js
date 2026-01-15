import { useEffect, useState } from "react";
import AnonymousSubmission from "./AnonymousSubmission";
import ClusterView from "./ClusterView";
import AttestationPanel from "./AttestationPanel";

export default function ConvergenceDashboard() {
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    fetch("/api/cycle")
      .then(res => res.json())
      .then(setCycle);
  }, []);

  if (!cycle) return <p>Loading convergence state…</p>;

  return (
    <section>
      <h2>Convergence Dashboard</h2>
      <ul>
        <li><strong>Current Phase:</strong> {cycle.phase}</li>
        <li><strong>Anonymous Submissions:</strong> {cycle.submissions}</li>
        <li><strong>Active Clusters:</strong> {cycle.clusters}</li>
        <li>
          <strong>Attestations:</strong> {cycle.attestations} / {cycle.attestationThreshold}
        </li>
      </ul>
      <progress value={cycle.attestations} max={cycle.attestationThreshold} style={{ width: "100%" }} />

      {/* Phase-gated components */}
      <AnonymousSubmission phase={cycle.phase} />
      <ClusterView phase={cycle.phase} />
      <AttestationPanel phase={cycle.phase} />
    </section>
  );
}
