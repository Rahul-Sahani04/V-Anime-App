import User from "../models/user.js";

// Handel user profile
export const userProfile = async (req, res) => {
  const userID = req.user;

  const user = await User.findById({ _id: userID });

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      date: user.date,
    },
  });
};

export const getUserId = async (req, res) => {
  try {
    const userToken = req.header("Authorization").split("Bearer ")[1];
    if (!userToken) return res.status(403).json(false);

    const verifyToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY);
    if (!verifyToken) return res.status(401).json(false);

    const user = await User.findById({ _id: verifyToken.id });
    if (!user) return res.status(404).json(false);

    return res.status(200).json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
