import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingOrderSchema = new Schema({
    value: { type: Number, unique: true }
});

export default mongoose.model('settingOrder', settingOrderSchema, 'settingOrder');
