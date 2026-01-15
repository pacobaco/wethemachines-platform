import { connectDB } from "../lib/db";
import Submission from "../models/Submission";
import crypto from "crypto";

function generatePseudonym(req) {
  const seed = req.headers["x-forwarded-for"] || Date.now().toString();
  return crypto.createHash("sha256").update(seed).digest("hex").slice(0, 12);
}

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { content, phase } = req.body;
    const CURRENT_PHASE = "Input";
    if ((phase || CURRENT_PHASE) !== "Input")
      return res.status(403).json({ error: "Submissions not allowed in current phase" });
    const submission = await Submission.create({
      content,
      phase: phase || CURRENT_PHASE,
      pseudonym: generatePseudonym(req)
    });
    return res.status(201).json({ id: submission._id, phase: submission.phase });
  }

  if (req.method === "GET") {
    const submissions = await Submission.find().select("content phase pseudonym createdAt");
    return res.status(200).json(submissions);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}
