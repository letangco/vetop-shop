import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingProductSchema = new Schema({
    value: { type: Number, unique: true }
});

export default mongoose.model('settingProduct', settingProductSchema, 'settingProduct');
