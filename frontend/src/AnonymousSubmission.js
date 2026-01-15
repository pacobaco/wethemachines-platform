import { useState } from "react";

export default function AnonymousSubmission({ phase }) {
  const [content, setContent] = useState("");

  if (phase !== "Input") return null;

  async function submit() {
    await fetch("/api/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    setContent("");
  }

  return (
    <section>
      <h3>Anonymous Input</h3>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: "100%", height: "6rem" }}
      />
      <button onClick={submit}>Submit</button>
    </section>
  );
}
