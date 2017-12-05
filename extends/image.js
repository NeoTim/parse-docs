const DEFAULT_WIDTH = '150';

module.exports = {
   /**
    *
    * 使用： @image
    * 兼容写法：
    * - @image()
    * - @image(123)
    * - @image('123')
    * - @image('123x456')
    * @param  {Number}      size 尺寸
    * @return {String}      base64 图片
    */
  image(size) {
    let width = DEFAULT_WIDTH;
    let height = DEFAULT_WIDTH;
    let match = [];

    //  TODO
    /* eslint no-cond-assign: 0 */
    // 兼容各种写法，233 为默认值
    if (match = String(size).match(/^(\d+)(?:x(\d+))?$/)) {
      width = match[1] || DEFAULT_WIDTH;
      height = match[2] || width;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="width: 100%;height: 100%;margin:auto;background-color:#eee;" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <text x="50%" y="50%" dy=".3em" fill="#aaa" style="text-anchor:middle;font:bold 15pt arial,sans-serif">${width} x ${height}</text>
      </svg>
      `.trim();

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  },
};
