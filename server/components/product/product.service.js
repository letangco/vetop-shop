import { uniqBy } from 'lodash';
import slug from 'slug';
import Product from './product.model';
import Wishlist from '../wishlist/wishlist.model';
import logger from '../../api/logger';
import { error500, errorMessage } from '../../../external/util/error';
import {
  DEFAULT_IMAGE_PRODUCT,
  ERROR_CODE, SETTING_TYPE, SHARE_HOST, STATUS_PRODUCT, TYPE_LOGIN, TYPE_RATING, TYPE_SETTING
} from '../../../external/constants/constants';
import { findProductsByCondDAO, countProductByCondDAO, findOneProductByCondDAO } from './product.dao';
import { findCategoriesByCondNoLimitDAO, findOneCategoryByCondDAO } from '../category/category.dao';
import {
 addCategoryToStore, getListUserInfoByArray, getStoreInfo, getUserInfo, updateRatingStore, updateTotalProductStore
} from '../../../internal/grpc/user/request';
import { createCategoryStore, findOneCategoryStore } from '../categoryStore/categoryStore.dao';
import { getSort, GetSort, getSortBuilder } from '../../../external/middleware/query';
import { countProductBuilder, productSearchBuilder, productSearchByCategoryIdBuilder } from '../../../internal/elasticsearch/bodybuilder/bodybuilder';
import { ElasticSearchProduct } from '../../server';
import { ProductsPayload } from '../../../external/elasticsearch/product/product';
import { GetFileData } from '../../../external/util/file';
import { generateRandom6Digits, slugString } from '../../helpers/string.helper';
import SettingProduct from './settingProduct.model';
import {
 countRatingByCond, createRatingDAO, findRatingByCond, findRatingByCondUnlimit, updateTotalRating
} from '../rating/rating.dao';
import { toObjectIdFromId } from '../../helpers/help.helper';
import { sendNotification } from '../notification/notification.service';
import { NOTIFICATION_TYPE } from '../../../external/constants/job_name';
import { findOneWishListByCond } from '../wishlist/wishlist.dao';
import { getSettingDAO } from '../admin/settings/settings.dao';
import WishlistModel from '../wishlist/wishlist.model';

