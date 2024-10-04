import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/Error";
import productRoutes from "./routes";
dotenv.config();

const app = express();

app.use(express.json());

app.use("", productRoutes);

app.use(errorMiddleware);
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
