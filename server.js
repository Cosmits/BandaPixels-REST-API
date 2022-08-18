import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import router from "./router.js";

dotenv.config()

const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cors())
// app.use("/api", router);

app.options('*', cors()) // include before other routes

async function startApp() {
    try {
        // console.log(DB_URL);
        await mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        app.listen(PORT, () => console.log(`Server start on PORT = ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

await startApp()
