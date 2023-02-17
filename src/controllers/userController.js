const { request, response } = require("express");

const User = require("../models/User");
const { encrypt } = require("../helpers/cripto");
const { ROLES } = require("../constants/userConstants");

const createNewUser = async (req = request, res = response) => {
  const { password, ...rest } = req.body;

  const role = rest.role;




  try {
    if (role === ROLES.SUPER_ADMIN ) {
      if (!req.role) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }

      if (req.role !== ROLES.SUPER_ADMIN) {
        return res.status(401).json({
          message: "Not authorized",
        });
      }
    }
    const userJson = {
      ...rest,
      password: encrypt(password),
    };

    const user = new User(userJson);

    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error creating user", error });
  }
};

const getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error getting users", error });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error getting user", error });
  }
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
};
