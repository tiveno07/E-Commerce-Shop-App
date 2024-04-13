const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose.connect(process.env.MONGODB_URI).then((data) => {
    console.log(`mongod connected with server: ${data.connection.host}`);
  });
};

module.exports = connectDataBase;
