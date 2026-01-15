import { connectDB } from "../lib/db";
import Cluster from "../models/Cluster';
import crypto from "crypto";

export default async function handler(req, res) {
  await connectDB();
  const clusters = await Cluster.find();
  const artifacts = clusters.map(c => ({
    label: c.label,
    submissions: c.submissions,
    hash: crypto.createHash("sha256").update(c.label + JSON.stringify(c.submissions)).digest("hex")
  }));
  res.status(200).json({ artifacts });
}
