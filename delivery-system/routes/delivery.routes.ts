import { Router } from 'express';
import { EmailDelivery } from '../delivery/EmailDelivery';
import { FaxDelivery } from '../delivery/FaxDelivery';
import { TelegramDelivery } from '../delivery/TelegramDelivery';
import { DeliveryService } from '../services/DeliveryService';

const router = Router();

router.post('/email', (req, res) => {
  const service = new DeliveryService(new EmailDelivery());
  res.json({ status: service.deliver(req.body.content) ? 'sent' : 'fail' });
});

router.post('/fax', (req, res) => {
  const service = new DeliveryService(new FaxDelivery());
  res.json({ status: service.deliver(req.body.content) ? 'sent' : 'fail' });
});

router.post('/telegram', (req, res) => {
  const service = new DeliveryService(new TelegramDelivery());
  res.json({ status: service.deliver(req.body.content) ? 'sent' : 'fail' });
});

export default router;
