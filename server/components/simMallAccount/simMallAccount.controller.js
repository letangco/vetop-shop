import * as SimMallAccountService from './simMallAccount.sevice';

export async function createSimMallAcc(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await SimMallAccountService.createSimMallAcc(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateSimMallAcc(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const payload = await SimMallAccountService.updateSimMallAcc(user, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
} 

export async function getSimMallAcc(req, res) {
    try {
        const { user } = req;
        const payload = await SimMallAccountService.getSimMallAcc(user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
} 
