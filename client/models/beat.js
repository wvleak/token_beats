import { Schema, model, models } from "mongoose";

const BeatSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: [true, "title is required!"],
  },
  tags: {
    type: [String],
    default: [],
  },
});

const Beat = models.Beat || model("Beat", BeatSchema);

export default Beat;
