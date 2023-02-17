const jwt = require("jsonwebtoken");

const generateJWT = (id, expiresIn = "12h", key = process.env.JWT_KEY) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    //JWT_KEY

    jwt.sign(
      payload,
      key,
      {
        expiresIn,
      },
      (err, token) => {
        if (err) {
          // Token could not be created
          reject('Could not generate the JWT');
        } else {
          // TOKEN!
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
