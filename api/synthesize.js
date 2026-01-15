import { connectDB } from "../lib/db";
import Submission from "../models/Submission";
import Cluster from "../models/Cluster";

export default async function handler(req, res) {
  await connectDB();

  const submissions = await Submission.find();
  const clusters = {};

  submissions.forEach(s => {
    const key = s.content.split(" ")[0].toLowerCase();
    clusters[key] ||= [];
    clusters[key].push(s.content);
  });

  await Cluster.deleteMany();

  const created = await Promise.all(
    Object.entries(clusters).map(([label, subs]) =>
      Cluster.create({ label, submissions: subs })
    )
  );

  res.status(200).json(created);
}
