const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/predict", (req, res) => {
    const userInput = req.body;

    const pythonProcess = spawn("python", ["predict.py", JSON.stringify(userInput)]);

    pythonProcess.stdout.on("data", (data) => {
        const output = JSON.parse(data.toString());
        res.json(output);
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });
});

app.listen(8080, () => console.log("Server running on port 8080"));
