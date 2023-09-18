import express from 'express';
import { router } from './router';
import cors from 'cors';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
