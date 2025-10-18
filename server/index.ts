import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import artistRoutes from './routes/artists';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/artists', artistRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
