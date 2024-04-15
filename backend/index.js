import express, { response } from 'express';
import { PORT, MONGODB_URI } from './config.js';
import mongoose from 'mongoose';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for json pharse
app.use(express.json());

// method 1 for cors
// app.use(cors());

// method 2 for cors
app.use(cors(
    {
        origin: "https://book-collection-api.vercel.app/",
        methods: ["GET, POST, PUT, DELETE"],
        credentials: true
    }
))

app.get('/', (req, res) => {
    // console.log(req);
    return res.status(200).send('Hello World');
})

app.use("/api/book", bookRoute);  

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }).catch((error) => {
        console.log("Error: ", error);
    })
