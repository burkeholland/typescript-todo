// create a simple express server
import express, { Express, Application } from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';

// load environment variables if in development mode
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// application routes
import indexRouter from './routes/index';

const app: Express = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
