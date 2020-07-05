const express = require('express');
const taskRoute = require('./routes/api/taskRoute');
const connectDB = require('./config/connectDB');

const app = express();

app.use(express.json());

//connect to db
connectDB();

app.use('/api/users', taskRoute);

app.listen(5000, () => {
  console.log('server started');
});
