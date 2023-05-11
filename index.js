import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config.js";

dotenv.config();

await connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running ...");
});

app.listen(
    PORT,
    console.log(
        `Server runing in ${process.env.NODE_ENV} mode on port ${PORT}  `
    )
);
