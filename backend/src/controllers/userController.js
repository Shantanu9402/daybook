import User from "../models/userModel.js"; // 👈 Add .js extension

export const viewProfile = (req, res) => { // 👈 Add "export"
  const { email, firstName, lastName } = req.user;
  res.status(200).json({
    message: "Profile fetch successfully!",
    data: { email, firstName, lastName },
  });
};

export const updateProfile = async (req, res) => { // 👈 Add "export"
  const loggedUser = req.user;
  const { firstName, lastName } = req.body;

  if (!firstName) {
    return res.status(422).json({
      message: "First name is required!",
    });
  }

  if (firstName.length > 50 || (lastName && lastName.length > 50)) { // Added a check for lastName existence
    return res.status(422).json({
      message: "First Name and Last Name length should be less than 50!",
    });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      loggedUser._id,
      {
        firstName,
        lastName,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully!",
      data: { firstName: updateUser.firstName, lastName: updateUser.lastName },
    });
  } catch (error) {
    console.error("Error updating profile!: ", error);
    res.status(500).json({
      message: "Something went wrong! Please try again later!",
    });
  }
};

// ❌ REMOVE THIS LINE:
// module.exports = { viewProfile, updateProfile };