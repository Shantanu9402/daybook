import mongoose from "mongoose"; // 👈 NEW WAY


const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

export default connectDB; // 👈 THE NEW WAY
