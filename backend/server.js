import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import config from "./config/index.js";
import corsOptions from "./config/corsOptions.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello There");
});
app.use("/api/users", userRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/user/account/address", addressRoutes);

const __dirname = path.resolve();
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "backend", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({
      message: "404 not Found",
    });
  } else {
    res.type("txt").send("404 not found");
  }
});
app.use(ErrorHandler);
app.listen(config.PORT, () => {
  console.log("Server is running on PORT", config.PORT);
});
