/* eslint no-eval: 0 */
var decomment = require('decomment');
var chalk = require('chalk');
var handleData = require('./handle');

/**
 * md文件内容
 * @param  {String} str 文件路径
 * @return {Object}  parse 后的js obj, 数据机构和dataTpl一样
 */
module.exports = function (str) {
  var dataTpl = {
    title: 'Api title',
    request: {},
    response: {
      delay: 0,
      body: {}
    }
  };
  var regMatch = /```\s*(js|javascript)([^`]*?)```/gi;
  var regReplace = /(```)\s*(js|javascript)|```/gi;
  var matchResult = str.match(regMatch);
  if (!matchResult) {
    return dataTpl;
  }

  var arr = matchResult.map(function (item) {
    item = item.replace(regReplace, '');
    return item;
  });

  dataTpl.title = getTitle(str);

  arr.forEach(function (item) {
    var reqObj = void 0,
        resObj = void 0,
        reqData = void 0,
        resData = void 0;
    if (item.indexOf('<request>') > -1) {
      try {
        reqObj = decomment(item);
        reqData = eval('(' + reqObj + ')');
        dataTpl.request.body = reqData;
      } catch (err) {
        var msg = '请检查该接口 Request 数据结构是否正确';
        logError(err);
        logError(msg);
        dataTpl.req = {};
      }
    }

    if (item.indexOf('<response=200>') > -1) {
      dataTpl.response.delay = getDaly(item);
      try {
        resObj = decomment(item);
        resData = eval('(' + resObj + ')');
        dataTpl.response.body = handleData(resData);
      } catch (err) {
        var _msg = '请检查该接口 Response 数据结构是否正确';
        logError(err);
        logError(_msg);

        dataTpl.response.body = {
          success: false,
          code: 'MOC_DATA_STRUCTRUE_ERROR',
          data: _msg
        };
      }
    }
  });

  return dataTpl;
};

function getTitle(str) {
  var arr = str.split('\n');
  var find = arr.find(function (item) {
    return item.indexOf('__Desc__') > -1;
  });

  if (find) {
    var _arr = find.split(':');
    if (_arr.length < 1) return;
    return _arr[1].replace(/^\s*/, '');
  }
  if (arr[2].length > 0) {
    return arr[2];
  }
  return arr[1];
}

function getDaly(str) {
  var regDelay = /<delay=(.*)>/;
  var result = regDelay.exec(str);
  if (result) {
    return parseInt(result[1], 10);
  }

  return 0;
}

function logError(msg) {
  console.log(chalk.red(msg));
}