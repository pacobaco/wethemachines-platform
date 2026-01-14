import mongoose from 'mongoose';
const clusterSchema = new mongoose.Schema({
  clusterName: String,
  submissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Cluster || mongoose.model('Cluster', clusterSchema);
