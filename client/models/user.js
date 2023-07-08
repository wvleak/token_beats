import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: [true, "address is required!"],
  },
  username: {
    type: String,
    unique: true,
    match: [
      /^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
