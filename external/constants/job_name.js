export const QUEUE_NAME = {
  ELASTICSEARCH_UPDATE: 'ELASTICSEARCH_UPDATE',
  ELASTICSEARCH_CREATE: 'ELASTICSEARCH_CREATE',
  ELASTICSEARCH_REMOVE: 'ELASTICSEARCH_REMOVE',
  SOCKET_EMIT_TO_USER: 'SOCKET_EMIT_TO_USER',
  CREATE_NOTIFICATION: 'CREATE_NOTIFICATION',
  SEND_NOTIFICATION_TO_USER: 'SEND_NOTIFICATION_TO_USER',
  SEND_MESSAGE_CHAT: 'SEND_MESSAGE_CHAT',
  SEND_RESULT_PAYMENT: 'SEND_RESULT_PAYMENT',
  CREATE_SCHEDULE: 'CREATE_SCHEDULE',
  UPDATE_BALANCE_USER: 'UPDATE_BALANCE_USER',
  UPDATE_STATUS_PAYMENT_REQUESTS: 'UPDATE_STATUS_PAYMENT_REQUESTS',
  CHANGE_STATUS_CLASS: 'CHANGE_STATUS_CLASS',
  CREATE_INTEREST_MONEY: 'CREATE_INTEREST_MONEY',
  INCOME_TAX: 'INCOME_TAX',
  TRANSFER_VETIC_TOKEN: 'TRANSFER_VETIC_TOKEN',
  GET_SETTING_TRANSACTION: 'GET_SETTING_TRANSACTION',
  CHECK_PIN_GT_VETIC: 'CHECK_PIN_GT_VETIC'
}

export const NOTIFICATION_TYPE = {
  TEACHER_APPROVE_REGISTER_CLASS: 'TEACHER_APPROVE_REGISTER_CLASS',
  USER_REQUEST_CHANGE_TIME: 'USER_REQUEST_CHANGE_TIME',
  ADMIN_NOTIFICATION: 'ADMIN_NOTIFICATION',
  NOTIFICATION_UNVIEW: 'NOTIFICATION_UNVIEW',
  REQUEST_PAYMENT: 'REQUEST_PAYMENT',
  ADMIN_APPROVE_CLASS: 'ADMIN_APPROVE_CLASS',
  ADMIN_REJECT_CLASS: 'ADMIN_REJECT_CLASS',
  CLASS_START_3_DAY: 'CLASS_START_3_DAY',
  CLASS_START: 'CLASS_START',
  LESSON_START: 'LESSON_START',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  BALANCE_CHANGE: 'BALANCE_CHANGE',
  PAYMENT_TUITION_SUCCESS: 'PAYMENT_TUITION_SUCCESS',
  REGISTER_CLASS: 'REGISTER_CLASS',
  CLASS_IS_FULLED: 'CLASS_IS_FULLED',
  USER_REQUEST: 'USER_REQUEST',
  TEACHER_REQUEST: 'TEACHER_REQUEST',
  USER_APPROVE_REQUEST: 'USER_APPROVE_REQUEST',
  USER_REJECT_REQUEST: 'USER_REJECT_REQUEST',
  TEACHER_REJECT_REQUEST: 'TEACHER_REJECT_REQUEST',
  TEACHER_APPROVE_REQUEST: 'TEACHER_APPROVE_REQUEST',
  TEACHER_REMIND_PAYMENT: 'TEACHER_REMIND_PAYMENT',
  ACCEPT_CHANGE_LESSON: 'ACCEPT_CHANGE_LESSON',
  REJECT_CHANGE_LESSON: 'REJECT_CHANGE_LESSON',
  INVITE_STAFF_TO_STORE: 'INVITE_STAFF_TO_STORE',
  ACCEPT_STORE_INVITE: 'ACCEPT_STORE_INVITE',
  REJECT_STORE_INVITE: 'REJECT_STORE_INVITE',
  TOTAL_UNVIEW_MESSAGE: 'TOTAL_UNVIEW_MESSAGE',
  TRANSACTION: 'TRANSACTION',
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL_PIN: 'WITHDRAWAL_PIN',
  WITHDRAWAL_VND: 'WITHDRAWAL_VND',
  TRANSFER_INTEREST_PIN: 'TRANSFER_INTEREST_PIN',
  TRANSFER_VETIC_BUY: 'TRANSFER_VETIC_BUY',
  TRANSFER_VETIC_SELL: 'TRANSFER_VETIC_SELL',
  TRANSFER_VETIC_REF_BUY: 'TRANSFER_VETIC_REF_BUY',
  TRANSFER_VETIC_REF_SELL: 'TRANSFER_VETIC_REF_SELL',
  TRANSFER_MONEY_SYSTEM: 'TRANSFER_MONEY_SYSTEM',
  TRANSFER_MONEY_ARCHIVE: 'TRANSFER_MONEY_ARCHIVE',
  TRANSFER_PIN: 'TRANSFER_PIN',
  USER_FOLLOW_STORE: 'USER_FOLLOW_STORE',
  USER_UNFOLLOW_STORE: 'USER_UNFOLLOW_STORE',
  USER_RATING_STORE: 'USER_RATING_STORE',
  ADMIN_ACCEPT_STORE: 'ADMIN_ACCEPT_STORE',
  REGISTER_ACCOUNT: 'REGISTER_ACCOUNT',
  REGISTER_STORE: 'REGISTER_STORE',
  ADMIN_REJECT_WITHDRAWAL_PIN: 'ADMIN_REJECT_WITHDRAWAL_PIN',
  ADMIN_REJECT_WITHDRAWAL_VND: 'ADMIN_REJECT_WITHDRAWAL_VND',
  ADMIN_APPROVE_WITHDRAWAL_PIN: 'ADMIN_APPROVE_WITHDRAWAL_PIN',
  ADMIN_APPROVE_WITHDRAWAL_VND: 'ADMIN_APPROVE_WITHDRAWAL_VND',
  ADMIN_IS_CONSIDERING_PIN: 'ADMIN_IS_CONSIDERING_PIN',
  ADMIN_IS_CONSIDERING_VND: 'ADMIN_IS_CONSIDERING_VND',
  INCOME_TAX: 'INCOME_TAX',
  REFUND_WITHDRAWAL_VND: 'REFUND_WITHDRAWAL_VND',
  REFUND_WITHDRAWAL_PIN: 'REFUND_WITHDRAWAL_PIN',
  TOPUP: 'TOPUP',
  STOCK_VND: 'STOCK_VND',
  CREATE_OVER_ORDER: 'CREATE_OVER_ORDER',
};

