const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
//Router
const GoalsRouter = require("./routes/goals");
const UserRouter = require("./routes/user");
const AuthMiddleware = require("./middleware/authMiddleware");

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

//Goals api
app.use("/goals", AuthMiddleware, GoalsRouter);

//user api
app.use("/api", UserRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, (req, res) => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`error that occur is ${error}`);
  });
