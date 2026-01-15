import dbConnect from "../lib/dbConnect";
import Cluster from "../models/Cluster";

export default async function handler(req, res) {
  await dbConnect();

  try {
    const clusters = await Cluster.find({}); // fetch all clusters / sectors

    const scoredClusters = clusters.map(cluster => {
      const attScore = cluster.attestations.length / cluster.attestationThreshold;
      const contributorScore = new Set(cluster.submissions.map(s => s.userId)).size / cluster.submissions.length;

      // Placeholder for cluster agreement: could be NLP similarity metric
      const agreementScore = cluster.similarityScore || 0.8; 

      const convergenceScore = 0.5 * attScore + 0.3 * contributorScore + 0.2 * agreementScore;

      return {
        id: cluster._id,
        label: cluster.label,
        convergenceScore,
        attScore,
        contributorScore,
        agreementScore
      };
    });

    // Sort descending by convergenceScore
    scoredClusters.sort((a, b) => b.convergenceScore - a.convergenceScore);

    res.status(200).json(scoredClusters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute convergence scores" });
  }
}