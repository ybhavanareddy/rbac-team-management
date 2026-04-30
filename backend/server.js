import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from './routes/userRoutes.js';
import permissionRoutes from './routes/permissionRoutes.js';
import roleRoutes from './routes/roleRoutes.js';


import connectDB from './config/db.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors())

//Routes
app.use('/api/users',userRoutes);
app.use('/api/permissions',permissionRoutes);
app.use('/api/roles',roleRoutes);




//test route
app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Server is running"
    })
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server running at ${port} port`)
})