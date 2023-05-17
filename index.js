import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config.js";
import UserRouter from "./Routes/userRoute.js";
import bodyParser from "body-parser";
import JobRouter from "./Routes/jobRoute.js";
import cors from "cors";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running ...");
});

app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/uploads", express.static("./uploads"));

app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}  `
    )
);
