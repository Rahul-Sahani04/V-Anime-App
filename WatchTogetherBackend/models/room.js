import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  roomId: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // Add other fields as necessary
});

const Room = mongoose.model("Room", RoomSchema);


export default Room;