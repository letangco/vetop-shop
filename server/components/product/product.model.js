import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import Category from '../category/category.model';
import { QUEUE_NAME } from '../../../external/constants/job_name';
import { ProductsPayload } from '../../../external/elasticsearch/product/product';
import { RabbitMQ } from '../../server';
import { sendDataToQueue } from '../../../internal/ rabbitmq/publisher/publisher';
import { buildSearchString, slugString } from '../../helpers/string.helper';
import SettingProduct from './settingProduct.model';
import { DEFAULT_IMAGE_PRODUCT } from '../../../external/constants/constants';

/**
 * @swagger
 * definitions:
 *  Product:
 *    type: object
 *    properties:
 *      storeId:
 *        type: ObjectId
 *      model:
 *        type: String
 *      name:
 *        type: String
 *      description:
 *        type: String
 *      searchString:
 *        type: String
 *      quantity:
 *        type: Number
 *      price:
 *        type: Number
 *      categories:
 *        type: Array
 *      images:
 *        type: Array
 *      vetic:
 *        type: Object
 *      stock_status:
 *        type: Number
 *      viewed:
 *        type: Number
 *      rate:
 *        type: Number
 *      status:
 *        type: Boolean
 */
const ProductSchema = new mongoose.Schema({
  model: { type: String, request: true, unique: true },
  storeId: { type: Schema.ObjectId },
  name: { type: String, request: true, index: 1 },
  description: { type: String, index: 1 },
  searchString: { type: String, index: 1 },
  quantity: { type: Number, minimum: 0 },
  price: { type: Number, minimum: 0 },
  special: { type: Number, minimum: 0 },
  categories: { type: Array },
  images: [{
    name: { type: String, default: DEFAULT_IMAGE_PRODUCT.name },
    large: { type: String, default: DEFAULT_IMAGE_PRODUCT.large },
    medium: { type: String, default: DEFAULT_IMAGE_PRODUCT.medium },
    small: { type: String, default: DEFAULT_IMAGE_PRODUCT.small },
  }],
  vetic: { type: Number },
  stock_status: { type: Number },
  viewed: { type: Number, default: 0 },
  rate: { type: Number },
  status: { type: Boolean }
}, {
  timestamps: true
});

ProductSchema.pre('save', function (next) {
  this.searchString = slug(`${this.name} ${this.model} ${this.price} ${this.special}`, ' ');
  return next();
});

ProductSchema.methods.AddProductToElasticSearch = function (categoriesName) {
  const data = {
    id: this._id.toString(),
    searchString: slug(`${this.name} ${this.model} ${this.description} ${categoriesName || ' '}`, ' '),
    name: this.name,
    price: this.price,
    storeId: this.storeId,
    quantity: this.quantity,
    special: this.special,
    model: this.model,
    description: this.description,
    categories: JSON.stringify(this.categories),
    images: JSON.stringify(this.images),
    rate: this.rate,
    stock_status: this.stock_status,
    vetic: JSON.stringify(this.vetic),
    status: this.status,
    viewed: this.viewed,
    date: new Date().toISOString()
  };
  sendDataToQueue(RabbitMQ.getChannel(), QUEUE_NAME.ELASTICSEARCH_CREATE, {
    index: ProductsPayload.index,
    data
  });
};


ProductSchema.methods.DeleteProductToElasticSearch = function () {
  const id = this._id.toString();
  sendDataToQueue(RabbitMQ.getChannel(), QUEUE_NAME.ELASTICSEARCH_REMOVE, {
    index: ProductsPayload.index,
    id
  });
};

ProductSchema.methods.UpdateProductToElasticSearch = function () {
  const data = {
    id: this._id.toString(),
    searchString: slug(`${this.name} ${this.model} ${this.description}`, ' '),
    name: this.name,
    price: this.price,
    storeId: this.storeId,
    quantity: this.quantity,
    special: this.special,
    model: this.model,
    description: this.description,
    categories: JSON.stringify(this.categories),
    images: JSON.stringify(this.images),
    rate: this.rate,
    stock_status: this.stock_status,
    vetic: JSON.stringify(this.vetic),
    status: this.status,
    viewed: this.viewed,
    date: new Date().toISOString()
  };
  sendDataToQueue(RabbitMQ.getChannel(), QUEUE_NAME.ELASTICSEARCH_UPDATE, {
    index: ProductsPayload.index,
    data
  });
};

ProductSchema.methods.metaDataProduct = async function () {
  let categories = [];
  if (this.categories.length) {
    const promises = this.categories.map(category => Category.findById(category, 'name, description, image'));
    categories = await Promise.all(promises);
  }
  return {
    model: this.model,
    name: this.name,
    description: this.description,
    quantity: this.quantity,
    price: this.price,
    special: this.special,
    images: this.images,
    categories,
    vetic: this.vetic,
    stock_status: this.stock_status,
    viewed: this.viewed,
    rate: this.rate,
  };
};

ProductSchema.methods.metaDataProductList = async function () {
  return {
    _id: this._id,
    model: this.model,
    name: this.name,
    description: this.description,
    quantity: this.quantity,
    price: this.price,
    special: this.special,
    image: this.images?.length ? this.images[0] : {},
    vetic: this.vetic,
    stock_status: this.stock_status,
    viewed: this.viewed,
    rate: this.rate,
  };
};

export default mongoose.model('Product', ProductSchema);
