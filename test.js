import postcss from 'postcss';
import test    from 'ava';

import assign from 'object-assign';

import plugin from './';

var defaults = plugin.defaults;

var allDisabled = {
  rotate: false,
  blur: false,
  comicSans: false,
  hideOdd: false,
  wait: false,
  hideCursor: false,
  slowlyGrowText: false
};

function run(t, input, output, opts = { }) {
  return postcss([ plugin(opts) ]).process(input)
  .then( result => {
    t.same(result.css, output);
    t.same(result.warnings().length, 0);
  });
}

test('box-sizing boder-box -> content-box', t => {
  var input = 'a { box-sizing: border-box; }';
  var output = 'a { box-sizing: content-box; }';
  return run(t, input, output, { });
});

test('clearfix after -> before', t => {
  var input = '.clearfix:after { }';
  var output = '.clearfix:before { }';
  return run(t, input, output, { });
});

test('!import -> !!important', t => {
  var input = '.a { width: 100%!important; }';
  var output = '.a { width: 100%!!important; }';

  return run(t, input, output, { });
});

test('height -> heigth', t => {
  var input = '.a { height: 100%; }';
  var output = '.a { heigth: 100%; }';

  return run(t, input, output, { });
});

test('align-content -> aling-content', t => {
  var input = '.a { align-content: center; }';
  var output = '.a { aling-content: center; }';

  return run(t, input, output, { });
});

test('rem -> ren', t => {
  var input = '.a { width: 15rem; }';
  var output = '.a { width: 15ren; }';

  return run(t, input, output, { });
});

test('diplay: flex -> display: table', t => {
  var input = '.a { display: flex; }';
  var output = '.a { display: table; }';

  return run(t, input, output, { });
});

test('remove ms', t => {
  var input = '.a { -ms-flex: 1; }';
  var output = '.a { flex: 1; }';

  return run(t, input, output, { });
});

test('z-index: 0', t => {
  var input = '.a { z-index: 9999; }';
  var output = '.a { z-index: 0; }';

  return run(t, input, output, { });
});

test('margin: 0 auto; -> margin: auto 0;', t => {
  var input = '.a { margin: 0 auto; }';
  var output = '.a { margin: auto 0; }';

  return run(t, input, output, { });
});



test.only('slowlyGrowText', t => {
  var input = '';
  var output = 'p {\n    animation: grow 120s ease-in\n}\n@keyframes blur {\n    0% {\n        font-size: none\n    }\n    100% {\n        font-size: 80pt\n    }\n}';

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

test('blur', t => {
  var input = '';
  var output = 'body {\n    animation: blur 20s infinite\n}\n@keyframes blur {\n    0% {\n        -webkit-filter: blur(0px)\n    }\n    49% {\n        -webkit-filter: blur(0px)\n    }\n    50% {\n        -webkit-filter: blur(1px)\n    }\n    51% {\n        -webkit-filter: blur(0px)\n    }\n    100% {\n        -webkit-filter: blur(0px)\n    }\n}';

  var opts = assign({}, allDisabled, {
    blur: defaults.blur
  });

  return run(t, input, output, opts);
});
