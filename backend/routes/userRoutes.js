const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const _ = require("lodash");

const {
  sendDfaVerificationEmail,
  sendWelcomeEmail,
} = require("../utils/email");
const { authUser } = require("../middleware/auth");
const {
  userLoginInputValidate,
  userRegisterInputValidate,
} = require("../utils/schemaValidate");

const router = express.Router();

const User = require("../models/userModel");
const OtpToken = require("../models/otpTokenModel");

const userSchemaDebugger = require("debug")("app:userSchems");

//Register route
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  userSchemaDebugger(req.body);

  //Server side validation of inputs provided
  const { error } = userRegisterInputValidate(req.body);
  userSchemaDebugger(error);
  if (error) return res.status(400).json(error.details[0].message);

  //Check if user is already exists in DB
  try {
    let user;
    user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      //Send the email for verification and check it's validation while logging in
      let token = "";
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Something went wrong");
        }
        token = buffer.toString("hex");
        user.verificationToken = token;
        user.verificationTokenExpiration = Date(Date.now + 3600000);
        await user.save();

        //Send Email for verification
        await sendWelcomeEmail(
          email,
          username,
          token,
          "Thanks for joining in!"
        );

        res.send("User Registered Successfully!");
      });
    } else {
      res
        .status(400)
        .send("User already exists with this email. Try logging in");
    }
  } catch (error) {
    console.log(error);
  }
});
0;
router.post("/login", authUser, async (req, res) => {
  const { email, password } = req.body;

  //Sanitize and validate user inputs
  const { error } = userLoginInputValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user exists with email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send("User doesn't exist with this email!");
  }

  if (!(await user.validatePassword(password)))
    return res.status(400).json({ message: "User or password invalid" });

  //Adding loggedIn user in session object
  req.session.user = user;

  //Generation of OTP for DFA authentication
  const otpToken = Math.floor(1000000 + Math.random() * 9000000);

  const hashedOtpToken = await bcrypt.hash(otpToken.toString(), 10);

  const dfaToken = new OtpToken({
    userId: user._id,
    otpToken: hashedOtpToken,
    otpTokenExpiration: new Date().getTime() + 3600000,
  });

  const tokenSavedDoc = await dfaToken.save();

  // send OTP in mail and generate OTP
  await sendDfaVerificationEmail(email, otpToken);

  res.status(200).json({
    message: "Email sent for DFA",
    user: _.pick(user, ["_id", "username", "email"]),
    otpTokenId: tokenSavedDoc._id,
  });
});

router.post("/login/validate_2fa", authUser, async (req, res) => {
  const { userId, otpTokenId, dfaValue } = req.body;

  //Set up DFA authentication
  const user = await User.findById(userId);

  if (!user) {
    return res.status(401).send("Please login again, unauthorized user.");
  }

  if (dfaValue == null || !dfaValue || dfaValue == NaN) {
    return res.status(400).send("Please entered Otp sent on Email!");
  }

  const storedOtpToken = await OtpToken.findOne({
    _id: otpTokenId,
    userId,
    otpTokenExpiration: { $gt: Date.now() },
  });

  if (
    !storedOtpToken ||
    !(await OtpToken.validateOtpToken(dfaValue, storedOtpToken.otpToken))
  ) {
    return res.status(400).json({ message: "Invalid Otp!" });
  }

  return res.status(200).send({ message: "DFA verified!" });
});

//Edit Profile Route
router.post("/edit-profile", authUser, async (req, res) => {
  const { username, userId } = req.body;

  const user = await User.findOne({ userId });

  if (!user) {
    return res.status(401).send("Please login again, unauthorized user.");
  }

  let updatedUser = await User.findByIdAndUpdate(
    userId,
    { username },
    { new: true }
  );

  updatedUser = _.pick(user, ["_id", "username", "email"]);
  updatedUser.username = username;

  console.log(updatedUser);

  res.json({
    message: "User Profile updated.",
    updatedProfile: updatedUser,
  });
});

module.exports = router;
