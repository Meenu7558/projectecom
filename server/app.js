import dotenv from 'dotenv';
dotenv.config();
//console.log("JWT_SECRET_KEY:",process.env.JWT_SECRET_KEY);//
import express from 'express';
import cors from 'cors';
import { connectDB } from "./config/db.js";
import { apiRouter } from './routes/index.js';
import  cookieParser from 'cookie-parser';

const app = express();
const port = 2906;
app.use(cors({
     origin:["http://localhost:5173","https://projectecom-client.vercel.app","https://projectecom-client-git-main-meenakshi-p-s-projects.vercel.app/","https://projectecom-client-82o3sze7w-meenakshi-p-s-projects.vercel.app/"],
     methods:["GET","POST","PUT","DELETE","OPTIONS"],
     credentials:true,
}))
app.use(express.json())
app.use(cookieParser())



connectDB();



app.use("/api", apiRouter);



app.get('/', (req, res) => {
  res.send('Hello World!')
  
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//http://localhost:2906/api/user/signup