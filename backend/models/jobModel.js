import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true }  // e.g. "12 LPA"
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
