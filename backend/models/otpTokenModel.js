const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpTokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    otpToken: {
      type: String,
      required: true,
    },
    otpTokenExpiration: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

otpTokenSchema.statics.validateOtpToken = async function (
  dfaValue,
  otpHashedToken
) {
  return await bcrypt.compare(dfaValue, otpHashedToken);
};

const OtpToken = mongoose.model("OtpToken", otpTokenSchema);

module.exports = OtpToken;
