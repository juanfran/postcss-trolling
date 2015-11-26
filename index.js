var postcss = require('postcss');

module.exports = postcss.plugin('postcss-trolling', function (opts) {
  opts = opts || {};

  return function (css, result) {
    css.walkDecls(function (decl) {
      if (decl.prop === 'box-sizing' && decl.value === 'border-box') {
        decl.value = 'content-box';
      }

      if (decl.raws.important === '!important') {
        decl.raws.important = '!!important';
      }

      if (decl.prop === 'height') {
        decl.prop = 'heigth';
      }
    });

    css.walk(function (node) {
      if(node.selector === '.clearfix:after') {
        node.selector = '.clearfix:before';
      }
    });
  };
});
