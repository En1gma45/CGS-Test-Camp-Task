import bodyParser from "body-parser";
import express from "express";
import connectDB from "../config/database";
//import auth from "./routes/api/auth";
import user from "./routes/api/user";
import profile from "./routes/api/profile";
import task from "./routes/api/task";
import morgan from 'morgan'


const app = express();
//const cors = require('cors')


// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))
//app.use(cors())

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/user", user);
app.use("/api/profile", profile);
app.use('/api/task', task)

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
