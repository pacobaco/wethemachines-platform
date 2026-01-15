export default async function handler(req, res) {
  // mock data
  const cycle = {
    phase: "Input",
    submissions: 42,
    clusters: [
      { _id: "1", label: "Economic Signals", submissions: ["S1","S2"] },
      { _id: "2", label: "Cultural Dynamics", submissions: ["S3"] },
      { _id: "3", label: "Infrastructure Risks", submissions: ["S4","S5","S6"] },
      { _id: "4", label: "Innovation", submissions: ["S7"] }
    ],
    attestations: 3,
    attestationThreshold: 5
  };
  res.status(200).json(cycle);
}
