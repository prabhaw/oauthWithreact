const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  googleId: String,
});

mongoose.model("users", userSchema);
