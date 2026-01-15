export default function AnonymousSubmission({ phase }) {
  if (phase !== "Input") return null;

  return (
    <section>
      <h3>Anonymous Input</h3>
      <textarea
        placeholder="Submit an observation or insight…"
        style={{ width: "100%", height: "6rem" }}
      />
      <button disabled>Submit (mock)</button>
    </section>
  );
}
