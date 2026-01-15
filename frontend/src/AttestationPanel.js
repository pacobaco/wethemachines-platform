export default function AttestationPanel({ phase }) {
  if (phase !== "Attestation") return null;

  return (
    <section>
      <h3>Artifact Attestation</h3>
      <p>Identified participants may attest to finalized artifacts.</p>
      <button disabled>Attest (mock)</button>
    </section>
  );
}

