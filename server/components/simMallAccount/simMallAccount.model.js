import mongoose from 'mongoose';
import { DEFAULT_AVATAR_STORE } from '../../../external/constants/constants';

const Schema = mongoose.Schema;

const simMallAccountSchema = new Schema({
    user: { type: String, required: true },
    type: { type: String },
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    status: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    avatar: {
        name: { type: String, default: DEFAULT_AVATAR_STORE.name },
        small: { type: String, default: DEFAULT_AVATAR_STORE.small },
        medium: { type: String, default: DEFAULT_AVATAR_STORE.medium },
        large: { type: String, default: DEFAULT_AVATAR_STORE.large }
    }
}, {
    timestamps: true
});

export default mongoose.model('simMallAccount', simMallAccountSchema);
