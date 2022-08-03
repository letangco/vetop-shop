export default class ArrayHelper {
  constructor() {
  }
  /**
   * Check properties by value
   * @param array
   * @param prop
   * @param value
   * */

  CheckPropByValue (array, prop, value) {
    let rs = false;

    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      if (item[prop] === value) {
        rs = true;
        break;
      }
    }

    return rs;
  };
  /**
   * Find Object have properties by value
   * @param array
   * @param prop
   * @param value
   * */
  FindIndexArrayObject = function (array, prop, value) {
    let rs = null;

    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      if (item[prop] === value) {
        rs = {
          index: i,
          object: array[i]
        };
        break;
      }
    }

    return rs;
  };
  /**
   * Find Object have multi properties by value
   * @param array
   * @param props
   * */
  FindIndexArrayObjectMultiProp (array, props) {
    let rs = null;
    let keys = Object.keys(props);

    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      let flag = false;

      for (let j = 0; j < keys.length; j++) {
        let key = keys[j];

        if (item[key].toString() === props[key].toString()) {
          flag = true;
        }
        flag = false
      }

      if (flag) {
        rs = {
          index: i,
          object: array[i]
        };
        break;
      }
    }

    return rs;
  };
  /**
   * Sort Array Object
   * */
  SortArrayObjectByProp (array, properties, type) {
    return array.sort(function (a, b) {
      if (!properties in a) {
        a[properties] = 0;
      }

      if (!properties in b) {
        b[properties] = 0;
      }

      if (type === 'desc') {
        return b[properties] - a[properties];
      }

      return a[properties] - b[properties];
    });
  };
  /**
   * Check Value Unique Array
   * */
  UniqueValuesInArray = function (array) {
    return array.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  };
}
