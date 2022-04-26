# CSS Utilities

This project starts with some lightweight utility classes.

These classes are documented both inside their source files and here.

## Overview

`src/global.css` - the global CSS entrypoint; imports the following:

[#](#reset) `src/styles/reset.css` - normalise browser styles and fix bad defaults<br>
[#](#tags) `src/styles/tags.css` - tweak defaults for ugly unstyled HTML tags<br>
[#](#typography) `src/styles/typography.css` - type scale and related utility classes<br>
[#](#spacing-defaults) `src/styles/spacing-defaults.css` - spacing defaults<br>
[#](#spacing-scale) `src/styles/spacing-scale.css` - spacing scale

## Reset

Similar to common normalise stylesheets, but with one major difference:

> `*, *::before, *::after { flex-shrink: 0 }`
>
> This changes flexbox's default behaviour. Many people expect flex-shrink's default value to be `0` (because flex-grow's default is), but in fact it is `1`, which often causes bugs with flex layouts to squash.
>
> This makes it more obvious to the dev when something is broken and makes it easier to debug broken flexbox code.

## Tags

This file changes/normalises the default styling of semantic HTML tags.

That's all.

## Typography

This file changes the default styling of text block HTML tags.

It also provides a type scale:

```
D  | Display         | L,M,S,XS
H  | Heading         | [h1:XXL],[h2:XL],[h3:L],[h4:M],[h5:S],[h6:XS]
P  | Paragraph       | L,[p:M],S,XS
PL | Paragraph Label | L,M,S,XS
C  | Caption         | M
```

> **Example**
>
> All of these are equivalent
>
> - `<p>Paragraph text</p>`
> - `<div className="P-M">Paragraph text</div>`
> - `<div className="P">Paragraph text</div>` (no size implies medium)
>
> Paragraph text

Extra utility classes:

> Use this instead of `font-weight: bold`.
> (CSS thinks bold = 700, but bold looks better at 600.)
>
> `.b, b, strong { font-weight: 600 }`

> By default, this type scale doesn't affect text colour.
> To force-add the default colour for a tag, add the `.c` class.
>
> `<span style={{ color: "red" }}>A <span className="C">Caption</span></span>`
>
> <div><span style="color:red">A <span class="C">Caption</span></span></div>
>
> `<span style={{ color: "red" }}>A <span className="C c">Caption</span></span>`
>
> <div><span style="color:red">A <span class="C c">Caption</span></span></div>

## Spacing defaults

This contains rules that ensure that plain HTML tags have sensible margins and appear as you'd hope they would.

To achieve this, though, a blanket rule was needed:

```scss
block-elements-except div {
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
}
```

This can sometimes interfere with the layout of 3rd-party libraries, so:

- `div` does not change the margins of its children
- ...but `div.rm-margin` does

This can become annoying, but it's still well worth the trade-off.

## Spacing scale

### Utility scalar spacing (margin + padding) classes

**Examples:**

- `.p0` = `padding: 0`
- `.mh1` = `madding-left: 4px; madding-right: 4px`

**Modifiers:**

- `p` = padding
- `m` = margin

**Direction:**

- `<none>` = all
- `h` = horizontal
- `v` = vertical
- `l` = left
- `r` = right
- `t` = top
- `b` = bottom

**Size (in px)**

- `0` = 0px
- `4` = 4px
- `8` = 8px
- `12` = 12px
- `16` = 16px
- `24` = 24px
- `32` = 32px
- `48` = 48px
- `64` = 64px
- `x` = responsive (x increases at larger breakpoints)

> **Example**
>
> ```jsx
> <div className="p24" style={{ border: "1px solid black" }}>
>   This div has padding
> </div>
> ```
>
> <div class="p24" style="border:1px solid black">
>   This div has padding
> </div>
>
> ```jsx
> <div className="ph24" style={{ border: "1px solid black" }}>
>   This div has horizontal padding
> </div>
> ```
>
> <div class="ph24" style="border:1px solid black">
>   This div has horizontal padding
> </div>

### Other spacing utility classes

When creating your own structure and layouts, you might need to create your own margins and paddings.

To keep things consistent, plenty of utility classes have been added for this purpose.

> Used to provide the max-width for the copy you're reading right now:
> <br>`.mw-copy { max-width: 600px }`

> Might be used for the max-width of the whole website layout:
> <br>`.mw-screen { max-width: 1400px }`
>
> e.g. the BBC News website
> <br>![BBC News website max width visualisation](bbc-example.png)

> Horizontally centre a div:
> <br>`.mh-auto { margin-left: auto; margin-right: auto }`
