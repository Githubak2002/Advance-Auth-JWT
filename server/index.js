import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors"
import colors from 'colors';

import { UserRoute } from "./routes/user.js";

// import path from 'path';

dotenv.config();

// const __dirname = path.resolve();
const app = express();

/* === middlewares === */
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());


/* === static folder === */
/** 
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res) => {
  res.sendFile(path.join(__dirname,"client", "dist", "index.html"));
})
*/


app.use('/api/v1/users',UserRoute);

const port = process.env.PORT || 3000;
const baseURL = process.env.BASE_URL;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to DB`.bgMagenta.white);
    app.listen(port, () => {
      console.log(`Server started at ${baseURL}`.bgCyan.white);
    });
  } catch (err) {
    console.log("Error in connection of DB", err);
  }
};

// ========= HOME route =========
app.get(('/'), (req,res) => {
  res.send("Backend Server");
})

startServer();


/**   mongoose.connect(process.env.MONGODB_URL)
  .then( () => {
    console.log(`Connected to DB`);
    app.listen(port,() => {
    console.log(`Server started at ${baseURL}`); })
  })
  .catch( (err) => {
    console.log("Error in connection of DB", err);
})
*/