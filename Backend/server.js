import express from 'express';
import Mongoose from "./services/mongoose.js";
import config from "./config/config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { invalidRoute } from './Routes/invalidRoute.js';
import { errorHandler } from './Middleware/errorHandler.js';
import userRouter from './Routes/userRoute.js'
import projectRouter from './Routes/projectRoute.js'


Mongoose.connect();

const app = express();

// Middleware stack
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/user", userRouter);
app.use('/project', projectRouter)

app.use("*", invalidRoute);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`The server 🙈 is listening on port ${config.port}`)
});