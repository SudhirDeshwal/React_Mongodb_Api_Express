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
    process.on('exit', function (code) {
      console.log(`About to exit with code ${code}`);
    });
  }
};

module.exports = connectDB;
