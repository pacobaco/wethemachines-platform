import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  content: String,
  phase: String,
  pseudonym: String

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
