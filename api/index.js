import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import serviceRoutes from "./routes/service.js";
import revenueRoutes from "./routes/revenue.js";
import orderRoutes from "./routes/order.js";
import accountRoutes from "./routes/account.js";
import staffRoutes from "./routes/staff.js";
import customerRoutes from "./routes/customer.js";
import roomRoutes from "./routes/room.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/rooms", roomRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});