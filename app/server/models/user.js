const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    matricNumber: { type: String, required: true },
    program: String,
    graduationYear: String,
  },
  { timestamps: true }
);

UserSchema.methods.setPassword = function (password) {
  if (password.length >= 7) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.password = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
  } else {
    throw "Password should have at least 7 characters";
  }
};

UserSchema.methods.validPassword = function (result, password) {
  return (
    result.password ===
    crypto.pbkdf2Sync(password, result.salt, 1000, 64, "sha512").toString("hex")
  );
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
