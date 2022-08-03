/**
 * Run the scripts to create initial data
 * @returns {Promise<boolean>}
 */

import logger from '../../server/api/logger';
import User from '../../server/components/product/product.model';
import { createSettingDAO, getSettingDAO, getTotalSettingsDAO } from '../../server/components/admin/settings/settings.dao';
import ReportOrder from '../../server/components/order/reportOrder.model';
import SimCategory from '../../server/components/simCategory/simCategory.model';
import { CURRENCY_TYPE, SETTING_TYPE, TRANSACTION_CODE } from '../../external/constants/constants';

async function createDummyUser() {
  try {
    const settings = await Promise.all([
      getSettingDAO({ type: SETTING_TYPE.BANK_INFO }),
      getSettingDAO({ type: SETTING_TYPE.STATUS_CHANGE_CODE_FREE }),
      getSettingDAO({ type: SETTING_TYPE.POINT_OVER_ORDER }),
      getSettingDAO({ type: SETTING_TYPE.TYPE_RATING }),
    ]);
    if (!settings[3]) {
      await createSettingDAO({
        type: SETTING_TYPE.TYPE_RATING,
        data: {
          1: 'Sản phầm không tốt',
          2: 'Giao hàng chậm',
          3: 'Tạm ổn',
          4: 'Phục vụ tốt!',
          5: 'Tuyệt vời!'
        }
      });
    }
    if (!settings[0]) {
      await createSettingDAO({
        type: SETTING_TYPE.BANK_INFO,
        data: {
          bankName: 'ACB',
          accountName: 'Dang Hieu Tran',
          accountNumber: '011101010101'
        }
      });
    }
    if (!settings[1]) {
      await createSettingDAO({
        type: SETTING_TYPE.STATUS_CHANGE_CODE_FREE,
        data: {
          status: true,
          expired: '01-01-2022'
        }
      });
    }
    if (!settings[2]) {
      await createSettingDAO({
        type: SETTING_TYPE.POINT_OVER_ORDER,
        data: {
          value: 10000000
        }
      });
    }
    const SettingOrder = await getTotalSettingsDAO({ type: SETTING_TYPE.ORDER });
    if (!SettingOrder) {
      await createSettingDAO({
        type: SETTING_TYPE.ORDER,
        data: {
          value: 1
        }
      });
    }
    const SettingProduct = await getTotalSettingsDAO({ type: SETTING_TYPE.PRODUCT });
    if (!SettingProduct) {
      await createSettingDAO({
        type: SETTING_TYPE.PRODUCT,
        data: {
          value: 1
        }
      });
    }
    const SettingTimeFireWork = await getTotalSettingsDAO({ type: SETTING_TYPE.TIME_FIRE_WORK });
    if (!SettingTimeFireWork) {
      await createSettingDAO({
        type: SETTING_TYPE.TIME_FIRE_WORK,
        data: {
          UTChour: 1,
          UTCminute: 1
        }
      });
    }
    Object.values(TRANSACTION_CODE).map(async (d, i) => {
      const numTransaction = await getTotalSettingsDAO({ type: SETTING_TYPE.TRANSACTION, 'data.type': Object.values(TRANSACTION_CODE)[i] });
      if (!numTransaction) {
        await createSettingDAO({
          type: SETTING_TYPE.TRANSACTION,
          data: {
            type: Object.values(TRANSACTION_CODE)[i],
            value: 1
          }
        });
      }
    });
    const numFilterSimPrice = await getTotalSettingsDAO({ type: SETTING_TYPE.FILTER_SIM_PRICE });
    if (!numFilterSimPrice) {
      await createSettingDAO({
        type: SETTING_TYPE.FILTER_SIM_PRICE,
        data: {
          value: '0,100000,200000,300000,4000000,500000,1000000'
        }
      });
    }
    const numFilterSimVetic = await getTotalSettingsDAO({ type: SETTING_TYPE.FILTER_SIM_VETIC });
    if (!numFilterSimVetic) {
      await createSettingDAO({
        type: SETTING_TYPE.FILTER_SIM_VETIC,
        data: {
          value: '0,100000,200000,300000,4000000,500000,1000000'
        }
      });
    }
    const numsReport = await ReportOrder.countDocuments({});
    if (!numsReport) {
      await ReportOrder.create({ value: 0 });
    }
    return true;
  } catch (error) {
    logger.error('dummySomeData error:');
    logger.error(error);
    throw error;
  }
}

export default async function dummySomeData() {
  try {
    // Todo: run your scripts to create dummy data
    await createDummyUser();
    logger.info('dummySomeData done');
    return true;
    // eslint-disable-next-line no-unreachable
  } catch (error) {
    throw error;
  }
}
