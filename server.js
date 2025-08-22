const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

// Upload endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const metadata = await sharp(filePath).metadata();

    // Save metadata result
    const resultPath = path.join("results", `${req.file.originalname}.json`);
    fs.writeFileSync(resultPath, JSON.stringify(metadata, null, 2));

    res.send(`
      <h2>Image Metadata</h2>
      <pre>${JSON.stringify(metadata, null, 2)}</pre>
      <a href="/">Go Back</a>
    `);
  } catch (err) {
    res.status(500).send("Error processing image: " + err.message);
  }
});

// Create required folders
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("results")) fs.mkdirSync("results");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


