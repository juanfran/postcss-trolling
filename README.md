# PostCSS Trolling [![Build Status][ci-img]][ci]

[PostCSS] plugin to increase the productivity of your co-workers :trollface:.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/juanfran/postcss-trolling.svg
[ci]:      https://travis-ci.org/juanfran/postcss-trolling

## Usage

```js
postcss([ require('postcss-trolling') ])
```

See [PostCSS] docs for examples for your environment.

### Options

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
```css
/* output */
body {
    animation: blurBlink 20s infinite;
}
@keyframes blurBlink {
    0% {
        filter: blur(0px)
    }
    49% {
        filter: blur(0px)
    }
    50% {
        filter: blur(1px)
    }
    51% {
        filter: blur(0px)
    }
    100% {
        filter: blur(0px)
    }
}
```

![blink](https://cloud.githubusercontent.com/assets/905195/11480397/8d5ada72-9797-11e5-8332-223fb9161f0f.gif)


#### comicSans

The best font ever for the web

- Default:

```js
trolling({
  comicSans: true
});
```
```css
/* output */
* {
    font-family: 'Comic Sans MS', cursive !important;
}
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
```css
/* output */
p {
    animation: slowlyGrowText 120s ease-in;
}
@keyframes slowlyGrowText {
    0% {
        font-size: none;
    }
    100% { 
        font-size: 80pt;
    }
}
```

![text-grow](https://cloud.githubusercontent.com/assets/905195/11480858/1bef40c8-979a-11e5-93c6-c44a4eb3c6ce.gif)

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

```css
/* output */
body {
    transform: rotate(0.2deg);
    overflow: hidden;
}
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
```css
/* output */
body {
    animation: blur 120s infinite;
}
@keyframes blur {
    0% {
        filter: blur(0px);
    }
    100% {
        filter: blur(0.8px);
    }
}
```

![blur](https://cloud.githubusercontent.com/assets/905195/11480326/374f9334-9797-11e5-87b9-8c85d51c1ffc.gif)

#### hideOdd

Hide every odd paragraph element

- Default:

```js
trolling({
  hideOdd: true
});
```
```css
/* output */
p:nth-child(odd) {
    display: none;
}
```

#### wait

Permanent cursor wait

- Default:

```js
trolling({
  wait: true
});
```
```css
/* output */
html {
    cursor: wait !important;
}
```

#### hideCursor

Hide cursor

- Default:

```js
trolling({
  hideCursor: true
});
```
```css
/* output */
html {
    cursor: none !important;
}
```

#### ren

rem is a band of course

```css
.selector {
   width: 10rem;
}

// output -->

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

// output -->

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

Fix typo heigth

```css
.selector {
   height: 10px;
}

// output -->

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

aling...

```css
.selector {
   align-content: center;
}

// output -->

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

// output -->

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

// output -->

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

// output -->

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
