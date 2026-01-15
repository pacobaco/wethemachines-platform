import { connectDB } from "../lib/db";
import Submission from "../models/Submission";
import crypto from "crypto";

/**
 * Generate a stable, non-reversible pseudonym
 * Uses request metadata but stores nothing identifying
 */
function generatePseudonym(req) {
  const seed =
    req.headers["x-forwarded-for"] ||
    req.headers["user-agent"] ||
    Date.now().toString();

  return crypto
    .createHash("sha256")
    .update(seed)
    .digest("hex")
    .slice(0, 12);
}

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    return res.status(500).json({ error: "Database connection failed" });
  }

  // ─────────────────────────────
  // CREATE SUBMISSION (Anonymous)
  // ─────────────────────────────
  if (req.method === "POST") {
    const { content, phase } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Invalid content" });
    }

    try {
      const submission = await Submission.create({
        content,
        phase: phase || "Input",
        pseudonym: generatePseudonym(req)
      });

      return res.status(201).json({
        id: submission._id,
        phase: submission.phase
      });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create submission" });
    }
  }

  // ─────────────────────────────
  // READ SUBMISSIONS (Governed)
  // ─────────────────────────────
  if (req.method === "GET") {
    const { phase } = req.query;

    const query = phase ? { phase } : {};

    try {
      const submissions = await Submission.find(query)
        .select("content phase pseudonym createdAt")
        .sort({ createdAt: -1 });

      return res.status(200).json(submissions);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch submissions" });
    }
  }

  // ─────────────────────────────
  // METHOD NOT ALLOWED
  // ─────────────────────────────
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: "Method not allowed" });
}

