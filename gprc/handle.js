import {
  countProductByCondDAO, findProductsByCondDAO,
  getProductById, getProductByCond, updateStatusProduct, deleteProductByIdDAO
} from "../server/components/product/product.dao";
import { uniqBy } from 'lodash';
import { GetFileData } from '../external/util/file';
import { ERROR_CODE, SETTING_TYPE, SHARE_HOST, TYPE_LOGIN, TYPE_SETTING } from '../external/constants/constants';
import {
  findCategoriesByCondNoLimitDAO, getCategoriesById, getProductByCategoriesCond
} from '../server/components/category/category.dao';
import { countRatingByCond, findRatingByCond, findRatingByCondUnlimit } from "../server/components/rating/rating.dao";
import { TYPE_RATING } from "../external/constants/constants";
import Categories from '../server/components/category/category.model';
import { adminGetCategoriesByIdStore } from "../server/components/admin/category/category.service";
import { countOrderByCond, getSalesDAO, updateOrderByCondDao, findOneOrderByCond } from "../server/components/order/order.dao";
import { getReport } from "../server/components/order/reportOrder.dao";
import { getSettingDAO } from "../server/components/admin/settings/settings.dao";
import { sendDataToQueue } from "../internal/ rabbitmq/publisher/publisher";
import { RabbitMQ } from "../server/server";
import { QUEUE_NAME } from "../external/constants/job_name";
import uuid from 'uuid'
import { getSimDAO } from "../server/components/sim/sim.dao";
import { getSimMallAccDAO } from "../server/components/simMallAccount/simMallAccount.dao";
import { getStoreInfo, getUserInfo } from "../internal/grpc/user/request";
import { createSimMallAcc } from "../server/components/simMallAccount/simMallAccount.sevice";
import { addStoreCategory } from "../server/components/category/category.service";
import { errorMessage } from "../external/util/error";

export async function example(call) {
  return {
    name: call.request.name
  };
}

export async function getCategoryByStoreIdHandle(call) {
  try {
    const request = call.request;
    console.log(request.id);
    const arCate = [];
    const products = (await findProductsByCondDAO({ storeId: request.id }, JSON.parse(request.query), JSON.parse(request.sort))).map(pro => arCate.concat(pro.categories));
    return true;
  } catch (error) {
    return false;
  }
}

export async function getCategoriesHandle(call) {
  try {
    const categories = await findCategoriesByCondNoLimitDAO({});
    const data = categories.map((cat) => {
      return {
        _id: cat._id,
        name: cat.name,
        image: JSON.stringify(cat.image),
        description: cat.description
      };
    });
    return data;
  } catch (error) {
    return false;
  }
}

// get CategoriesInfo
export async function getCategoriesInfo(call) {
  try {
    const request = call.request;
    const category = await getCategoriesById(request.id);
    return {
      _id: category._id,
      name: category.name,
      description: category.description,
    };
  } catch (error) {
    return false;
  }
}

export async function getCommentRatingByIdStore(call) {
  try {
    const request = call.request;
    const type = request.type;
    const cond = {};
    if (type === TYPE_RATING.PRODUCT) {
      cond.productId = request._id;
    }
    if (type === TYPE_RATING.STORE) {
      cond.storeId = request._id;
    }
    const data = await findRatingByCondUnlimit(cond);
    const payload = data.map((d) => {
      return {
        _id: d.userId,
        star: d.star,
        content: d.content
      }
    })
    return payload;
  } catch (error) {
    return false;
  }
}

export async function getProductsToStore(call) {
  try {
    const request = call;
    const data = await findProductsByCondDAO({ storeId: request._id });
    const result = data.map((store) => {
      return {
        _id: store._id,
        name: store.name,
        avatar: JSON.stringify(store.avatar),
        price: store.price,
        vetic: store.vetic,
        description: store.description,
        quantity: store.quantity,
        stock: store.stock,
        rate: store.rate
      }
    })
    return result;
  } catch (error) {
    return false;
  }
}

export async function getRating(call) {
  try {
    const request = call.request;
    const cond = {};
    const sort = JSON.parse(request.sort);
    const query = {
      skip: request.skip,
      limit: request.limit
    };
    if (request.type === TYPE_RATING.PRODUCT) {
      cond.productId = request.targetId;
    } else {
      cond.storeId = request.targetId;
    }
    const promise = await Promise.all([countRatingByCond(cond), findRatingByCond(cond, query, sort)])
    const data = promise[1].map((rating) => {
      return {
        _id: rating._id,
        userId: rating.userId,
        targetId: request.type === TYPE_RATING.PRODUCT ? rating.productId : rating.storeId,
        star: rating?.star || 0,
        type: request.type,
        content: rating.content,
        createdAt: rating.createdAt
      };
    });
    return {
      item: data,
      page: promise[0]
    };
  } catch (error) {
    return false;
  }
}

export async function countTotalProduct(call) {
  try {
    const request = call.request;
    const promise = await Promise.all([countProductByCondDAO({ storeId: request.storeId }), countRatingByCond({ storeId: request.storeId })]);
    return {
      totalProduct: promise[0],
      totalRating: promise[1]
    };
  } catch (error) {
    return false;
  }
}

export async function getCategoriesInArray(call) {
  try {
    const request = call.request;
    const categories = await findCategoriesByCondNoLimitDAO({ _id: { $in: JSON.parse(request.categories) } });
    const result = categories.map((category) => {
      return {
        _id: category._id,
        name: category.name,
        image: JSON.stringify(category.image),
        icon: JSON.stringify(category.icon),
        color: category.color
      }
    });
    return result;
  } catch (error) {
    return false;
  }
}

