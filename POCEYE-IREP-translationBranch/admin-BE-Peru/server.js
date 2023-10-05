// Import express
import express from "express";
// Import cors
import cors from "cors";
// Import connection
import db from "./src/config/database.js";
// Import router
import Router from "./src/routes/routes.js";
import bodyParser from 'body-parser';

// Init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors());
app.use(bodyParser.json());

// Testing database connection .
try {
    await db.authenticate();
    console.log('Connection has been established successfully on PC.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.get("/", (req, res) => {
    res.send("work is in progress")
})

// use router
app.use(Router);

// listen on port
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`This Peru Server is running ${port}`));
// app.listen(4000, () => console.log('This Peru Server is running at http://localhost:4000'));`