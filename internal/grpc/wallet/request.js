import { clientWallet } from './client';
import { CallGrpc } from '../../../external/grpc/lib/call';

export async function getWallet(_id, type) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientWallet, 'getWallet', { _id, type });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function updateVeticFromOrder(order) {
  try {
    // eslint-disable-next-line new-cap
    return await CallGrpc(clientWallet, 'updateVeticFromOrder', { order });
  } catch (err) {
    console.log('Error GRPC : ', err);
    return false;
  }
}

export async function getSettingGRPC(type) {
  try {
    return await CallGrpc(clientWallet, 'getSetting', { type });
  } catch (error) {
    return false;
  }
}

export async function createWalletSim(_id, type, vetic, sim ) {
  try {
    return await CallGrpc(clientWallet, 'createWalletSim', { _id, type, vetic, sim });
  } catch (error) {
    return false;
  }
}

export async function createTransactionSimMall(senderId, type, value, simId, userType, currency) {
  try {
    return await CallGrpc(clientWallet, 'createTransaction', { senderId, type, value, simId, userType, currency });
  } catch (error) {
    return false;
  }
}

export async function getWalletSim(sim) {
  try {
    return await CallGrpc(clientWallet, 'getWalletSim', { sim });
  } catch (error) {
    return false;
  }
}

export async function updateWalletFromSim(_id, sim, type, vetic, pin, tax, stock, money) {
  try {
    return await CallGrpc(clientWallet, 'updateWalletFromSim', {
 _id, sim, type, vetic, pin, tax, stock, money
});
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function updateVeticFromOrderSim(sim, vetic) {
  try {
    return await CallGrpc(clientWallet, 'updateVeticFromOrderSim', {
 sim, vetic
});
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createTransactionTopUp(receiverId, senderId, value, currency, type) {
  try {
    return await CallGrpc(clientWallet, 'createTransactionTopUp', { receiverId, senderId, value, currency, type });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function notificationCreatePendingOrder(_id, store, userId, invoice, total, special, vetic) {
  try {
    return await CallGrpc(clientWallet, 'notificationCreatePendingOrder', { _id, store, userId, invoice, total, special, vetic });
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createPaymentVNPayOrder(_id, store, userId, invoice, total, special, vetic) {
  try {
    return await CallGrpc(clientWallet, 'createPaymentVNPayOrder', { _id, store, userId, invoice, total, special, vetic });
  } catch (error) {
    console.log(error);
    return false;
  }
}
