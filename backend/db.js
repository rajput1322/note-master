// const mongoose = require('mongoose');

// const connection = mongoose.createConnection('mongodb://localhost:27017')
//     .on("open",() => {console.log("MongoDb Connected")})
//     .on("error", () =>{console.log("MongoDb connection error")});

// module.exports = connection;


// 2.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mynotebook',)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });

// 3.
// db.js
// const mongoose = require('mongoose');

// async function connectToDatabase() {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/mynotebook', { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// }

// module.exports = connectToDatabase;

