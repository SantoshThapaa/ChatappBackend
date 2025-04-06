import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDb } from "./database/db.js";
import mediaRoutes from "./routes/media.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(cors());

app.use(express.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Routes
app.use("/api", mediaRoutes);
app.get('/', (req, res) => {
  res.send(" Server is working");
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb(); 
});
