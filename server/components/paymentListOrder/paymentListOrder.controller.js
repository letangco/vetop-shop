import * as TypePaymentOrder from './paymentListOrder.service';

export async function getListTypePaymentOrder(req, res) {
    try {
        return res.RH.success(await TypePaymentOrder.getListTypePaymentOrder());
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function getDetailTypePaymentOrder(req, res) {
    try {
        const { id } = req.params;
        return res.RH.success(await TypePaymentOrder.getDetailTypePaymentOrder(id));
    } catch (error) {
        return res.RH.error(error);
    }
}
