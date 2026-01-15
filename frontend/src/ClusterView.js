export default function ClusterView({ phase }) {
  if (phase !== "Deliberation" && phase !== "Convergence") return null;

  const clusters = [
    { id: 1, label: "Economic Signals" },
    { id: 2, label: "Infrastructure Risks" },
    { id: 3, label: "Cultural Dynamics" }
  ];

  return (
    <section>
      <h3>Active Clusters</h3>
      <ul>
        {clusters.map(c => (
          <li key={c.id}>● {c.label}</li>
        ))}
      </ul>
    </section>
  );
}
