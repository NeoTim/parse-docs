var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Mock = require('mockjs');
var svgImage = require('./extends/image');

var preset = ['@prizeType'];

var presetData = {
  prizeType: ['VIRTUAL', 'ENTITY', 'UNKNOW']
};

/* eslint no-bitwise: 0 */
module.exports = function (data) {

  // 敷写 @image 占位符方法
  Mock.Random.extend(svgImage);

  var mockedData = Mock.mock(data);
  return cloneObject(mockedData);
};

// /////////////////////

function cloneObject(obj) {
  if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    return obj;
  }

  var temp = obj.constructor();
  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      temp[key] = value(obj[key]);
    } else {
      temp[key] = cloneObject(obj[key]);
    }
  }

  return temp;
}

function value(str) {
  var reg = /^@/;
  var index = preset.indexOf(str);

  if (reg.test(str) && index > -1) {
    var dataKey = preset[index].replace('@', '');
    var random = Math.random() * presetData[dataKey].length >> 0;
    return presetData[dataKey][random];
  }

  if (!reg.test(str) && str.indexOf('|') > -1) {
    var arr = str.split('|');
    var randomIndex = Math.random() * arr.length >> 0;
    return arr[randomIndex];
  }

  return str;
}