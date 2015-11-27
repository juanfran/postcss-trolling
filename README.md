# PostCSS Trolling [![Build Status][ci-img]][ci]

[PostCSS] plugin Postcss plugin.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/juanfran/postcss-trolling.svg
[ci]:      https://travis-ci.org/juanfran/postcss-trolling

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-trolling') ])
```

See [PostCSS] docs for examples for your environment.


Based on https://github.com/wesbos/aprilFools.css


### Options

#### rotate

Rotate the website

- Default:

```js
trolling({
  rotate: {
    deg: 0.2
  }
});
```

#### blur

Blur the website for a split second

- Default:

```js
trolling({
  rotate: {
    time: '20s'
  }
});
```

#### comicSans

The best font ever

- Default:

```js
trolling({
  comicSans: true
});
```

#### hideOdd

Hide every odd paragraph element

- Default:

```js
trolling({
  hideOdd: true
});
```

#### wait

Permanent cursor wait

- Default:

```js
trolling({
  wait: true
});
```

#### hideCursor

Hide cursor

- Default:

```js
trolling({
  hideCursor: true
});
```

#### slowlyGrowText

Slowly grow text

- Default:

```js
trolling({
  slowlyGrowText: {
    time: '120s',
    maxFontSize: '80pt'
  }
});
```
