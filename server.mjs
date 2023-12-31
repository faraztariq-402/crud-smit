import express from "express";
import path from 'path'
import cors from "cors";
import 'dotenv/config';
const __dirname = path.resolve()

import postRouter from "./routes/post.mjs";
import authRouter from "./routes/signup.mjs";
const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/v1', authRouter)
app.use('/api/v1', postRouter)
app.use(express.static(path.join(__dirname, 'public')))
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`example server listening on PORT ${PORT}`)
})