export const SOCKET_EMIT = {
  MESSAGE_CHAT: 'message_chat',
  CHAT_WRITING_ON: 'chat_writing_on',
  RESULT_PAYMENT: 'result_payment_vn_pay',
  CHART_ARCHIVE: 'chart_archive',
  ARCHIVE_CHANGE: 'archive_change',
  UPDATE_WALLET: 'update_wallet',
  ARCHIVE_INTEREST: 'archive_interest'
}

export const MESSAGE_SERVER_ON = {
  CHAT_WRITING: 'chat_writing',
  JOIN_GROUP_CHAT: 'join_group_chat',
  LEAVE_GROUP_CHAT: 'leave_group_chat',
}

export const TITLE_FCM = {
  STORE_NOTIFICATION: 'Thông báo từ cửa hàng',
  STAFF_REPLY_INVITE: 'Thông báo từ ',
  TRANSFER: 'Thay đổi số dư trong ví',
  WITHDRAWAL: 'Lệnh rút tiền',
  USER_FOLLOW_STORE: 'Thông báo hẹn đến từ người dùng',
  USER_RATING_STORE: 'Thông báo đánh giá từ người dùng',
  REGISTER_ACCOUNT: 'Đăng ký tài khoản người dùng',
  REGISTER_STORE: 'Đăng ký tài khoản cửa hàng',
  INCOME_TAX: 'Thông báo nộp thuế thu nhập cá nhân'
}

export const EXCEL_CONTENT = {
  WITHDRAWAL_PIN: 'Rút PIN về ngân hàng',
  WITHDRAWAL_VND: 'Rút VND về ngân hàng',
  TRANSFER_PIN: 'Rút PIN về ví VND',
  DEPOSIT: 'Nạp tiền vào hệ thống'
}

