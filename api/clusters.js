import mongoose from 'mongoose';
import Cluster from '../models/Cluster.js';
mongoose.connect(process.env.MONGO_URI);
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const clusters = await Cluster.find();
    return res.status(200).json(clusters);
  }
  res.status(405).json({ error: 'Method Not Allowed' });
}
