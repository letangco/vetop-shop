import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const categoryStoreSchema = new Schema({
    storeId: { type: Schema.ObjectId, required: true, index: 1 },
    categoryId: { type: Schema.ObjectId, required: true },
    isParent: { type: Boolean }
});

export default mongoose.model('categoryStore', categoryStoreSchema);
