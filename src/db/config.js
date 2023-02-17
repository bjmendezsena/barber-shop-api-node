const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const dbConnection = async () => {
    try {
        mongoose.connect(
        `mongodb://localhost:27017/barber-shop`,
        (err, res) => {
            if (err) throw err;
            console.log("DB Online");
        }
        );
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la BD ver logs");
    }
};




module.exports = {
    dbConnection,
}