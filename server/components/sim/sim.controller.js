import { commonGetQuery } from '../../../external/middleware/query';
import * as SimService from './sim.service';
import * as _ from 'lodash';

export async function addSim(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await SimService.addSim(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSim(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimService.getSim(query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function changeStatusSim(req, res) {
    try {
        const { body } = req;
        const { user } = req;
        const payload = await SimService.changeStatusSim(body, user);
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function removeSim(req, res) {
    try {
        const { id } = req.params;
        const { user } = req;
        await SimService.removeSim(id, user);
        return res.RH.success(true);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getDetailSim(req, res) {
    try {
        const { id } = req.params;
        const payload = await SimService.getDetailSim(id);
        return res.RH.success(payload);
    } catch (error) {
        console.log(error);
        return res.RH.error(error);
    }
}

export async function getHistorySim(req, res) {
    try {
        const query = commonGetQuery(req);
        const payload = await SimService.getHistorySim(query, sim);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getSimOwner(req, res) {
    try {
        const { user } = req;
        const query = commonGetQuery(req);
        const payload = await SimService.getSimOwner(user, query);
        return res.RH.paging(payload, query.page, query.limit);
    } catch (error) {
        return res.RH.error(error);
    }
}

