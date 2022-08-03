import mongoose from 'mongoose';
import slug from 'slug';
import { DEFAULT_AVATAR_STORE } from '../../../external/constants/constants';

const Schema = mongoose.Schema;

const paymentListOrderSchema = new Schema({
    name: { type: String, required: true },
    image: {
        name: { type: String, default: DEFAULT_AVATAR_STORE.name },
        small: { type: String, default: DEFAULT_AVATAR_STORE.small },
        medium: { type: String, default: DEFAULT_AVATAR_STORE.medium },
        large: { type: String, default: DEFAULT_AVATAR_STORE.large }
    },
    type: { type: String, required: true },
    description: { type: String },
    searchString: { type: String },
    status: { type: Boolean, default: true }
}, {
    timestamps: true
});

paymentListOrderSchema.pre('save', function (next) {
    this.searchString = slug(`${this.name}`, ' ');
    return next();
  });

export default mongoose.model('TypePaymentOrder', paymentListOrderSchema);
