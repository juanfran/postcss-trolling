import postcss from 'postcss';
import test    from 'ava';

import assign from 'object-assign';

import plugin from './';

var defaults = plugin.defaults;

var allDisabled = {
  aling: false,
  blur: false,
  blurBlink: false,
  clearfix: false,
  comicSans: false,
  heigth: false,
  hideCursor: false,
  hideOdd: false,
  ms: false,
  ren: false,
  rotate: false,
  slowlyGrowText: false,
  verImportant: false,
  wait: false,
  zIndex: false
};

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
  .then( result => {
    t.same(result.css, output);
    t.same(result.warnings().length, 0);
  });
}

test('clearfix after -> before', t => {
  var input = '.clearfix:after { }';
  var output = '.clearfix:before { }';

  var opts = assign({}, allDisabled, {
    clearfix: true
  });

  return run(t, input, output, opts);
});

test('height -> heigth', t => {
  var input = '.a { height: 100%; }';
  var output = '.a { heigth: 100%; }';

  var opts = assign({}, allDisabled, {
    heigth: true
  });

  return run(t, input, output, opts);
});

test('align-content -> aling-content', t => {
  var input = '.a { align-content: center; }';
  var output = '.a { aling-content: center; }';

  var opts = assign({}, allDisabled, {
    aling: true
  });

  return run(t, input, output, opts);
});

test('rem -> ren', t => {
  var input = '.a { width: 15rem; }';
  var output = '.a { width: 15ren; }';

  var opts = assign({}, allDisabled, {
    ren: true
  });

  return run(t, input, output, opts);
});

test('remove ms', t => {
  var input = '.a { -ms-flex: 1; }';
  var output = '.a { flex: 1; }';

  var opts = assign({}, allDisabled, {
    ms: true
  });

  return run(t, input, output, opts);
});

test('z-index: 0', t => {
  var input = '.a { z-index: 9999; }';
  var output = '.a { z-index: 0; }';

  var opts = assign({}, allDisabled, {
    zIndex: defaults.zIndex
  });

  return run(t, input, output, opts);
});

test('!import -> !!important', t => {
  var input = '.a { width: 100%!important; }';
  var output = '.a { width: 100%!!important; }';

  var opts = assign({}, allDisabled, {
    veryImportant: defaults.veryImportant
  });

  return run(t, input, output, opts);
});

test('blur', t => {
  var input = '';
  var output = 'body {\n    animation: blur 120s infinite\n}\n@keyframes blur {\n    0% {\n        filter: blur(0px)\n    }\n    100% {\n        filter: blur(0.8px)\n    }\n}';

  var opts = assign({}, allDisabled, {
    blur: defaults.blur
  });

  return run(t, input, output, opts);
});

test('slowlyGrowText', t => {
  var input = '';
  var output = 'p {\n    animation: slowlyGrowText 120s ease-in\n}\n@keyframes slowlyGrowText {\n    0% {\n        font-size: none\n    }\n    100% {\n        font-size: 80pt\n    }\n}';

  var opts = assign({}, allDisabled, {
    slowlyGrowText: defaults.slowlyGrowText
  });

  return run(t, input, output, opts);
});

test('hide cursor', t => {
  var input = '';
  var output = 'html {\n    cursor: none !important\n}';

  var opts = assign({}, allDisabled, {
    hideCursor: true
  });

  return run(t, input, output, opts);
});

test('permanent wait', t => {
  var input = '';
  var output = 'html {\n    cursor: wait !important\n}';

  var opts = assign({}, allDisabled, {
    wait: true
  });

  return run(t, input, output, opts);
});


test('display: none; odd <p>', t => {
  var input = '';
  var output = 'p:nth-child(odd) {\n    display: none\n}';

  var opts = assign({}, allDisabled, {
    hideOdd: true
  });

  return run(t, input, output, opts);
});

test('font-family comic-sans', t => {
  var input = '';
  var output = '* {\n    font-family: \'Comic Sans MS\', cursive !important\n}';

  var opts = assign({}, allDisabled, {
    comicSans: true
  });

  return run(t, input, output, opts);
});

test('rotate', t => {
  var input = '';
  var output = 'body {\n    transform: rotate(0.2deg);\n    overflow: hidden\n}';

  var opts = assign({}, allDisabled, {
    rotate: defaults.rotate
  });

  return run(t, input, output, opts);
});

test('blurBlink', t => {
  var input = '';
  var output = 'body {\n    animation: blurBlink 20s infinite\n}\n@keyframes blurBlink {\n    0% {\n        filter: blur(0px)\n    }\n    49% {\n        filter: blur(0px)\n    }\n    50% {\n        filter: blur(1px)\n    }\n    51% {\n        filter: blur(0px)\n    }\n    100% {\n        filter: blur(0px)\n    }\n}';

  var opts = assign({}, allDisabled, {
    blurBlink: defaults.blurBlink
  });

  return run(t, input, output, opts);
});
