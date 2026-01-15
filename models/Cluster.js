import mongoose from "mongoose";

const ClusterSchema = new mongoose.Schema({
  label: String,
  submissions: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Cluster ||
  mongoose.model("Cluster", ClusterSchema);

