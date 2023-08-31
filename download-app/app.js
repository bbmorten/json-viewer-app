const dotenv = require("dotenv");
const express = require("express");
const { exec } = require("child_process");
const cors = require("cors");
const fs = require("fs");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
dotenv.config();

// Function to download the M3U file using curl
const downloadFile = (fileName) => {
  // Read the CURL_URL from .env file
  const curlUrl = process.env.CURL_URL;

  exec(`curl "${curlUrl}" -o "${fileName}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error downloading file: ${error}`);
      return;
    }
    console.log(`File downloaded: ${fileName}`);
  });
};

// Download the file when the service starts
const date = new Date().toISOString().replace(/[^0-9]/g, "");
const fileName = `iptv_all_${date}.m3u`;
console.log("Starting to download");

downloadFile(fileName);

setTimeout(() => {
  console.log("Waited for 20 seconds.");
  const options = {
    args: [fileName],
  };
  PythonShell.run("convert-to-json.py", options, (err, results) => {
    if (err) {
      console.error(`Error running Python script: ${err}`);
      return;
    }
    console.log(`Python script output: ${results}`);
  });
}, 20000); // 10 seconds

// Endpoint to send the JSON data
app.get("/getData", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(JSON.parse(data));
  });
});

const port = process.env.SRV_PORT || 4201;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
