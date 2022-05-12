import { ReactNode } from "react";
import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";
import { StatefulTooltip } from "baseui/tooltip";

const Help = ({ text, children }: { text: string; children: ReactNode }) => {
  return (
    <span
      style={{
        cursor: "help",
        textDecoration: "underline",
        textDecorationStyle: "dotted",
      }}
    >
      <StatefulTooltip
        showArrow
        placement="top"
        content={() => {
          return text;
        }}
        overrides={{
          Inner: {
            style: {
              display: "inline-block",
              maxWidth: "240px",
            },
          },
        }}
      >
        {children}
      </StatefulTooltip>
    </span>
  );
};

const NonJSDev = () => {
  return (
    <MenuLayout>
      <h1 className="D">Modern Front-End Guide</h1>
      <p className="P-L">
        It's impossible to boil down every single thing you'd need to know to write
        front-end code as a back-end or full-stack dev. Instead, I'm going to assume that
        you've put an index.html file, a scripts.js file and a styles.css file into a
        folder and that's it.
      </p>
      <blockquote>
        <p className="P">
          Obviously, if you're going to be spending plenty of time in the front-end,
          you'll need way more than this cheatsheet. This at least should give you enough
          context to know what to search. If you've tried searching and can't find the
          answer, then reach out for help.
        </p>
      </blockquote>

      <h3>High-level: how this code ends up in your browser</h3>
      <p className="P-L">
        This front-end, like any other front-end, eventually results in some HTML, CSS and
        JavaScript. Let's start from there.
      </p>
      <p className="P-L">
        <strong>
          The best documentation for HTML, CSS and JS is{" "}
          <Link to="https://developer.mozilla.org/">MDN</Link>.
        </strong>{" "}
        In general, google the thing you're trying to use and then "mdn" and you'll find
        exactly what you're looking for. Devs often fall into the trap of using W3Schools,
        which hasn't been updated since the dawn of time.
      </p>
      <p className="P-L">
        <strong>There is no server-side rendering.</strong> Files are generated from the
        source code into{" "}
        <Help text="to allow routing to be handled by the client, a static server must serve the index.html file in place of a 404">
          static files*
        </Help>
        , which means that instead of injecting data into the HTML and sending it, the
        same JavaScript is sent, and it works out which requests to send during{" "}
        <Help text="i.e. in the browser window itself">runtime</Help>.
      </p>
      <p className="P-L">
        <strong>The input TSX files are compiled into JS files.</strong> (Explanation)
      </p>
      <p className="P-L">
        <strong>
          The output files target every major browser, except Internet Explorer.
        </strong>{" "}
        (i.e. it outputs{" "}
        <Help text="ES6 is ECMAScript 6 (aka ES2015). ECMAScript is the official name of JavaScript.">
          ES6
        </Help>{" "}
        code, and relies on semi-recent CSS features). (what if IE11 needed?) (iOS Safari
        note, caniuse note)
      </p>
    </MenuLayout>
  );
};

export default NonJSDev;
