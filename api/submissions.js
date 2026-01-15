import { connectDB } from "../lib/db";
import Submission from "../models/Submission";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const submission = await Submission.create({
      content: req.body.content,
      phase: "Input"
    });
    return res.status(201).json(submission);
  }

  if (req.method === "GET") {
    const submissions = await Submission.find();
    return res.status(200).json(submissions);
  }
}
