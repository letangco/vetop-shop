import mongoose from 'mongoose';
import { STATUS_SELL_SIM } from '../../../external/constants/constants';

const Schema = mongoose.Schema;

const simSchema = new Schema({
    owner: { type: Schema.ObjectId, required: true, index: 1 },
    typeOwner: { type: String, required: true },
    sim: { type: String, required: true, index: 1 },
    subscription: { type: Number }, // status subscription phone
    price: { type: Number, required: true },
    vetic: { type: Number },
    tax: { type: Number },
    pin: { type: Number },
    special: { type: Number },
    totalVetic: { type: Number },
    typeSim: { type: Number, required: true },
    status: { type: Number, default: STATUS_SELL_SIM.PENDING }, // pending, tradingHalt,
    network: { type: String, required: true },
    categories: [
        { type: Schema.ObjectId }
    ]
}, {
    timestamps: true
});

export default mongoose.model('simMall', simSchema);