export const BODY_FCM = {
  INVITE_STAFF_TO_STORE: 'Bạn nhận được lời mời từ cửa hàng',
  REJECT_INVITE_STORE: 'đã từ chối lời mời nhân viên!',
  ACCEPT_STORE_INVITE: 'đã chấp nhận lời mời nhân viên!',
  TRANSACTION_TRANSFER_PIN: 'Bạn nhận được ',
  TRANSACTION_TRANSFER_PIN1: 'PIN = ',
  TRANSACTION_TRANSFER_PIN2: '% Vetic, số Vetic còn lại ',
  TRANSACTION_TRANSFER_PIN3: 'VTĐ, khấu trừ thuế TNCN ',
  TRANSACTION_TRANSFER_PIN4: 'PIN',
  DEPOSIT: 'Nạp ',
  DEPOSIT1: 'VNĐ vào VETOP thành công',
  WITHDRAWAL: 'Yêu cầu rút ',
  WITHDRAWAL1: 'PIN về từ [ví PIN] thành công',
  WITHDRAWAL2: 'VND về từ [ví VND] thành công',
  FROM_PIN_TO: ' từ ví PIN về',
  FROM_VND_TO: ' từ ví tiền về',
  BANK: ' ngân hàng',
  SUCCESS: ' thành công',
  PIN: 'PIN',
  VND: 'VND',
  TRANSFER: 'Nhận được ',
  TRANSFER1: 'PIN về ví VND thành công',
  TRANSFER_VETIC_BUY: 'VTĐ từ đơn hàng #',
  TRANSFER_VETIC_SELL: 'Thanh toán đơn hàng #',
  TRANSFER_VETIC_SELL1: ' thành công, nhận được ',
  TRANSFER_VETIC_SELL2: 'VTĐ',
  TRANSFER_VETIC_REF_BUY: 'Bạn đã nhận được ',
  TRANSFER_VETIC_REF_BUY1: 'VTĐ = 5% Vetic từ đơn hàng #',
  TRANSFER_VETIC_REF_BUY2: ' đã giao dịch thành công',
  TRANSFER_VETIC_REF_SELL: 'Bạn đã nhận được ',
  TRANSFER_VETIC_REF_SELL1: 'VTĐ = 3% Vetic từ đơn hàng #',
  TRANSFER_VETIC_REF_SELL2: ' đã giao dịch thành công',
  TRANSFER_PIN: 'Chuyển ',
  TRANSFER_PIN1: 'PIN về ví VND thành công',
  UNFOLLOW_STORE: 'hủy hẹn đến cửa hàng của bạn',
  FOLLOW_STORE: 'đặt hẹn đến cửa hàng của bạn',
  USER_RATING_STORE: ' đánh giá cửa hàng',
  REGISTER_ACCOUNT: 'Chào mừng bạn đến với Vetop! Mã khách hàng và cũng là mã giới thiệu của bạn là ',
  REGISTER_STORE: 'Xin chúc mừng! Bạn đang là chủ ',
  ADMIN_REJECT_WITHDRAWAL: ' của bạn bị từ chối',
  REFUND_VALUE: ' Hoàn lại ',
  TO_PIN_WALLET: ' về [ví PIN]',
  TO_VND_WALLET: ' về [ví VNĐ]',
  ADMIN_APPROVE_WITHDRAWAL: ' của bạn đã được duyệt',
  ADMIN_IS_CONSIDERING: ' của bạn đang được xem xét',
  INCOME_TAX: 'Bạn vừa đóng số tiền thuế thu nhập cá nhân là ',
  PIN_REFUND_FROM_WITHDRAWAL_PIN: ' hoàn trả từ giao dịch rút PIN bị từ chối',
  PIN_REFUND_FROM_WITHDRAWAL_VND: ' hoàn trả từ giao dịch rút VND bị từ chối',
  ADMIN_TOPUP_USER: ' từ hệ thống',
  STOCK_VND_WALLET: 'Số dư trong ví giảm ',
  STOCK_VND_CONTENT: ' từ giao dịch thanh toán đơn hàng #',
  VTD: 'VTĐ',
};
