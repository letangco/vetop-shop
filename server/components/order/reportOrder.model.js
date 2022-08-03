import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reportOrderSchema = new Schema({
    value: { type: Number }
});

export default mongoose.model('reportOrder', reportOrderSchema);
