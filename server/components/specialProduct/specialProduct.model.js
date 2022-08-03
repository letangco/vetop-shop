import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SpecialProductSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId },
    index: { type: Number, default: 1 },
    searchString: { type: String, index: 1 },
}, { timestamps: true });

export default mongoose.model('SpecialProduct', SpecialProductSchema);
