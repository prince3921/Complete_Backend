import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middlewere-(check karta hai ki user login hai ya nahi) app banane ke baad use karte hai 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))
//json se data aye tho
app.use(express.json({ limit: "16kb" }));
//url se data aye tho
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//static file
app.use(express.static("public"))
app.use(cookieParser())


export { app }