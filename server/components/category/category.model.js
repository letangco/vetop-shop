import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import { DEFAULT_IMAGE_PRODUCT } from '../../../external/constants/constants';

/**
 * @swagger
 * definitions:
 *  Category:
 *    type: object
 *    properties:
 *      adminId:
 *        type: ObjectId
 *      name:
 *        type: String
 *      description:
 *        type: String
 *      icon:
 *        type: String
 *      image:
 *        type: Object
 *      parent:
 *        type: ObjectId
 *      status:
 *        type: Boolean
 */
const CategorySchema = new mongoose.Schema({
  adminId: { type: Schema.ObjectId },
  name: { type: String, request: true },
  description: { type: String },
  image: {
    name: { type: String, default: DEFAULT_IMAGE_PRODUCT.name },
    large: { type: String, default: DEFAULT_IMAGE_PRODUCT.large },
    medium: { type: String, default: DEFAULT_IMAGE_PRODUCT.medium },
    small: { type: String, default: DEFAULT_IMAGE_PRODUCT.small }
  },
  icon: {
    name: { type: String, default: DEFAULT_IMAGE_PRODUCT.name },
    large: { type: String, default: DEFAULT_IMAGE_PRODUCT.large },
    medium: { type: String, default: DEFAULT_IMAGE_PRODUCT.medium },
    small: { type: String, default: DEFAULT_IMAGE_PRODUCT.small }
  },
  color: { type: String },
  parent: { type: Schema.ObjectId },
  status: { type: Boolean, default: true },
  searchString: { type: String, index: 1 },
  index: { type: Number, default: 1 }
}, {
  timestamps: true
});

CategorySchema.pre('save', function (next) {
  this.searchString = slug(`${this.name} ${this.description}`, ' ');
  return next();
});

CategorySchema.set('toJSON', {
  transform(doc, ret, options) { // eslint-disable-line no-unused-vars
    delete ret.__v;
    delete ret.updatedAt;
    delete ret.searchString;
  },
});

export default mongoose.model('Category', CategorySchema);
