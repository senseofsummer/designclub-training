import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';

const app = express();

// Enable JSON body parsing
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Enable HTTP request logging
app.use(morgan('combined'));

// Use user routes
app.use('/api', userRoutes);

// Define a test endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
