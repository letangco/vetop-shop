import mongoose, { Schema } from 'mongoose';
import { TYPE_ORDER_SIM_PRODUCT } from '../../../external/constants/constants';
import { TYPE_ORDER } from '../../constants';

/**
 * @swagger
 * definitions:
 *  Order:
 *    type: object
 *    properties:
 *      storeId:
 *        type: ObjectId
 *      userId:
 *        type: ObjectId
 *      staffId:
 *        type: ObjectId
 *      ref_buyId:
 *        type: ObjectId
 *      ref_sellId:
 *        type: ObjectId
 *      invoice:
 *        type: String
 *      description:
 *        type: String
 *      type:
 *        type: Number
 *      total:
 *        type: Number
 *      discount:
 *        type: Object
 *      vetic:
 *        type: Number
 *      note:
 *        type: String
 *      status:
 *        type: Boolean
 */
const OrderSchema = new mongoose.Schema({
  store: {
    id: { type: Schema.ObjectId },
    address: { type: String },
    name: { type: String }
  },
  userId: { type: Schema.ObjectId },
  staff: {
    id: { type: Schema.ObjectId },
    fullName: { type: String },
    code: { type: String }
  },
  // buy product
  ref_buy: {
    id: { type: Schema.ObjectId },
    fullName: { type: String },
    code: { type: String }
  },
  //
  ref_sell: {
    id: { type: Schema.ObjectId },
    fullName: { type: String },
    code: { type: String }
  },
  invoice: { type: String, request: true, unique: true },
  description: { type: String },
  type: { type: Number, default: TYPE_ORDER.OFFLINE }, // Order type: online, offline
  total: { type: Number },
  discount: { type: Number },
  vetic: { type: Number }, // vetic seller
  typeSpecial: { type: Number },
  special: { type: Number },
  note: { type: String },
  status: { type: Number }, // Status of order
  qrCode: { type: String },
  bankInfo: { type: Object },
  searchString: { type: String },
  veticBuyer: { type: Number },
}, {
  timestamps: true
});
// OrderSchema.plugin(autoIncrement.plugin, 'Order');
export default mongoose.model('Order', OrderSchema);
