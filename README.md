# PostCSS Trolling [![Build Status][ci-img]][ci]

[PostCSS] plugin to increase the productivity of your coworkers.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/juanfran/postcss-trolling.svg
[ci]:      https://travis-ci.org/juanfran/postcss-trolling

## Usage

```js
postcss([ require('postcss-trolling') ])
```

See [PostCSS] docs for examples for your environment.

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

#### blurBlink

Blur the website for a split second

- Default:

```js
trolling({
  blurBlink: {
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

#### blur

Blur everything!

- Default:

```js
trolling({
  blur: {
    time: '120s',
    blur: '0.8px'
  }
});
```

#### ren

rem is a band of course

```css
.selector {
   width: 10rem;
}

// -->

.selector {
  width: 10ren;
}
```

- Default:

```js
trolling({
  ren: true
});
```

#### ms

microsoft doesn't have a browser...

```css
.selector {
   -ms-flex: 1;
}

// -->

.selector {
  flex: 1;
}
```
- Default:

```js
trolling({
  ms: true
});
```

#### heigth

it's heigth of course

```css
.selector {
   height: 10px;
}

// -->

.selector {
  heigth: 10px;
}
```

- Default:

```js
trolling({
  heigth: true
});
```

#### aling

aling... align... aggg

```css
.selector {
   align-content: center;
}

// -->

.selector {
  aling-content: center;
}
```
- Default:

```js
trolling({
  aling: true
});
```

#### clearfix

fix clearfix

```css
.clearfix:after { }

// -->

.clearfix:before { }

```

- Default:

```js
trolling({
  clearfix: true
});
```

#### veryImportant

Makes everything very important...

```css
.selector {
  float: left !important;
}

// -->

.selector {
  float: left !!important;
}
```

- Default:

```js
trolling({
  veryImportant: true
});
```

#### zIndex

```css
.selector {
  z-index: 99999;
}

// -->

.selector {
  z-index: 0;
}
```
- Default:

```js
trolling({
  zIndex: true
});
```

### All defaults

```js
trolling({
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
});

// disabled
trolling({
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
})
```

### Thanks

This plugin is based on [aprilFools.css](https://github.com/wesbos/aprilFools.css)
