import slug from 'slug';
import { DEFAULT_IMAGE_PRODUCT, ERROR_CODE, SUCCESS_CODE } from '../../../external/constants/constants';
import { error500 } from '../../../external/util/error';
import Product from './product.model';
import Categories from '../category/category.model';
import { GetFileData } from '../../../external/util/file';
import { SHARE_HOST } from '../../../external/constants/constants';

export async function createProductDAO(options) {
    try {
        return await Product.create(options);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findProductsByCondDAO(cond, query, sort) {
    try {
        return await Product.find(cond).sort(sort).skip(query.skip).limit(query.limit);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function countProductByCondDAO(cond) {
    try {
        return await Product.countDocuments(cond);
    } catch (error) {
        return error500(error, ERROR_CODE.INTERNAL_SERVER_ERROR);
    }
}

export async function findOneProductByCondDAO(cond) {
    try {
        return await Product.findOne(cond);
    } catch (error) {
        return error500(error);
    }
}

export async function getProductById(id) {
    try {
        return await Product.findById(id);
    } catch (error) {
        return error500(error);
    }
}

export async function getProductByCond(query) {
    try {
        const conditionAll = {};
        switch (query.status) {
            case 'true':
                conditionAll.status = true;
                break;
            case 'false':
                conditionAll.status = false;
                break;
            case '':
                conditionAll.status = [true, false];
                break;
            default:
                break;
        }
        if (query?.keyword) conditionAll.searchString = { $regex: slug(query.keyword, ' '), $options: 'i' };
        if (query.date) {
            const startDate = new Date(query.date);
            const date = startDate;
            date.setDate(startDate.getDate() + 1);
            conditionAll.createdAt = {
                $gte: new Date(query.date),
                $lt: date
            };
        }
        if (query.fromPrice && query.toPrice) {
            conditionAll.price = { $gte: parseInt(query.fromPrice, 10), $lt: parseInt(query.toPrice, 10) };
        } else if (!query.fromPrice && query.toPrice) {
            conditionAll.price = { $lt: parseInt(query.toPrice, 10) };
        } else if (query.fromPrice && !query.toPrice) {
            conditionAll.price = { $gte: parseInt(query.fromPrice, 10) };
        }
        const payload = await Promise.all([
            Product.find(conditionAll).countDocuments(),
            Product.find(conditionAll)
                .skip(query.skip)
                .limit(query.limit)
        ]);
        const result = payload[1].map(async (c) => {
            const temp = [];
            for (let i = 0; i < c.categories.length; i += 1) {
                const cate = await Categories.findById(c.categories[i]);
                if (cate) temp.push(cate);
            }
            const currentDate = new Date(c.createdAt);
            return {
                _id: c._id,
                storeId: c.storeId,
                name: c.name,
                description: c.description,
                quantity: c.quantity,
                price: c.price,
                special: c.special,
                images: c.images.length ? c.images.map(img => GetFileData(SHARE_HOST, img)) : [GetFileData(SHARE_HOST, DEFAULT_IMAGE_PRODUCT)],
                vetic: c.vetic,
                categories: temp.filter(item => item),
                viewed: c.viewed,
                searchString: c.searchString,
                model: c.model,
                status: c.status,
                createdAt: currentDate.toISOString()
            };
        });
        return [payload[0], await Promise.all(result)];
    } catch (error) {
        return error500(error);
    }
}

export async function updateStatusProduct(id, status) {
    try {
        const hasProduct = await Product.findById(id);
        if (!hasProduct) {
            return {
                res: false,
                message: ERROR_CODE.PRODUCT_NOT_FOUND
            };
        }
        await hasProduct.updateOne(
            {
                $set: {
                    status: status
                }
            }
        );
        return {
            res: true,
            message: SUCCESS_CODE.UPDATE_SUCCESSFULLY
        };
    } catch (error) {
        return error500(error);
    }
}

export async function deleteProductByIdDAO(id) {
    try {
        const hasProduct = await Product.findById(id);
        if (!hasProduct) {
            return {
                res: false,
                message: ERROR_CODE.PRODUCT_NOT_FOUND
            };
        }
        await hasProduct.DeleteProductToElasticSearch();
        await hasProduct.remove();
        return {
            res: true,
            message: SUCCESS_CODE.DELETE_SUCCESS
        };
    } catch (error) {
        return error500(error);
    }
}
