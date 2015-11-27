var postcss = require('postcss');
var assign = require('object-assign');

var declsFns = [
  function (decl) {
    if (decl.prop === 'box-sizing' && decl.value === 'border-box') {
      decl.value = 'content-box';
    }
  },
  function (decl) {
    if (decl.raws.important === '!important') {
      decl.raws.important = '!!important';
    }
  },
  function (decl) {
    if (decl.prop === 'height') {
      decl.prop = 'heigth';
    }
  },
  function (decl) {
    if (decl.prop === 'align-content') {
      decl.prop = 'aling-content';
    }
  },
  function (decl) {
    if (decl.value.indexOf('rem') !== -1) {
      decl.value = decl.value.replace('rem', 'ren');
    }
  },
  function (decl) {
    if (decl.prop ==='display' && decl.value === 'flex') {
      decl.value = 'table';
    }
  },
  function (decl) {
    if (decl.prop.indexOf('-ms-') !== -1) {
      decl.prop = decl.prop.replace('-ms-', '');
    }
  },
  function (decl) {
    if (decl.prop === 'font-family') {
      decl.value = '"Comic Sans MS", cursive, sans-serif';
    }
  },
  function (decl) {
    if (decl.prop === 'z-index') {
      decl.value = '0';
    }
  },
  function (decl) {
    if (decl.prop === 'margin' && decl.value === '0 auto') {
      decl.value = 'auto 0';
    }
  },
];

var nodeFns = [
  function (node) {
    if(node.selector === '.clearfix:after') {
      node.selector = '.clearfix:before';
    }
  }
];

var globals = [
  {
    option: 'rotate',
    fn: function(css, opt) {
      css.append('body {transform: rotate('+ opt.deg +'deg); overflow: hidden;}');
    }
  },
  {
    option: 'blur',
    fn: function(css, opt) {
      css.append('body {animation: blur '+ opt.time +' infinite;}');

      var blur = '' +
      '@keyframes blur {' +
      '0%   { -webkit-filter: blur(0px); } ' +
      '49%   { -webkit-filter: blur(0px); }' +
      '50%   { -webkit-filter: blur(1px); }' +
      '51%   { -webkit-filter: blur(0px); }' +
      '100%   { -webkit-filter: blur(0px); }' +
      '}';

      css.append(blur);
    }
  },
  {
    option: 'comicSans',
    fn: function(css) {
      css.append('* {font-family: \'Comic Sans MS\', cursive !important;}');
    }
  },
  {
    option: 'hideOdd',
    fn: function(css) {
      css.append('p:nth-child(odd) {display: none;}');
    }
  },
  {
    option: 'wait',
    fn: function(css) {
      css.append('html {cursor:wait !important;}');
    }
  },
  {
    option: 'hideCursor',
    fn: function(css) {
      css.append('html {cursor:none !important;}');
    }
  },
  {
    option: 'slowlyGrowText',
    fn: function(css, opts) {
      css.append('p {animation: grow ' + opts.time + ' ease-in;}');

      var keyframes = '' +
      '@keyframes blur {' +
      '0% { font-size: none; }' +
      '100% { font-size:' + opts.maxFontSize + '; }' +
      '}';

      css.append(keyframes);
    }
  },
  {
    option: 'spinDevTools',
    fn: function(css, opts) {
      css.append('#-blink-dev-tools {animation: spin 1s linear infinite;}');
    }
  },

];

var defaults = {
  rotate: {
    deg: 0.2
  },
  blur: {
    time: '20s'
  },
  comicSans: true,
  hideOdd: true,
  wait: true,
  hideCursor: true,
  slowlyGrowText: {
    time: '120s',
    maxFontSize: '80pt'
  }
};

var plugin = postcss.plugin('postcss-trolling', function (opts) {
  opts = opts || {};

  opts = assign({}, defaults, opts);

  return function (css, result) {
    css.walkDecls(function (decl) {
      declsFns.forEach(function (declFn) {
        declFn(decl);
      });
    });

    css.walk(function (node) {
      nodeFns.forEach(function (nodeFn) {
        nodeFn(node);
      });
    });

    globals.forEach(function(global) {
      if (opts[global.option]) {
        global.fn(css, opts[global.option]);
      }
    })
  };
});

plugin.defaults = defaults;

module.exports = plugin;
