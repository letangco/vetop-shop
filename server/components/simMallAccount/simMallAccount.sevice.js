import { ERROR_CODE, SHARE_HOST, TYPE_LOGIN } from '../../../external/constants/constants';
import { error500, errorMessage } from '../../../external/util/error';
import { GetFileData } from '../../../external/util/file';
import { getStaffInfo, getStoreInfo, getUserInfo } from '../../../internal/grpc/user/request';
import { createSiMallAccDAO, getSimMallAccDAO } from './simMallAccount.dao';

export async function createSimMallAcc(auth) {
    try {
        const hasAccount = await getSimMallAccDAO({ user: auth });
        if (hasAccount) return errorMessage(403, ERROR_CODE.ACCOUNT_REGISTERED);
        const newAccount = await createSiMallAccDAO({
            user: auth._id,
            name: auth.name,
            phone: auth.phone
        });
        return newAccount;
    } catch (error) {
        return error500(error);
    }
};

export async function updateSimMallAcc(user, body) {
    try {
        const simAcc = await getSimMallAccDAO({ user: user._id });
        if (!simAcc) return errorMessage(404, ERROR_CODE.SIM_MALL_ACCOUNT_NOTFOUND);
        simAcc.name = body?.name || simAcc.name;
        simAcc.avatar = body.avatar || simAcc.avatar;
        await simAcc.save();
        return simAcc;
    } catch (error) {
        return error500(error);
    }
}

export async function getSimMallAcc(user) {
    try {
        const simAcc = await getSimMallAccDAO({ user: user._id });
        if (simAcc?.avatar) {
            simAcc.avatar = GetFileData(SHARE_HOST, simAcc.avatar);
        }
        return simAcc;
    } catch (error) {
        return error500(error);
    }
}
