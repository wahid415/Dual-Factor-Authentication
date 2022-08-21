const express = require("express");
const { authUser } = require("../middleware/auth");
const User = require("../models/userModel");

const router = express.Router();

router.get("/verify-email/:token", async (req, res) => {
  const verifyingToken = req.params.token;

  const user = await User.findOne({ verificationToken: verifyingToken });

  if (user && !user.isVerified) {
    user.isVerified = true;
    await user.save();
    return res.send(
      "Congratulations! your Email has been Verified successfully."
    );
  }

  return res.send(`
  <div>
        <h1>Hello User</h1>
        <p>Email for Account creation has been already Verified.</p>
        <p>Please close the tab</p>
    </div>
    `);
});

module.exports = router;
