const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
const cors = require("cors");

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");

dotenv.config();
app.use(cors());
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

// MongoDb connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// whenever encounter /images, go to directory public/images
// app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION
})

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log('IN THE FILE::::', req.file);
    cb(null, req.body.name)
  }
})

// packages and their versions req.
// npm i aws-sdk@2.895.0
// npm i multer-s3@2.9.0
// npm i multer@1.4.2

// MULTER STORING IMAGE IN DISK
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json({ location: req.file.location });
  } catch (error) {
    console.error('Error while uploading file.....',error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// server connect
app.listen(process.env.PORT, () => {
    console.log("Backend server is running!");
});

