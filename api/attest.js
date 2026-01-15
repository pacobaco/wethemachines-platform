import { connectDB } from "../lib/db";
import Cluster from "../models/Cluster";
import crypto from "crypto";

export default async function handler(req, res) {
  await connectDB();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { clusterId } = req.body;
  const attestation = crypto.createHash("sha256").update(clusterId + Date.now()).digest("hex").slice(0, 12);

  const cluster = await Cluster.findById(clusterId);
  if (!cluster) return res.status(404).json({ error: "Cluster not found" });

  cluster.attestations = cluster.attestations || [];
  cluster.attestations.push(attestation);
  await cluster.save();

  return res.status(201).json({ attestation });
}
