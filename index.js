import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './config/db/index.js';
import route from './routers/index.js';

const app = express();
const PORT = process.env.port || 3001;

db.connect();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));
app.use(cors());

route(app);

app.listen(PORT, () => {
	console.log(`Server running on localhost:${PORT}`);
});
