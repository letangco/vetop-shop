import * as FireworkService from './firework.service';

export async function getTimeFirework(req, res) {
    try {
        const payload = await FireworkService.getTimeFirework();
        return res.RH.success(payload);
    } catch (error) {
        return res.RH.error(error);
    }
}
