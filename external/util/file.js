import { isObject } from "lodash"
import { DEFAULT_AVATAR, ERROR_CODE } from "../constants/constants"
import { errorMessage } from "./error"

export const GetFileData = (shareHost, file) => {
  return {
    name: file?.name || '',
    large: shareHost + "/lg/" + file?.large || '',
    medium: shareHost + "/md/" + file?.medium || '',
    small: shareHost + "/sm/" + file?.small || '',
  }
}

export const GetFileDocumentData = (shareHost, file) => {
  return {
    name: file,
    url: shareHost + "/file/" + file
  }
}

function trim(str, strSplit) {
  return str.replace(strSplit, '');
}

export const updateLinkImageByAdmin = (data, strSplit) => ({
      name: data?.name || DEFAULT_AVATAR.name,
      large: trim(data?.large || DEFAULT_AVATAR.large, `${strSplit}/lg/`),
      medium: trim(data?.medium || DEFAULT_AVATAR.medium, `${strSplit}/md/`),
      small: trim(data?.small || DEFAULT_AVATAR.small, `${strSplit}/sm/`),
  });
