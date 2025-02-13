const mongoose = require("mongoose");
const empLoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const empLoginModel = mongoose.model("empLogin", empLoginSchema);
module.exports = empLoginModel;
