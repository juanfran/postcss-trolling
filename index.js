var postcss = require('postcss');
var assign = require('object-assign');

var nodeFns = [
  {
    option: 'clearfix',
    condition: function (node) {
      return node.selector === '.clearfix:after';
    },
    fn: function (node) {
      node.selector = '.clearfix:before';
    }
  }
];

var declsFns = [
  {
    option: 'heigth',
    condition: function (decl) {
      return decl.prop === 'height';
    },
    fn: function (decl) {
      decl.prop = 'heigth';
    }
  },
  {
    option: 'aling',
    condition: function (decl) {
      return decl.prop === 'align-content';
    },
    fn: function (decl) {
      decl.prop = 'aling-content';
    }
  },
  {
    option: 'veryImportant',
    condition: function (decl) {
      return decl.important;
    },
    fn: function (decl) {
      decl.raws.important = '!!important';
    }
  },
  {
    option: 'zIndex',
    condition: function (decl) {
      return decl.prop === 'z-index';
    },
    fn: function (decl) {
      decl.value = '0';
    }
  },
  {
    option: 'ms',
    condition: function (decl) {
      return decl.prop.indexOf('-ms-') !== -1;
    },
    fn: function (decl) {
      decl.prop = decl.prop.replace('-ms-', '');
    }
  },
  {
    option: 'ren',
    condition: function (decl) {
      return decl.value.indexOf('rem') !== -1;
    },
    fn: function (decl) {
      decl.value = decl.value.replace('rem', 'ren');
    }
  }
];

var globals = [
  {
    option: 'rotate',
    fn: function (css, opt) {
      css.append('body {transform: rotate(' + opt.deg + 'deg); overflow: hidden;}');
    }
  },
  {
    option: 'blurBlink',
    fn: function (css, opt) {
      css.append('body {animation: blurBlink ' + opt.time + ' infinite;}');

      var blur = '' +
      '@keyframes blurBlink {' +
      '0%   { filter: blur(0px); } ' +
      '49%   { filter: blur(0px); }' +
      '50%   { filter: blur(1px); }' +
      '51%   { filter: blur(0px); }' +
      '100%   { filter: blur(0px); }' +
      '}';

      css.append(blur);
    }
  },
  {
    option: 'comicSans',
    fn: function (css) {
      css.append('* {font-family: \'Comic Sans MS\', cursive !important;}');
    }
  },
  {
    option: 'hideOdd',
    fn: function (css) {
      css.append('p:nth-child(odd) {display: none;}');
    }
  },
  {
    option: 'wait',
    fn: function (css) {
      css.append('html {cursor:wait !important;}');
    }
  },
  {
    option: 'hideCursor',
    fn: function (css) {
      css.append('html {cursor:none !important;}');
    }
  },
  {
    option: 'slowlyGrowText',
    fn: function (css, opts) {
      css.append('p {animation: slowlyGrowText ' + opts.time + ' ease-in;}');

      var keyframes = '' +
      '@keyframes slowlyGrowText {' +
      '0% { font-size: none; }' +
      '100% { font-size:' + opts.maxFontSize + '; }' +
      '}';

      css.append(keyframes);
    }
  },
  {
    option: 'spinDevTools',
    fn: function (css) {
      css.append('#-blink-dev-tools {animation: spin 1s linear infinite;}');
    }
  },
  {
    option: 'blur',
    fn: function (css, opt) {
      css.append('body {animation: blur ' + opt.time + ' infinite;}');

      var blur = '' +
      '@keyframes blur {' +
      '0%   { filter: blur(0px); } ' +
      '100%   { filter: blur(' + opt.blur + '); }' +
      '}';

      css.append(blur);
    }
  }
];

var defaults = {
  aling: true,
  blur: {
    time: '120s',
    blur: '0.8px'
  },
  blurBlink: {
    time: '20s'
  },
  clearfix: true,
  comicSans: true,
  heigth: true,
  hideCursor: true,
  hideOdd: true,
  ms: true,
  ren: true,
  rotate: {
    deg: 0.2
  },
  slowlyGrowText: {
    time: '120s',
    maxFontSize: '80pt'
  },
  veryImportant: true,
  wait: true,
  zIndex: true
};

var plugin = postcss.plugin('postcss-trolling', function (opts) {
  opts = opts || {};

  opts = assign({}, defaults, opts);

  return function (css) {
    css.walkDecls(function (decl) {
      declsFns.forEach(function (declFn) {
        if (opts[declFn.option] && declFn.condition(decl)) {
          declFn.fn(decl, opts[declFn.option]);
        }
      });
    });

    css.walk(function (node) {
      nodeFns.forEach(function (nodeFn) {
        if (opts[nodeFn.option] && nodeFn.condition(node)) {
          nodeFn.fn(node, opts[nodeFn.option]);
        }
      });
    });

    globals.forEach(function (global) {
      if (opts[global.option]) {
        global.fn(css, opts[global.option]);
      }
    });
  };
});

plugin.defaults = defaults;

module.exports = plugin;
