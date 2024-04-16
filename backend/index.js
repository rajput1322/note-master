const db = require('./db')
const express = require("express");

var cors = require('cors') //is used for cors to data fetch from database to api on frontend

const app = express();
const port = 5000;


app.use(cors())


app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// app.get('/', (req, res) => {
//   res.send('Hello Nikhil!')
// })

app.listen(port, () => {
  console.log(`myNoteBook backend listening on port http://localhost:${port}`);
});
