import grpc from 'grpc';
import {
  example, getCategoryByStoreIdHandle, getCategoriesHandle, getCategoriesInfo,
  getCommentRatingByIdStore, getProductsToStore, getRating, countTotalProduct,
  getCategoriesInArray, getProductByStoreCategoriesByAdmin, getCategoriesStoreByAdmin,
  getTotalOrderHandle, updateSettingTransactionHandle, getTimeFireWorkHandle,
  updateTimeFireWorkHandle, getSimInfoHandle, createSimAccountHandle, getSalesHandle,
  createCategoriesStore, updateStatusTypeOrderById, getProductInfo, getOrderInfo
} from './handle';
import logger from '../server/api/logger';
import { GRPC_HOST } from '../server/config';

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};
const protoLoader = require('@grpc/proto-loader');

const host = GRPC_HOST.split(':');
const packageDefinition = protoLoader.loadSync('./external/grpc/proto/store.proto', options);
const notesProto = grpc.loadPackageDefinition(packageDefinition);

export const server = new grpc.Server();
server.addService(notesProto.store.Store.service, {
  Example: async (call, callback) => {
    const data = await example(call);
    callback(null, data);
  },
  getCategoryByStoreId: async (call, callback) => {
    const data = await getCategoryByStoreIdHandle(call);
    callback(null, data);
  },
  getCategories: async (call, callback) => {
    const data = await getCategoriesHandle(call);
    callback(null, { item: data });
  },
  getCategoriesInfo: async (call, callback) => {
    const data = await getCategoriesInfo(call, callback);
    callback(null, data);
  },
  getCommentRatingByIdStore: async (call, callback) => {
    const data = await getCommentRatingByIdStore(call, callback);
    callback(null, { item: data });
  },
  getProductsToStore: async (call, callback) => {
    const data = await getProductsToStore(call);
    callback(null, { item: data });
  },
  getRating: async (call, callback) => {
    const data = await getRating(call);
    callback(null, data);
  },

  countTotalProduct: async (call, callback) => {
    const data = await countTotalProduct(call);
    callback(null, data);
  },
  getCategoriesInArray: async (call, callback) => {
    const data = await getCategoriesInArray(call, callback);
    callback(null, { item: data });
  },
  getProductByStoreCategoriesByAdmin: async (call, callback) => {
    const data = await getProductByStoreCategoriesByAdmin(call, callback);
    callback(null, data);
  },
  getCategoriesStoreByAdmin: async (call, callback) => {
    const data = await getCategoriesStoreByAdmin(call, callback);
    callback(null, data);
  },
  getTotalOrder: async (call, callback) => {
    const data = await getTotalOrderHandle(call);
    callback(null, data);
  },
  updateSettingTransaction: async (call, callback) => {
    const data = await updateSettingTransactionHandle(call);
    callback(null, data);
  },
  getTimeFireWork: async (call, callback) => {
    callback(null, await getTimeFireWorkHandle(call));
  },
  updateTimeFireWork: async (call, callback) => {
    callback(null, await updateTimeFireWorkHandle(call));
  },
  getSimInfo: async (call, callback) => {
    callback(null, await getSimInfoHandle(call));
  },
  createSimAccount: async (call, callback) => {
    callback(null, await createSimAccountHandle(call));
  },
  getSales: async (call, callback) => {
    callback(null, await getSalesHandle(call));
  },
  createCategoriesStore: async (call, callback) => {
    callback(null, await createCategoriesStore(call));
  },
  updateStatusTypeOrderById: async (call, callback) => {
    callback(null, await updateStatusTypeOrderById(call));
  },
  getProductInfo: async (call, callback) => {
    const data = await getProductInfo(call, callback);
    callback(null, data);
  },
  getOrderInfo: async (call, callback) => {
    const data = await getOrderInfo(call, callback);
    callback(null, data);
  }
});

server.bind(`0.0.0.0:${host[1]}`, grpc.ServerCredentials.createInsecure());

logger.info(`GRPC Shop Running: 0.0.0.0:${host[1]}`);
server.start();
