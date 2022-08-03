import { LIMIT } from '../constants/constants';

export const commonGetQuery = (req) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || LIMIT;
  const skip = (page - 1) * limit;
  // admin
  const filterType = req.query.filterType || 'all';
  const options = {
    page,
    limit,
    skip,
    filterType,
  };
  if (req.query.sort) {
    options.sort = req.query.sort;
  }
  // TODO ..
  if (req.query.keyword) {
    options.keyword = req.query.keyword;
  }
  if (req.query.active) {
    options.active = req.query.active;
  }
  if (req.query.type) {
    options.type = req.query.type;
  }
  if (req.user) {
    options.user = req.user._id;
  }
  // admin filter
  if (req.query.fromDay) {
    options.fromDay = req.query.fromDay;
  }
  if (req.query.toDay) {
    options.toDay = req.query.toDay;
  }
  if (req.query.lat) {
    options.lat = req.query.lat;
  }
  if (req.query.lng) {
    options.lng = req.query.lng;
  }
  if (req.query.status) {
    options.status = req.query.status;
  }
  if (req.query.categories) {
    options.categories = req.query.categories;
  }
  if (req.query.maxDistance) {
    options.maxDistance = req.query.maxDistance;
  }
  if (req.query.date) {
    options.date = req.query.date;
  }
  if (req.query.fromPrice) {
    options.fromPrice = req.query.fromPrice;
  }
  if (req.query.toPrice) {
    options.toPrice = req.query.toPrice;
  }
  if (req.query.storeId) {
    options.storeId = req.query.storeId;
  }
  if (req.query.paymentType) {
    options.paymentType = req.query.paymentType;
  }
  if (req.query.withdrawal) {
    options.withdrawal = req.query.withdrawal;
  }
  if (req.query.userType) {
    options.userType = req.query.userType;
  }
  if (req.query.user) {
    options.userId = req.query.user;
  }
  if (req.query.filterPrice) {
    options.filterPrice = req.query.filterPrice;
  }
  if (req.query.filterVetic) {
    options.filterVetic = req.query.filterVetic;
  }
  if (req.query.otpCode) {
    options.otpCode = req.query.otpCode;
  }
  return options;
};

export const AssignKeyword = (query, conditions = {}) => {
  if (query.keyword) {
    conditions.searchString = {
      $regex: query.keyword,
      $options: 'i'
    };
  }
  return conditions;
};

export const AssignActive = (query, conditions = {}) => {
  if (query.active) {
    conditions.active = (query.active === 'yes');
  }
  return conditions;
};

export const getSort = (query) => {
  const sort = {};
  if (query.sort) {
    const listSort = query.sort.split(',');
    if (listSort.length > 0) {
      for (let i = 0; i < listSort.length; i++) {
        const dataSort = listSort[i].trim().split(':');
        if (dataSort.length >= 2) {
          sort[dataSort[0].trim()] = dataSort[1].trim() === 'asc' ? 1 : -1;
        }
      }
      return sort;
    }
    return {
      createdAt: -1,
    };
  }
  return {
    createdAt: -1,
  };
};

export const getSortOrder = (query) => {
  const sort = {};
  if (query.sort) {
    const listSort = query.sort.split(',');
    if (listSort.length > 0) {
      for (let i = 0; i < listSort.length; i++) {
        const dataSort = listSort[i].trim().split(':');
        if (dataSort.length >= 2) {
          sort[dataSort[0].trim()] = dataSort[1].trim() === 'asc' ? 1 : -1;
        }
      }
      return sort;
    }
    return {
      updatedAt: -1,
    };
  }
  return {
    updatedAt: -1,
  };
};

export const getMultiSort = (query) => {
  const sort = [['index', 1], ['searchString', 'asc']];
  if (query.sort) {
    const listSort = query.sort.split(',');
    if (listSort.length > 0) {
      for (let i = 0; i < listSort.length; i++) {
        const dataSort = listSort[i].trim().split(':');
        if (dataSort.length >= 2) {
          sort.index = dataSort[0][1].trim() === 'asc' ? 1 : -1;
          sort.name = dataSort[1][1].trim() === 'asc' ? 'asc' : 'desc';
        }
      }
      return sort;
    }
    return sort;
  }
  return sort;
};

export const getSortBuilder = (query) => {
  const sort = {
    name: 'price',
    type: 'asc'
  };
  if (query.sort) {
    const listSort = query.sort.split(',');
    if (listSort.length > 0) {
      for (let i = 0; i < listSort.length; i++) {
        const dataSort = listSort[i].trim().split(':');
        if (dataSort.length >= 2) {
          sort.name = dataSort[0].trim();
          sort.type = dataSort[1].trim() === 'asc' ? 'asc' : 'desc';
        }
      }
      return sort;
    }
    return sort;
  }
  return sort;
};

