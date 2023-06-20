const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;
const mongoConnect =
  "mongodb+srv://auth_role:p2ryRUPyzx8vCXhZ@authrole.rvbrank.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
  try {
    await mongoose.connect(mongoConnect);
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
