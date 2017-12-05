const Mock = require('mockjs');
const svgImage = require('./extends/image');

const preset = [ '@prizeType' ];

const presetData = {
  prizeType: [ 'VIRTUAL', 'ENTITY', 'UNKNOW' ],
};

/* eslint no-bitwise: 0 */
module.exports = function(data) {

  // 敷写 @image 占位符方法
  Mock.Random.extend(svgImage);

  const mockedData = Mock.mock(data);
  return cloneObject(mockedData);
};

// /////////////////////

function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const temp = obj.constructor();
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      temp[key] = value(obj[key]);
    } else {
      temp[key] = cloneObject(obj[key]);
    }
  }

  return temp;
}

function value(str) {
  const reg = /^@/;
  const index = preset.indexOf(str);

  if (reg.test(str) && index > -1) {
    const dataKey = preset[index].replace('@', '');
    const random = Math.random() * presetData[dataKey].length >> 0;
    return presetData[dataKey][random];
  }

  if (!reg.test(str) && str.indexOf('|') > -1) {
    const arr = str.split('|');
    const randomIndex = Math.random() * arr.length >> 0;
    return arr[randomIndex];
  }

  return str;
}
