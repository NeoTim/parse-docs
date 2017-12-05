/* eslint no-eval: 0 */
const decomment = require('decomment');
const chalk = require('chalk');
const handleData = require('./handle');

/**
 * md文件内容
 * @param  {String} str 文件路径
 * @return {Object}  parse 后的js obj, 数据机构和dataTpl一样
 */
module.exports = function(str) {
  const dataTpl = {
    request: {
    },
    response: {
      delay: 0,
      body: {},
    },
  };
  const regMatch = /```\s*(js|javascript)([^`]*?)```/gi;
  const regReplace = /(```)\s*(js|javascript)|```/gi;

  const arr = str.match(regMatch).map(function(item) {
    item = item.replace(regReplace, '');
    return item;
  });

  arr.forEach(function(item) {
    let reqObj,
      resObj,
      reqData,
      resData;
    if (item.indexOf('<request>') > -1) {
      try {
        reqObj = decomment(item);
        reqData = eval(`(${reqObj})`);
        dataTpl.request.body = reqData;
      } catch (err) {
        const msg = '请检查该接口 Request 数据结构是否正确';
        logError(err);
        logError(msg);
        dataTpl.req = {};
      }
    }

    if (item.indexOf('<response=200>') > -1) {
      dataTpl.response.delay = getDaly(item);
      try {
        resObj = decomment(item);
        resData = eval(`(${resObj})`);
        dataTpl.response.body = handleData(resData);
      } catch (err) {
        const msg = '请检查该接口 Response 数据结构是否正确';
        logError(err);
        logError(msg);

        dataTpl.response.body = {
          success: false,
          code: 'MOC_DATA_STRUCTRUE_ERROR',
          data: msg,
        };
      }
    }
  });


  return dataTpl;
};

function getDaly(str) {
  const regDelay = /<delay=(.*)>/;
  const result = regDelay.exec(str);
  if (result) {
    return parseInt(result[1], 10);
  }

  return 0;
}

function logError(msg) {
  console.log(chalk.red(msg));
}
