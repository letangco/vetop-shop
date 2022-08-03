import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const simCategorySchema = new Schema({
    name: { type: String, required: true },
    image: {
        name: { type: String },
        small: { type: String },
        medium: { type: String },
        large: { type: String }
    },
    parent: { type: Schema.ObjectId },
    status: { type: Boolean, default: false },
    searchString: { type: String, index: 1 },
    adminId: { type: Schema.ObjectId },
    index: { type: Number, default: 1 },
    type: { type: Number }
});

export default mongoose.model('simCategory', simCategorySchema);
