import mongoose from "mongoose";

// Create user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: { type: String, unique: true },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: String,
  watchingList: Array,
  favourites: Array,
});

const User = mongoose.model("users", UserSchema);

export default User;
