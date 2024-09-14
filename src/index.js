import express from "express"
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
import userRouter from "./routers/user.routes.js"
import taskRouter from "./routers/task.routes.js"

dotenv.config({
    path: './.env'
})

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Sever is running on ${PORT}`);
    })
}).catch((err) => {
    console.log("Error while connecting to database", err);    
})
