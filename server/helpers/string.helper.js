import mongoose from 'mongoose';
import slug from 'slug';

export function generateRandom6Digits() {
  return Math.floor(100000 + Math.random() * 100000);
}

export function getObjectId(objectId) {
  try {
    if (typeof objectId === 'string') {
      return mongoose.Types.ObjectId(objectId);
    }
    return objectId;
  } catch (error) {
    throw error;
  }
}

export function slugString(text, replacement) {
  return slug(text, replacement || ' ');
}

export function buildSearchString(text) {
  try {
    return slug(`${text}`, ' ');
  } catch (error) {
    return error;
  }
}
