import mongoose from 'mongoose';
import { TYPE_ORDER } from '../../constants';

const Schema = mongoose.Schema;

const simOrderSchema = new Schema({
    owner: { type: Object, required: true },
    buyer: { type: String, requried: true },
    simList: [
        { type: Object }
    ],
    totalVetic: { type: Number, required: true },
    totalPrice: { type: Number },
    status: { type: Number, default: 1 },
    invoice: { type: String, request: true, unique: true },
    description: { type: String },
    type: { type: Number, default: TYPE_ORDER.OFFLINE },
    note: { type: String },
    ref_buy: {
        id: { type: Schema.ObjectId },
        fullName: { type: String },
        code: { type: String }
    },
    ref_sell: {
        id: { type: Schema.ObjectId },
        fullName: { type: String },
        code: { type: String }
    },
    qrCode: { type: String }
}, {
    timestamps: true
});

export default mongoose.model('simOrder', simOrderSchema);
