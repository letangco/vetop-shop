import { clientUser } from './client';
import { CallGrpc } from '../../../external/grpc/lib/call';

export async function getUserInfo(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getUserInfo', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getStaffInfo(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getStaffInfo', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getUserInfoByCode(code) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getUserInfoByCode', { code });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getUserInfoByRefer(refer) {
  try {
    return await CallGrpc(clientUser,'getUserInfoByRefer', { refer })
  } catch (error) {
    return false;
  }
}

export async function getAdminInfo(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getAdminInfo', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}
export async function getStoreInfo(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getStoreInfo', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function addCategoryToStore(id, listCate) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'addCategoryToStore', { id, listCate });
  } catch (error) {
    return false;
  }
}

export async function updateCategoryStore(storeId, categoriesId, searchStringCategory) {
  try {
    return await CallGrpc(clientUser, 'updateCategoryStore', { storeId, categoriesId, searchStringCategory });
  } catch (error) {
    return false;
  }
}

export async function updateRatingStore(_id, star) {
  try {
    return await CallGrpc(clientUser, 'ratingStoreByStar', { _id, star });
  } catch (error) {
    return false;
  }
}

export async function getListUserInfoByArray(idUsers) {
  try {
    return await CallGrpc(clientUser, 'getListUserInfoByArray', {idUsers})
  } catch (error) {
    return false;
  }
}

export async function updateTotalProductStore(storeId, totalProduct) {
  try {
    return await CallGrpc(clientUser, 'updateTotalProductStore', { storeId, totalProduct });
  } catch (error) {
    return false;
  }
}

export async function getUserInfoByAdmin(id) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientUser, 'getUserInfoByAdmin', { id });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getStoreInfoByAdmin(id) {
  try {
    return await CallGrpc(clientUser, 'getStoreInfoByAdmin', { id });
  } catch (error) {
    return false;
  }
}

export async function getUserByIdStore(storeId) {
  try {
    return await CallGrpc(clientUser, 'getUserByIdStore', { storeId });
  } catch (error) {
    return false;
  }
}

export async function updateRatingSim(_id, type, rating) {
  try {
    return await CallGrpc(clientUser, 'updateRatingSim', { _id, type, rating });
  } catch (error) {
    return false;
  }
}

export async function updatePaymentLimitFromOrder(storeId, staffId, paymentLimit) {
  try {
    return await CallGrpc(clientUser, 'updatePaymentLimitFromOrder', { storeId, staffId, paymentLimit });
  } catch (error) {
    return false; 
  }
}

export async function updatePaymentLimitStaff(staffId, value) {
  try {
    return await CallGrpc(clientUser, 'updatePaymentLimitStaff', { staffId, value });
  } catch (error) {
    return false;
  }
}
