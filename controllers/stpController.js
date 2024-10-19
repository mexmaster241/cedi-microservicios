import axios from 'axios';
import https from 'https';
import CryptoHandler from '../utils/cryptoHandler.js';

export const registraOrden = async (req, res) => {
  console.log('registraOrden function called');
  console.log('Request body:', req.body);
  
  // Add this line
  return res.status(200).json({ message: 'registraOrden function reached' });

  try {
    const ordenPagoWs = req.body;
    
    // Crear instancia de CryptoHandler y generar firma
    const crypto = new CryptoHandler(ordenPagoWs);
    ordenPagoWs.firma = crypto.getSign();

    // Hacer la petición a STP
    const response = await axios.put(
      process.env.STP_API_URL,
      ordenPagoWs,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error en registraOrden:', error);
    res.status(500).json({ error: 'Error al registrar la orden' });
  }
};
