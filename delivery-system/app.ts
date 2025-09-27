import express from 'express';
import deliveryRoutes from './routes/delivery.routes';

const app = express();
app.use(express.json());
app.use('/send', deliveryRoutes);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Delivery API running on port ${PORT}`));
}

export default app;
