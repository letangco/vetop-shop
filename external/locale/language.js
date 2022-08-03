import { LANG_VI } from '../constants/constants';

const en = require('./en/en.json');
const vi = require('./vi/vi.json');

export default class Language {
  constructor() {
    this.vi = vi;
    this.en = en;
  }

  getErrorMessage(key) {
    return key !== LANG_VI ? this.vi.error[key] : this.en.error[key];
  }

  getMessage(key) {
    return key !== LANG_VI ? this.vi.message[key] : this.en.message[key];
  }
}
