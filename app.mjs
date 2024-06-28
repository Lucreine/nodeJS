import express from 'express';
import productRouter from './routers/productsRouter.js';
// import Product from './models/productsModels.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const app = express();
const PORT = 3000;


dotenv.config();

app.use(bodyParser.json());

app.use("/", productRouter);



app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });