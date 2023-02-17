const { Schema, model } = require("mongoose");
const UserConstants = require("../constants/userConstants");

const ROLES_OPTIONS = Object.values(UserConstants.ROLES);
const STATUS_OPTIONS = Object.values(UserConstants.STATUS);

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    uppercase: true,
    enum: ROLES_OPTIONS,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    uppercase: true,
    enum: STATUS_OPTIONS,
  },
});

UserSchema.method("toJSON", function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
});

module.exports = model("User", UserSchema);
