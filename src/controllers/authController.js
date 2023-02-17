const { request, response } = require("express");

const User = require("../models/User");

const {generateJWT} = require('../helpers/jwt');
const {decrypt} = require('../helpers/cripto');

const login = async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).send({message: 'User not found'});
        }

        const passwordDecrypted = decrypt(user.password            );

        if(passwordDecrypted !== password){
            return res.status(400).send({message: 'Password incorrect'});
        }


        const token = await generateJWT(user.id);

        res.status(200).send({user, token});

    } catch (error) {
        console.log(error)

        res.status(500).send({message: 'Error login', error});

    }
}

module.exports = {
    login
}