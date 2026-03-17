
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import Redis from "ioredis";
import routes from "./routes/index.js";
import Response from "./class/response.js";
import cloudinaryConfig from "./Upload Cloudinary/cloudinaryConfig.js";

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CLIENT_URL,
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS !!"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  credentials: true,
};


// ========================================================
// ================== cloudinary config ===================
// ========================================================
cloudinaryConfig();


// ========================================================
// ===================== Initializing =====================
// ========================================================
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.set("port", process.env.PORT || 3000);


// ========================================================
// =================== Redis Connection ===================
// ========================================================
const redisUrl = process.env.NODE_ENV === "production"
  ? process.env.REDIS_URL
  : process.env.REDIS_LOCAL_URL;

export const redis = new Redis(redisUrl, {
  tls: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined
})
redis.on("connect", () => console.log("🔗 Connected to Redis"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));



// ========================================================
// ====================== Try Connect =====================
// ======================================================== 
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(() =>
    console.log("---- Connected to MongoDB ----")
  )
  .catch((err) =>
    console.log("---- Error Connected MongoDB ----", err)
  );


// ========================================================
// ===================== If connected =====================
// ========================================================
const db = mongoose.connection;

db.on("connected", () => {
  console.log("---- Mongoose connected to DB ----");
});

db.on("error", (err) => {
  console.log("---- Mongoose connection error ----", err);
});

db.on("disconnected", () => {
  console.log("---- Mongoose disconnected from DB ----");
});


// ========================================================
// ===================== Route Access =====================
// ========================================================
app.get("/", (req, res) => {
  const response = new Response(res);
  return response.success({}, 'Api is running successfully by Touseef Abid 😁');
});

app.use("/api", routes);

app.all("*", (req, res) => {
  const response = new Response(res);
  return response.error({}, 'Trying route undefined ⚠️');
});


// ========================================================
// ==================== Listening Port ====================
// ========================================================
app.listen(app.get("port"), () => {
  console.log(`---- Server is running on port ${app.get("port")} ----`);
})

export default app
