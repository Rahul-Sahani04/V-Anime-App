// Handle adding a video to the database in the add-video.js file:

// Path: controllers/add-video.js
import User from "../models/user.js";

export const addVideoToWatchlist = async (req, res) => {
  try {
    // Find the user by id
    const user = await User.findById({ _id: req.user });

    // Check if the video id is already in the user profile
    if (user.videos.includes(req.body.animeId)) {
      return res
        .status(400)
        .json({ message: "Video already in user profile." });
    }

    // Add the video id to the user profile
    user.videos.push(req.body.animeId);

    // Save the user profile
    await user.save();
    res.status(200).json({ message: "Video added to user profile." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
