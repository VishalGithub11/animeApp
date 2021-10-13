const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB not connected");
  });

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//my routes
const userRoute = require("./routes/user");

//routes
app.use("/api", userRoute);


//port setup
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
