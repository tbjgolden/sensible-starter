import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";
import { getPublicURL } from "_/utilities/urls";

const CSSDocumentation = () => {
  return (
    <MenuLayout>
      <h1 className="D">CSS Utilities Guide</h1>
      <p>This project starts with some lightweight utility classes.</p>
      <p>These classes are documented both inside their source files and here.</p>
      <h2 id="overview">Overview</h2>
      <ul>
        <li>
          <Link to="#reset">
            <code>{`src/styles/reset.css`}</code>
            <br />
            normalise browser styles and fix bad defaults
          </Link>
        </li>
        <li>
          <Link to="#tags">
            <code>{`src/styles/tags.css`}</code>
            <br />
            tweak defaults for ugly unstyled HTML tags
          </Link>
        </li>
        <li>
          <Link to="#typography">
            <code>{`src/styles/typography.css`}</code>
            <br />
            type scale and related utility classes
          </Link>
        </li>
        <li>
          <Link to="#spacing-defaults">
            <code>{`src/styles/spacing-defaults.css`}</code>
            <br />
            spacing defaults, default margin tweaks
          </Link>
        </li>
        <li>
          <Link to="#spacing-scale">
            <code>{`src/styles/spacing-scale.css`}</code>
            <br />
            spacing scale with utility classes
          </Link>
        </li>
        <li>
          <Link to="#custom">
            <code>{`src/styles/custom.css`}</code>
            <br />
            your custom styles
          </Link>
        </li>
      </ul>
      <h2 id="reset">Reset</h2>
      <p>Similar to common normalise stylesheets, but with one major difference:</p>
      <blockquote>
        <p>
          <code>{`*, *::before, *::after { flex-shrink: 0 }`}</code>
        </p>
        <p>
          This changes flexbox's default behaviour. Many people expect flex-shrink's
          default value to be <code>{`0`}</code> (because flex-grow's default is), but in
          fact it is <code>{`1`}</code>, which often causes bugs with flex layouts to
          squash.
        </p>
        <p>
          This makes it more obvious to the dev when something is broken and makes it
          easier to debug broken flexbox code.
        </p>
      </blockquote>
      <h2 id="tags">Tags</h2>
      <p>This file changes/normalises the default styling of semantic HTML tags.</p>
      <p>That's all.</p>
      <h2 id="typography">Typography</h2>
      <p>This file changes the default styling of text block HTML tags.</p>
      <p>It also provides a type scale:</p>
      <pre>
        <code>{`D  | Display         | L,M,S,XS
H  | Heading         | [h1:XXL],[h2:XL],[h3:L],[h4:M],[h5:S],[h6:XS]
P  | Paragraph       | L,[p:M],S,XS
PL | Paragraph Label | L,M,S,XS
C  | Caption         | M`}</code>
      </pre>
      <blockquote>
        <p>
          <strong>Example</strong>
        </p>
        <p>All of these are equivalent</p>
        <ul>
          <li>
            <p>
              <code>{`<p>Paragraph text</p>`}</code>
            </p>
          </li>
          <li>
            <p>
              <code>{`<div className="P-M">Paragraph text</div>`}</code>
            </p>
          </li>
          <li>
            <p>
              <code>{`<div className="P">Paragraph text</div>`}</code> (no size implies
              medium)
            </p>
          </li>
        </ul>
        <p>Paragraph text</p>
      </blockquote>
      <p>Extra utility classes:</p>
      <blockquote>
        <p>
          Use this instead of <code>{`font-weight: bold`}</code>. CSS thinks bold = 700,
          but bold looks better at 600 in most sans-serif fonts.
        </p>
        <p>
          <code>{`.b, b, strong { font-weight: 600 }`}</code>
        </p>
      </blockquote>
      <blockquote>
        <p>
          By default, this type scale doesn't affect text colour. To force-add the default
          colour for a tag, add the <code>{`.c`}</code> class.
        </p>
        <p>
          <code>{`<span style={{ color: "red" }}>A <span className="H">Header</span></span>`}</code>
        </p>
        <div>
          <span style={{ color: "red" }}>
            A <span className="H">Header</span>
          </span>
        </div>
        <p>
          <code>{`<span style={{ color: "red" }}>A <span className="H c">Header</span></span>`}</code>
        </p>
        <div>
          <span style={{ color: "red" }}>
            A <span className="H c">Header</span>
          </span>
        </div>
      </blockquote>
      <h2 id="spacing-defaults">Spacing defaults</h2>
      <p>
        This contains rules that ensure that plain HTML tags have sensible margins and
        appear as you'd hope they would.
      </p>
      <p>To achieve this, though, a blanket rule was needed:</p>
      <pre>
        <code>{`block-elements-except div {
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }
}`}</code>
      </pre>
      <p>This can sometimes interfere with the layout of 3rd-party libraries, so:</p>
      <ul>
        <li>
          <p>
            <code>{`div`}</code> does not change the margins of its children
          </p>
        </li>
        <li>
          <p>
            ...but <code>{`div.rm-margin`}</code> does
          </p>
        </li>
      </ul>
      <p>This can become annoying, but it's still well worth the trade-off.</p>
      <h2 id="spacing-scale">Spacing scale</h2>
      <h3 id="utility-scalar-spacing-margin-padding-classes">
        Utility scalar spacing (margin + padding) classes
      </h3>
      <p>
        <strong>Examples:</strong>
      </p>
      <ul>
        <li>
          <p>
            <code>{`.p0`}</code> = <code>{`padding: 0`}</code>
          </p>
        </li>
        <li>
          <p>
            <code>{`.mh1`}</code> = <code>{`madding-left: 4px; madding-right: 4px`}</code>
          </p>
        </li>
      </ul>
      <p>
        <strong>Modifiers:</strong>
      </p>
      <ul>
        <li>
          <p>
            <code>{`p`}</code> = padding
          </p>
        </li>
        <li>
          <p>
            <code>{`m`}</code> = margin
          </p>
        </li>
      </ul>
      <p>
        <strong>Direction:</strong>
      </p>
      <ul>
        <li>
          <p>
            <code>{`<none>`}</code> = all
          </p>
        </li>
        <li>
          <p>
            <code>{`h`}</code> = horizontal
          </p>
        </li>
        <li>
          <p>
            <code>{`v`}</code> = vertical
          </p>
        </li>
        <li>
          <p>
            <code>{`l`}</code> = left
          </p>
        </li>
        <li>
          <p>
            <code>{`r`}</code> = right
          </p>
        </li>
        <li>
          <p>
            <code>{`t`}</code> = top
          </p>
        </li>
        <li>
          <p>
            <code>{`b`}</code> = bottom
          </p>
        </li>
      </ul>
      <p>
        <strong>Size (in px)</strong>
      </p>
      <ul>
        <li>
          <p>
            <code>{`0`}</code> = 0px
          </p>
        </li>
        <li>
          <p>
            <code>{`4`}</code> = 4px
          </p>
        </li>
        <li>
          <p>
            <code>{`8`}</code> = 8px
          </p>
        </li>
        <li>
          <p>
            <code>{`12`}</code> = 12px
          </p>
        </li>
        <li>
          <p>
            <code>{`16`}</code> = 16px
          </p>
        </li>
        <li>
          <p>
            <code>{`24`}</code> = 24px
          </p>
        </li>
        <li>
          <p>
            <code>{`32`}</code> = 32px
          </p>
        </li>
        <li>
          <p>
            <code>{`48`}</code> = 48px
          </p>
        </li>
        <li>
          <p>
            <code>{`64`}</code> = 64px
          </p>
        </li>
        <li>
          <p>
            <code>{`x`}</code> = responsive (x increases at larger breakpoints)
          </p>
        </li>
      </ul>
      <blockquote>
        <p>
          <strong>Example</strong>
        </p>
        <pre>
          <code>{`<div className="p24" style={{ border: "1px solid black" }}>
  This div has padding
</div>`}</code>
        </pre>
        <div className="p24" style={{ border: "1px solid black" }}>
          This div has padding
        </div>
        <pre>
          <code>{`<div className="ph24" style={{ border: "1px solid black" }}>
  This div has horizontal padding
</div>`}</code>
        </pre>
        <div className="ph24" style={{ border: "1px solid black" }}>
          This div has horizontal padding
        </div>
      </blockquote>
      <h3 id="other-spacing-utility-classes">Other spacing utility classes</h3>
      <p>
        When creating your own structure and layouts, you might need to create your own
        margins and paddings.
      </p>
      <p>
        To keep things consistent, plenty of utility classes have been added for this
        purpose.
      </p>
      <blockquote>
        <p>
          Used to provide the max-width for the copy you're reading right now:
          <br />
          <code>{`.mw-copy { max-width: 600px }`}</code>
        </p>
      </blockquote>
      <blockquote>
        <p>
          Might be used for the max-width of the whole website layout:
          <br />
          <code>{`.mw-screen { max-width: 1400px }`}</code>
        </p>
        <p>
          e.g. the BBC News website
          <br />
          <img
            src={getPublicURL("images/bbc-example.png")}
            alt="BBC News website max width visualisation"
          />
        </p>
      </blockquote>
      <blockquote>
        <p>
          Horizontally centre a div:
          <br />
          <code>{`.mh-auto { margin-left: auto; margin-right: auto }`}</code>
        </p>
      </blockquote>
      <h2 id="custom">Custom</h2>
      <p>You can use this file for custom global CSS.</p>
    </MenuLayout>
  );
};

export default CSSDocumentation;