export async function getProductByStoreCategoriesByAdmin(call) {
  try {
    const request = call.request;
    const payload = await getProductByCategoriesCond(request.idCategories, request.idStore);
    return payload;
  } catch (error) {
    return false;
  }
}

export async function getCategoriesStoreByAdmin(call) {
  try {
    const request = call.request;
    const payload = await adminGetCategoriesByIdStore(request.id);
    return { categories: payload };
  } catch (error) {
    return false;
  }
}

export async function getTotalOrderHandle(call) {
  try {
    const request = call.request;
    const cond = JSON.parse(request.cond);
    const payload = await getReport({})
    return {
      total: payload.value
    };
  } catch (error) {
    return false;
  }
}

export async function updateSettingTransactionHandle(call) {
  try {
    // const setting = await getSettingDAO({ type: SETTING_TYPE.TRANSACTION, 'data.type': call.request.type });
    // const num = setting.data.value;
    // setting.data = {
    //   value: setting.data.value + 1
    // };
    // await setting.save();
    return {
      value: uuid.v4()
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getTimeFireWorkHandle(call) {
  try {
    const data = await getSettingDAO({ type: SETTING_TYPE.TIME_FIRE_WORK });
    return {
      date: data?.date,
      UTChour: data.UTChour,
      UTCminute: data.UTCminute
    }
  } catch (error) { 
    return false;
  }
}

export async function updateTimeFireWorkHandle(call) {
  try {
    const request = call.request;
    const firework = await getSettingDAO({ type: SETTING_TYPE.TIME_FIRE_WORK });
    firework.data = {
      date: new Date(new Date().toISOString()).getTime().toString(),
      UTChour: new Date().getUTCHours(),
      UTCminute: new Date().getUTCMinutes() + 1
    };
    await firework.save();
    return {
      success: true
    };
  } catch (error) {
    return false;
  }
}

export async function getSimInfoHandle(call) {
  try {
    const request = call.request;
    let payload = await getSimDAO({ _id: request._id });
    if (payload) {
      payload = payload.toObject();
      payload.owner = await getSimMallAccDAO({ _id: payload.owner });
      return {
        _id: payload.owner._id,
        user: payload.owner.user,
        avatar: JSON.stringify(payload.owner.avatar) || '',
        name: payload.owner.name
      };
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function createSimAccountHandle(call) {
  try {
    const request = call.request;
    const payload = await createSimMallAcc(request);
    return { data: JSON.stringify(payload) };
  } catch (error) {
    return false;
  }
}

export async function getSalesHandle(call) {
  try {
    const request = call.request;
    const payload = await getSalesDAO(request.staffId);
    return {
      total: payload
    }
  } catch (error) {
    return false;
  }
}

export async function createCategoriesStore(call) {
  try {
    const request = call.request;
    console.log(request);
    await addStoreCategory(request.storeId, request.categoriesId);
    return {
      payload: true
    };
  } catch (error) {
    return false;
  }
}

export async function updateStatusTypeOrderById(call) {
  try {
    const request = call.request;
    const payload = await updateOrderByCondDao(request.orderId, request.status);
    return {
      success: payload
    };
  } catch (error) {
    return false;
  }
}

// get Info Product
export async function getProductInfo(call) {
  try {
    const request = call.request;
    const product = await getProductById(request.id);
    if (!product || product.status === false) return { _id: '' };
    const arrCate = product.categories ? product.categories.map(async (item) => {
      const category = await getCategoriesById(item);
      if (!category) return null;
      return {
        _id: category._id,
        name: category.name,
        color: category.color,
        image: GetFileData(SHARE_HOST, category?.image),
        icon: GetFileData(SHARE_HOST, category?.icon),
      };
    }) : [];
    const processArrCate = await Promise.all(arrCate);
    return {
      _id: product._id,
      name: product.name,
      storeId: product.storeId,
      quantity: product.quantity,
      price: product.price,
      images: await Promise.all(product?.images.map(img => GetFileData(SHARE_HOST, img))),
      description: product.description,
      vetic: product.vetic,
      special: product.special,
      rate: product.rate,
      viewed: product.viewed,
      stock_status: product.stock_status,
      model: product.model,
      createdAt: new Date(product.createdAt).toISOString(),
      categories: processArrCate.filter(item => item)
    };
  } catch (error) {
    return false;
  }
}

/**
 * call grpc get order info
 * @param {*} call
 */
export async function getOrderInfo(call) {
  try {
    const request = call.request;
    const order = await findOneOrderByCond({ _id: request._id });
    const storeInfo = await getStoreInfo(order.store.id);
    if (!storeInfo) return errorMessage(404, ERROR_CODE.STORE_NOT_FOUND);
    const initialOrder = {
      orderId: order._id,
      total: order.total,
      vetic: order.vetic,
      userId: order.userId,
      sellId: order.ref_sell.id,
      buyId: order.ref_buy.id,
      storeId: order.store.id,
      storeUser: storeInfo.userId,
      invoice: order.invoice,
      typeOwner: TYPE_LOGIN.STORE,
      special: order.special
    };
    console.log('get order info: ', initialOrder);
    const payload = JSON.stringify(initialOrder);
    return {
      order: payload
    };
  } catch (error) {
    return false;
  }
}
