import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Wishlist:
 *    type: object
 *    properties:
 *      productId:
 *        type: ObjectId
 *      userId:
 *        type: ObjectId
 */
const WishlistSchema = new mongoose.Schema({
  productId: { type: Schema.ObjectId, ref: 'Product', required: true },
  storeId: { type: Schema.ObjectId, required: true, index: 1 },
  userId: { type: Schema.ObjectId }
}, {
  timestamps: true
});

export default mongoose.model('Wishlist', WishlistSchema);
