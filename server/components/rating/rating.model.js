import mongoose, { Schema } from 'mongoose';
import { TYPE_LOGIN } from '../../../external/constants/constants';

/**
 * @swagger
 * definitions:
 *  Rating:
 *    type: object
 *    properties:
 *      userId:
 *        type: ObjectId
 *      productId:
 *        type: ObjectId
 *      star:
 *        type: Number
 *      content:
 *        type: String
 *      status:
 *        type: Boolean
 */
const RatingSchema = new mongoose.Schema({
  productId: { type: Schema.ObjectId, index: 1 },
  storeId: { type: Schema.ObjectId, index: 1 },
  userId: { type: Schema.ObjectId, index: 1 },
  type: { type: Number, required: true },
  star: { type: Number },
  content: { type: String },
  status: { type: Boolean },
}, {
  timestamps: true
});

export default mongoose.model('Rating', RatingSchema);
