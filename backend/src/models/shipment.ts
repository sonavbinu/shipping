import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    weight: { type: String, required: true },
    charge: { type: Number },
    status: {
      type: String,
      enum: ['Booked', 'In Transit', 'Delivered'],
      default: 'Booked',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Shipment', shipmentSchema);
