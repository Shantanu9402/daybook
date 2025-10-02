import mongoose from "mongoose"; // 👈 THE NEW WAY

const entrySchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: { type: Date, required: true },
    title: String,
    mood: {
      type: String,
      enum: ["🙂", "😔", "😡"],
    },
    content: String,
  },
  { timestamps: true }
);

const entryModel = mongoose.model("Entry", entrySchema);

export default entryModel; // 👈 FIX: Export the correct model