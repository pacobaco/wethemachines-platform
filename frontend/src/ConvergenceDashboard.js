export default function ConvergenceDashboard() {
  // mock state — later replaced by API calls
  const phase = "Convergence";
  const submissions = 42;
  const clusters = 7;
  const attestations = 3;
  const attestationThreshold = 5;

  return (
    <section>
      <h2>Convergence Dashboard</h2>

      <ul>
        <li><strong>Current Phase:</strong> {phase}</li>
        <li><strong>Anonymous Submissions:</strong> {submissions}</li>
        <li><strong>Active Clusters:</strong> {clusters}</li>
        <li>
          <strong>Attestations:</strong>{" "}
          {attestations} / {attestationThreshold}
        </li>
      </ul>

      <progress
        value={attestations}
        max={attestationThreshold}
        style={{ width: "100%", height: "1.2rem" }}
      />

      <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
        Identity visibility increases by phase. Inputs are anonymous.
        Outputs are attested.
      </p>
    </section>
  );
}
