const mongoose = require('mongoose');
const config = require('config');


const dbconn = config.get('mongoDBConnectURI');

const connectDB = async () => {
  try {
    await mongoose.connect(dbconn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected!!!');
  } catch (err) {
    console.log('Unable to connect!!!: ' + err);
    process.exit();
  }
};

module.exports = connectDB;
