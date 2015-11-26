import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

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
