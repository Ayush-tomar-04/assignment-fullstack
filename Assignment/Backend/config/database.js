const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log("DB Connection Failed");
        console.log(err);
        process.exit(1);
    });
};

module.exports = dbConnect;