import AnonymousSubmission from "./AnonymousSubmission";
import ClusterView from "./ClusterView";
import AttestationPanel from "./AttestationPanel";
import { ForceGraph2D } from "react-force-graph";

export default function ConvergenceDashboard({ cycle }) {
  // Prepare nodes for ForceGraph
  const nodes = cycle.clusters.map(c => ({ id: c.label, val: c.submissions.length }));
  const links = []; // optionally create links between clusters if needed

  return (
    <section style={{ padding: "2rem 1rem" }}>
      <h2>Convergence Dashboard</h2>

      <ul>
        <li><strong>Current Phase:</strong> {cycle.phase}</li>
        <li><strong>Submissions:</strong> {cycle.submissions}</li>
        <li><strong>Clusters:</strong> {cycle.clusters}</li>
        <li><strong>Attestations:</strong> {cycle.attestations} / {cycle.attestationThreshold}</li>
      </ul>

      <div style={{ height: 400 }}>
        <ForceGraph2D
          graphData={{ nodes, links }}
          nodeAutoColorBy="id"
          nodeLabel={node => `${node.id} (${node.val} submissions)`}
        />
      </div>

      <AnonymousSubmission phase={cycle.phase} />
      <ClusterView phase={cycle.phase} />
      <AttestationPanel phase={cycle.phase} />
    </section>
  );
}