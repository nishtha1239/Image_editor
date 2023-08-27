const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const Image = require("./models/Image");
const axios = require("axios");
const fs = require("fs").promises;
const fs1 = require("fs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const imagePath = req.file.path;
  const azureApiKey = process.env.API_KEY;
  const azureEndpoint = process.env.END_POINT;
  const url = `${azureEndpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags`;
  const headers = {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": azureApiKey,
  };

  try {
    const imageFile = await fs.readFile(imagePath);

    const response = await axios.post(url, imageFile, { headers });
    const tagsResult = response.data.tagsResult.values;
    const filteredTags = tagsResult.filter((tag) => tag.confidence >= 0.9);
    const extractedTags = filteredTags.map((tag) => tag.name);
    const result = await Image.create({
      image: req.file.filename,
      tags: extractedTags,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/images/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    const imageToDelete = await Image.findById(imageId);

    if (!imageToDelete) {
      return res.status(404).json({ message: "Image not found" });
    }
    fs1.unlink("public/images/" + imageToDelete.image, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    await imageToDelete.deleteOne();
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/recent", async (req, res) => {
  try {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    const recentImages = await Image.find({
      createdAt: { $gte: fiveDaysAgo },
    }).sort({ createdAt: -1 });

    res.json(recentImages);
  } catch (error) {
    console.error("Error fetching recent images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.send("okay");
});

app.listen(4000);
