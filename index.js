import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './routers/index.js';
import { clientPG } from './database.js';

const app = express();
const PORT = 3030;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

route(app);

app.listen(PORT, () => {
  clientPG.connect((err) => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('Postgresql is connected');
    }
  });
  console.log(`Server running on localhost:${PORT}`);
});
