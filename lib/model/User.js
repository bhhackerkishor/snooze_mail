import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  plan: {
    type: String,
    enum: ['free', 'pro', 'team'],
    default: 'free',
  },
  usedRemindersThisMonth: {
    type: Number,
    default: 0,
  },
  resetAt: {
    type: Date,
    default: () => new Date(new Date().getFullYear(), new Date().getMonth(), 1), // start of current month
  },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
