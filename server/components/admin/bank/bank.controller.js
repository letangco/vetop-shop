import { commonGetQuery } from '../../../../external/middleware/query';
import * as BankService from './bank.service';

export async function getListReceiveBankSystem(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await BankService.getListReceiveBankSystem(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function createBankSystem(req, res) {
    try {
        const { body } = req;
        const payload = await BankService.createBankSystem(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateBankSysTem(req, res) {
    try {
        const { id } = req.params;
        const { body } = req;
        const payload = await BankService.updateBankSysTem(id, body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getInfoBankSystem(req, res) {
    try {
        const { id } = req.params;
        const payload = await BankService.getInfoBankSystem(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteBankSystem(req, res) {
    try {
        const { id } = req.params;
        const payload = await BankService.deleteBankSystem(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
