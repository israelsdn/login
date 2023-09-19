import express from 'express';
import { send } from 'process';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', (req, res) => res.send('Aqui não tem nada'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
