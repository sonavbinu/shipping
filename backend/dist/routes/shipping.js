var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import shipment from '../models/shipment.js';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();
/**
 * @swagger
 * /shipping/rate:
 *   post:
 *     summary: Calculate shipping rate
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *               - weight
 *             properties:
 *               origin:
 *                 type: string
 *                 example: New York
 *               destination:
 *                 type: string
 *                 example: Los Angeles
 *               weight:
 *                 type: number
 *                 example: 5
 *     responses:
 *       200:
 *         description: Estimated shipping charge
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estimatedCharge:
 *                   type: number
 *                   example: 160
 *       400:
 *         description: Missing required fields
 */
router.post('/rate', (req, res) => {
    const { origin, destination, weight } = req.body;
    if (!origin || !destination || !weight) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const base = 50;
    const distanceRate = origin === destination ? 20 : 60;
    const weightRate = weight * 10;
    const total = base + distanceRate + weightRate;
    res.json({ estimatedCharge: total });
});
/**
 * @swagger
 * /shipping/create:
 *   post:
 *     summary: Create a new shipment
 *     tags: [Shipping]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - receiver
 *               - origin
 *               - destination
 *               - weight
 *             properties:
 *               sender:
 *                 type: string
 *                 example: John Doe
 *               receiver:
 *                 type: string
 *                 example: Jane Smith
 *               origin:
 *                 type: string
 *                 example: New York
 *               destination:
 *                 type: string
 *                 example: Los Angeles
 *               weight:
 *                 type: number
 *                 example: 5
 *     responses:
 *       201:
 *         description: Shipment created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sender, receiver, origin, destination, weight } = req.body;
        if (!sender || !receiver || !origin || !destination || !weight)
            return res.status(400).json({ message: 'All fields are required' });
        const trackingId = 'TRK-' + uuidv4().slice(0, 8);
        const charge = 50 + (origin === destination ? 20 : 60) + weight * 10;
        const newShipment = new shipment({
            trackingId,
            sender,
            receiver,
            origin,
            destination,
            weight,
            charge,
        });
        const saved = yield newShipment.save();
        res.status(201).json(saved);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
/**
 * @swagger
 * /shipping/track/{trackingId}:
 *   get:
 *     summary: Track a shipment by tracking ID
 *     tags: [Shipping]
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shipment tracking ID
 *         example: TRK-a1b2c3d4
 *     responses:
 *       200:
 *         description: Shipment details
 *       404:
 *         description: Shipment not found
 *       500:
 *         description: Server error
 */
router.get('/track/:trackingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Shipment = yield shipment.findOne({
            trackingId: req.params.trackingId,
        });
        if (!Shipment) {
            return res.status(404).json({ message: 'Shipment not found' });
        }
        res.json({
            trackingId: Shipment === null || Shipment === void 0 ? void 0 : Shipment.trackingId,
            status: Shipment === null || Shipment === void 0 ? void 0 : Shipment.status,
            sender: Shipment === null || Shipment === void 0 ? void 0 : Shipment.sender,
            receiver: Shipment === null || Shipment === void 0 ? void 0 : Shipment.receiver,
            origin: Shipment === null || Shipment === void 0 ? void 0 : Shipment.origin,
            destination: Shipment === null || Shipment === void 0 ? void 0 : Shipment.destination,
            charge: Shipment === null || Shipment === void 0 ? void 0 : Shipment.charge,
            createdAt: Shipment === null || Shipment === void 0 ? void 0 : Shipment.createdAt,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
export default router;
