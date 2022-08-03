import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingSchema = new Schema({
    type: { type: Number, required: true },
    data: { type: Object }
});

export default mongoose.model('setting', settingSchema);
