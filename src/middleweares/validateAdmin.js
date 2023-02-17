const { request, response } = require("express");

const User = require("../models/User");
const {ROLES} = require("../constants/userConstants");

const validateSuperAdmin = async (req = request, res = response, next) => {
    // Read token

    const {id} = req;

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    if(ROLES.ADMIN !== user.role){
      return res.status(401).json({
        message: "Not authorized",
      });
    }



    next();
  };

  module.exports = {
    validateSuperAdmin
  }