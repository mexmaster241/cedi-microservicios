import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar rutas
import stpRoutes from './api/routes/stp.js';

// Usar rutas
app.use('/api/stp', stpRoutes);

// Add this test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
