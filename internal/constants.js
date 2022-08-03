/**
 * The global constants
 */
const MEGABYTE = 1024 * 1024;
export const MAX_UPLOAD_FILE_SIZE_MB = 25;
export const MAX_UPLOAD_FILE_SIZE_BYTE = MAX_UPLOAD_FILE_SIZE_MB * MEGABYTE;

export const BCRYPT_SALT_ROUNDS = 12;
export const VERIFY_EMAIL_EXPIRE_DURATION = '3m';
export const USER_JWT_DEFAULT_EXPIRE_DURATION = '10d';
export const MORGAN_FORMAT = ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
export const USER_MIN_PASSWORD_LENGTH = 8;
export const VERIFICATION_CODE_LENGTH = 6;
export const DEFAULT_LANGUAGE = 'vi';

export const USER_ROLES = {
  CUSTOMER: 1, // Importer/ Exporter
  TRUCKING_COMPANY: 2,
  SHIPPING_COMPANY: 3,
};

export const TYPE_CLASS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

export const STATUS_CLASS = {
  PENDING: 'pending',
  WAIT_START: 'wait_start',
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  FINISHED: 'finished',
  REJECTED: 'rejected',
  DELETED: 'deleted',
};

export const STATUS_TYPE_CLASS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  DEACTIVE: 'deactive'
}
