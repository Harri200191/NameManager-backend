// if we write npm start, it runs the index.js file
// if we write npm run backend it starts nodemon index.js
// npm run frontend is used to start the react app
// npm run both to run front and back end
const express = require("express");
const connectDB = require("./config/connectDB");
const task_model = require("./model/task_model");
const taskroute = require("./routes/taskroute");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://name-system.onrender.com"]
}));

app.use(express.urlencoded({extended: false}));
app.use("/api/tasks", taskroute);


app.get("/", (req, resp) => {
    resp.send("Home Page");
});

// To make sure that our database connects before our server does
const startserver = async () => {
    try{
        await connectDB();
        app.listen(PORT, () => {
            console.log("Server running on port: ", PORT);
        });
    }
    catch (error){
        console.warn(error)
    };
};

// Run the server
startserver();