export async function getProductsService(options, userId) {
  try {
    const conditions = {};
    if (options.keyword) {
      conditions.$or = [
        {
          name: { $regex: options.keyword, $options: 'i' }
        },
        {
          description: { $regex: options.keyword, $options: 'i' }
        }
      ];
    }
    if (options.categoryId) {
      conditions.categories = options.categoryId;
    }
    if (options.storeId) {
      conditions.storeId = options.storeId;
    }
    if (options.status) {
      conditions.status = (options.status === 'true');
    }
    const sort = getSort(options);
    const results = await Promise.all([
      Product.countDocuments(conditions),
      Product.find(conditions).sort(sort).limit(options.limit).skip(options.skip)
    ]);
    let list = await getMetaDataProduct(results[1], userId);
    list = list.map(async (item) => {
      const store = await getStoreInfo(item.storeId);
      store.avatar = store?.avatar?.large ? GetFileData(SHARE_HOST, store.avatar) : GetFileData(SHARE_HOST, DEFAULT_IMAGE_PRODUCT);
      item.storeId = store;
      return item;
    });
    return [results[0], await Promise.all(list)];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getProductByIdService(id, userId) {
  try {
    const product = await Product.findById(id);
    if (!product) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    return await getMetaDataProduct(product, userId);
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function addProductService(auth, data) {
  try {
    const promiseAll = await Promise.all([findCategoriesByCondNoLimitDAO({}), countProductByCondDAO({ storeId: auth.storeId })]);
    const categories = promiseAll[0].map(cat => cat._id.toString());
    const erArray = [];
    const errStoreCategories = [];
    data.categories.forEach((cat, i) => {
      if (!categories.includes(data.categories[i].toString())) {
        erArray.push(data.categories[i]);
      }
    });
    if (erArray.length > 0) return errorMessage(400, ERROR_CODE.CATEGORY_NOT_FOUND);
    const promise = data.categories.map(async (d, i) => {
      const hasCate = await findOneCategoryStore({ storeId: auth.storeId, categoryId: data.categories[i] });
      if (!hasCate) {
        errStoreCategories.push(data.categories[i]);
      }
    });
    await Promise.all(promise);
    if (errStoreCategories.length) return errorMessage(400, ERROR_CODE.STORE_CATEGORIES_NOT_FOUND);
    const modelProduct = await getSettingDAO({ type: SETTING_TYPE.PRODUCT });
    const str = `${modelProduct.data.value}`;
    const pad = '00000000';
    const ans = pad.substring(0, pad.length - str.length) + str;
    let vetic = (data.price * data.special / 10);
    if (data.special > 30) {
      vetic = data.price * 3;
    }
    const arrImgs = data?.images;
    const product = new Product({
      model: ans,
      storeId: auth.storeId,
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      price: data.price,
      special: data.special,
      categories: data.categories,
      images: !arrImgs ? [DEFAULT_IMAGE_PRODUCT] : (!arrImgs.length ? [DEFAULT_IMAGE_PRODUCT] : arrImgs),
      vetic,
      stock_status: data.stock_status,
      status: STATUS_PRODUCT.PENDING,
    });
    await product.save();
    modelProduct.data = {
      value: modelProduct.data.value + 1
    };
    await Promise.all([product.save(), modelProduct.save(), updateTotalProductStore(auth.storeId, promiseAll[1])]);
    product.AddProductToElasticSearch();
    return product;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function editProduct(id, data) {
  try {
    const product = await Product.findById(id).lean();
    if (!product) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    Object.keys(data).forEach((key) => {
      product[key] = data[key];
    });
    await Product.save();
    product.UpdateProductToElasticSearch();
    return product;
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteProduct(id) {
  try {
    const product = await Product.findById(id);
    if (!product) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    product.DeleteProductToElasticSearch();
    return await product.remove();
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getListProductByCategoryIdService(id, query, userId) {
  try {
    const sort = getSort(query);
    const promise = await Promise.all([countProductByCondDAO({ categories: { $in: [id] } }), findProductsByCondDAO({ categories: { $in: [id] } }, query, sort)]);
    const result = await getMetaDataProduct(promise[1], userId);
    return [promise[0], result];
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function productFilters(options) {
  try {
    const conditions = {};
    if (options.keyword) {
      conditions.name = { $regex: options.keyword, $options: 'i' };
    }
    if (options.priceLow) {
      conditions.$and = [{ price: { $lte: Number(options.priceLow) } }];
    }
    if (options.priceHight) {
      conditions.$and = [{ price: { $gte: Number(options.priceHight) } }];
    }
    if (options.priceHight && options.priceLow) {
      conditions.$and = [{ price: { $gte: Number(options.priceHight), $lte: Number(options.priceLow) } }];
    }
    if (options.rating) {
      if (conditions.$and.length > 0) {
        conditions.$and.push({ rate: { $gte: Number(options.rating) } });
      } else conditions.$and = [{ rate: { $gte: Number(options.rating) } }];
    }
    const results = await Promise.all([
      Product.countDocuments(conditions),
      Product.find(conditions).limit(options.limit).skip(options.skip)
    ]);
    const promises = results[1].map(e => e.metaDataProductList());
    return [results[0], await Promise.all(promises)];
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function getListProductByIdStore(storeId, query, userId) {
  try {
    const sort = getSort(query);
    const cond = {
      storeId
    };
    if (query?.keyword) {
      cond.searchString = { $regex: slug(query.keyword, ' '), $options: 'i' };
    }
    if (query?.categories) {
      cond.categories = { $in: query.categories.split(',') };
    }
    const result = await Promise.all([findProductsByCondDAO(cond, query, sort), countProductByCondDAO(cond)]);
    return [result[1], await getMetaDataProduct(result[0], userId)];
  } catch (error) {
    return error500(error);
  }
}

export async function getListProductByTokenStoreId(storeId, query) {
  try {
    const sort = getSort(query);
    const cond = {
      storeId
    };
    if (query?.keyword) {
      cond.searchString = { $regex: slug(query.keyword, ' '), $options: 'i' };
    }
    if (query?.categories) {
      cond.categories = { $in: query.categories.split(',') };
    }
    const result = await Promise.all([findProductsByCondDAO(cond, query, sort), countProductByCondDAO(cond)]);
    return [result[1], await getMetaDataProduct(result[0])];
  } catch (error) {
    return error500(error);
  }
}

export async function getProductById(id, userId) {
  try {
    const product = await findOneProductByCondDAO({ _id: id });
    if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
    const data = await getMetaDataProduct(product, userId);
    const cmts = await findRatingByCondUnlimit({ productId: id });
    // info store
    const store = await getStoreInfo(product?.storeId);
    store.avatar = store?.avatar?.large ? GetFileData(SHARE_HOST, store.avatar) : GetFileData(SHARE_HOST, DEFAULT_IMAGE_PRODUCT);
    data.storeId = store;
    // -----------
    const promise = cmts.map(async (item) => {
      item = item.toObject();
      item.userId = await getUserInfo(item.userId);
      item.userId.avatar = GetFileData(SHARE_HOST, JSON.parse(item.userId.avatar));
      return item;
    });
    const listComment = await Promise.all(promise);
    data.comments = listComment;
    return data;
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteProductById(id) {
  try {
    const product = await findOneProductByCondDAO({ _id: id });
    if (!product) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    product.DeleteProductToElasticSearch();
    await WishlistModel.deleteMany({ productId: id });
    await product.remove();
    return true;
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function updateProductById(id, data) {
  try {
    const product = await findOneProductByCondDAO({ _id: id });
    if (!product) return errorMessage(404, ERROR_CODE.NOT_FOUND_ERR);
    let vetic = 0;
    if (data?.special > 30) {
      vetic = data.price * 3;
      product.vetic = vetic || product.vetic;
      product.special = data?.special || product.special;
      product.price = data?.price || product.price;
    } else {
      vetic = (data.special * data.price) / 10;
    }
    if (data?.categories) {
      const categories = (await findCategoriesByCondNoLimitDAO({})).map(cat => cat._id.toString());
      const erArray = [];
      data.categories.forEach((cat, i) => {
        if (!categories.includes(data.categories[i])) {
          erArray.push(data.categories[i]);
        }
      });
      if (erArray.length > 0) return errorMessage(400, ERROR_CODE.CATEGORY_NOT_FOUND);
      product.categories = data?.categories || product.categories;
    }
    product.name = data?.name || product.name;
    product.description = data?.description || product.description;
    product.quantity = data?.quantity || product.quantity;
    product.stock_status = data?.stock_status || product.stock_status;
    product.vetic = vetic || product.vetic;
    product.special = data?.special || product.special;
    product.price = data?.price || product.price;
    product.images = data?.images || product.images;
    await product.save();
    product.UpdateProductToElasticSearch();
    return product;
  } catch (error) {
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function addProductToWishlist(data, auth) {
  try {
    const idError = [];
    const promisesProductId = data.productId.map(async (id) => {
      const product = await Product.findById(id).lean();
      if (!product) idError.push(id);
      return idError;
    });
    await Promise.all(promisesProductId);
    if (idError.length) return errorMessage(404, `${ERROR_CODE.NOT_FOUND_ERR}[${idError}]`);
    const hasWishlist = await Wishlist.find({ userId: auth.user._id }).lean();
    if (!hasWishlist.length) {
      await Wishlist.create({
        userId: auth.user._id,
        productId: data.productId
      });
    } else {
      const arrNewProduct = [];
      const promisesAddWishlist = data.productId.map(async (id) => {
        for (let i = 0; i < hasWishlist[0].productId.length; i += 1) {
          if (id.toString() !== hasWishlist[0].productId[i].toString()) {
            console.log(hasWishlist[0].productId[i]);
            arrNewProduct.push(id);
          }
        }
        return arrNewProduct;
      });
      await Promise.all(promisesAddWishlist);
      await Wishlist.updateOne(
        { userId: auth.user._id },
        {
          $set: {
            productId: arrNewProduct
          }
        }
      );
    }
    return await Wishlist.find({ userId: auth.user._id });
  } catch (error) {
    logger.error(error);
    return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
  }
}

export async function searchProduct(query, userId) {
  try {
    if (!query?.status) {
      query.status = true;
    }
    const sort = getSortBuilder(query);
    query.keyword = slugString(query?.keyword || ' ', ' ');
    let dataBuilder;
    if (query?.categories) {
      query.categories = query.categories.split(',');
      dataBuilder = productSearchByCategoryIdBuilder(query, sort);
    } else {
      dataBuilder = productSearchBuilder(query, sort);
    }
    let data = await ElasticSearchProduct.SearchElement(ProductsPayload.index, dataBuilder);
    console.log(data.hits.hits);
    const page = data?.hits?.total?.value || 0;
    if (!data.status) {
      if (data.hits && data.hits.hits.length > 0) {
        data = data.hits.hits.map((d) => {
          d._source.images = JSON.parse(d._source.images);
          d._source.categories = JSON.parse(d._source.categories);
          d._source.vetic = d._source?.vetic || 0;
          return d._source;
        });
        return [page, await getMetaDataProduct(data, userId, true)];
      }
      return [0, []];
    }
    return [0, []];
  } catch (error) {
    return error500(error);
  }
}

export async function getMetaDataProduct(product, userId, agg) {
  const isArray = Array.isArray(product);
  if (!isArray) {
    product = [product];
  }
  product = product.map(async (p) => {
    if (!agg) {
      p = p.toObject();
    }
    if (p?.images.length) {
      p.images = p.images.map((image, i) => {
        p.images[i] = GetFileData(SHARE_HOST, p.images[i]);
        return p.images[i];
      });
    }
    const wish = await findOneWishListByCond({ productId: p._id, userId });
    p.wishStatus = !!wish;
    if (p?.categories.length) {
      p.categories = p.categories.map(async (cat, i) => {
        p.categories[i] = await findOneCategoryByCondDAO({ _id: p.categories[i] });
        return p.categories[i];
      });
      p.categories = await Promise.all(p.categories);
    }
    return p;
  });
  const result = await Promise.all(product);
  return isArray ? result : result[0];
}

export async function ratingProductAndStore(userId, body, type) {
  try {
    const user = await getUserInfo(userId);
    if (!user) return errorMessage(404, ERROR_CODE.USER_NOT_FOUND);
    switch (type) {
      case 'product':
        // eslint-disable-next-line no-case-declarations
        const product = await findOneProductByCondDAO({ _id: body.productId });
        if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
        // eslint-disable-next-line no-case-declarations
        const newRating = await createRatingDAO({
          productId: body.productId,
          userId: userId,
          content: body.content,
          type: TYPE_RATING.PRODUCT,
          star: body.star,
          status: true
        });
        // eslint-disable-next-line no-case-declarations
        const condProduct = {
          type: TYPE_RATING.PRODUCT,
          userId: toObjectIdFromId(userId),
          productId: toObjectIdFromId(body.productId)
        };
        // eslint-disable-next-line no-case-declarations
        const starRate = await updateTotalRating(condProduct, TYPE_RATING.PRODUCT);
        await Promise.all([newRating, starRate]);
        // eslint-disable-next-line radix
        product.rate = parseInt(starRate[0].totalStar / starRate[0].count);
        await product.save();
        break;
      case 'store':
        // eslint-disable-next-line no-case-declarations
        const store = await getStoreInfo(body.storeId);
        if (!store) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
        // eslint-disable-next-line no-case-declarations
        const newRatingToStore = await createRatingDAO({
          storeId: body.storeId,
          userId: userId,
          content: body.content,
          type: TYPE_RATING.STORE,
          star: body.star,
          status: true
        });
        // eslint-disable-next-line no-case-declarations
        const condStore = {
          type: TYPE_RATING.STORE,
          userId: toObjectIdFromId(userId),
          storeId: toObjectIdFromId(body.storeId)
        };
        // eslint-disable-next-line no-case-declarations
        const starRateStore = await updateTotalRating(condStore, TYPE_RATING.STORE);
        await Promise.all([newRating, starRateStore]);
        // eslint-disable-next-line radix
        // eslint-disable-next-line no-case-declarations
        const newStar = parseInt(starRateStore[0].totalStar / starRateStore[0].count, 10);
        await Promise.all([sendNotification({
          targetId: newRatingToStore._id,
          to: store._id,
          data: {
            content: newRatingToStore.content,
            star: newRatingToStore.star,
            sender: user.fullName
          },
          type: NOTIFICATION_TYPE.USER_RATING_STORE
        }), updateRatingStore(store._id, newStar)]);
        break;
      default:
        break;
    }
    return true;
  } catch (error) {
    return error500(error);
  }
}

export async function getRatingByStoreId(type, id, query) {
  try {
    const sort = getSort(query);
    const cond = {};
    type = parseInt(type);
    if (!Object.values(TYPE_RATING).includes(type)) return errorMessage(404, ERROR_CODE.TYPE_RATING_INVALID);
    if (type === TYPE_RATING.PRODUCT) {
      cond.productId = id;
    } else {
      cond.storeId = id;
    }
    const promise = await Promise.all([countRatingByCond(cond), findRatingByCond(cond, query, sort)]);
    let users = await promise[1].map(user => user.userId.toString());
    users = uniqBy(users);
    const userInfo = await getListUserInfoByArray(JSON.stringify(users));
    if (userInfo.length > 0) return [0, []];
    userInfo.listUsers.forEach((user) => {
      user.avatar = GetFileData(SHARE_HOST, JSON.parse(user.avatar));
    });
    const payload = promise[1].map((item) => {
      item = item.toObject();
      userInfo.listUsers.forEach((user) => {
        if (item.userId.toString() === user._id.toString()) {
          item.userId = user;
        }
      });
      return item;
    });
    return [promise[0], payload];
  } catch (error) {
    return error500(error);
  }
}

export async function updateImageProduct(_id, body) {
  try {
    const product = await findOneProductByCondDAO({ _id });
    if (!product) return errorMessage(404, ERROR_CODE.PRODUCT_NOT_FOUND);
    product.images = body.images;
    await product.save();
    return product;
  } catch (error) {
    return error500(error);
  }
}

export async function getTypeRatingProduct() {
  try {
    const typeRating = await getSettingDAO({ type: SETTING_TYPE.TYPE_RATING });
    return typeRating;
  } catch (error) {
    return error500(error);
  }
}
