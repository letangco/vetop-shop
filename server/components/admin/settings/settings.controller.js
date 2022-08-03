import { commonGetQuery } from '../../../../external/middleware/query';
import * as SettingService from './settings.service';

export async function getSettings(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SettingService.getSettings(query);
        return res.RH.paging(payload, query.page, query.limit);        
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSetting(req, res) {
    try {
        const { id } = req.params;
        const payload = await SettingService.getSetting(id);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateSetting(req, res) {
    try {
        const { body } = req;
        const payload = await SettingService.updateSetting(body);
        return res.RH.sucess(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function createSetting(req, res) {
    try {
        const { body } = req;
        const payload = await SettingService.createSetting(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updatePointOverOrder(req, res) {
    try {
        const { body } = req;
        const payload = await SettingService.updatePointOverOrder(body);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getPointOverOrder(req, res) {
    try {
        const payload = await SettingService.getPointOverOrder();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
