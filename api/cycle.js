export default async function handler(req, res) {
  // mock data for now
  const cycle = {
    phase: "Input",
    submissions: 42,
    clusters: 7,
    attestations: 3,
    attestationThreshold: 5
  };
  res.status(200).json(cycle);
}
