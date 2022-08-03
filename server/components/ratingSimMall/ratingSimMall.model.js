import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ratingSimSchema = new Schema({
    user: { type: String, required: true, index: 1 },
    simOwner: { type: String, required: true, index: 1 },
    comment: { type: String },
    rating: {
        type: Number, min: 1, max: 5, required: true
    },
    typeOwner: { type: String, required: true }
}, {
    timestamps: true
});

export default mongoose.model('ratingSim', ratingSimSchema);
