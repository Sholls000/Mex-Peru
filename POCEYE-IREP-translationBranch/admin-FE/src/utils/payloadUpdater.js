export default class PayloadUpdater {
  constructor({ payload, setPayload }) {
    this.payload = payload;
    this.setPayload = setPayload;
  }

  update = (properties, values, callback) => {
    const _postData = { ...this.payload };
    if (!Array.isArray(properties)) {
      properties = [properties];
      values = [values];
    }

    for (let i = 0; i < properties.length; i++) {
      _postData[properties[i]] = values[i];
    }

    this.setPayload(_postData);
    // console.log(_postData);
    if (callback) {
      callback(_postData);
    }

    return _postData;
  };
}
