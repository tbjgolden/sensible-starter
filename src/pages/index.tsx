import { Button } from "baseui/button";
import { useState } from "react";
import { MenuLayout } from "_c/Layouts";
import { Link } from "_c/Link";
import { getPublicURL } from "_u/urls";

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <MenuLayout>
      <h1 className="D">Starter</h1>
      <p className="PL-L">This starter uses:</p>
      <ul>
        <li>
          <strong>React</strong>
        </li>
        <li>
          <strong>TypeScript</strong>
        </li>
        <li>
          <strong>Vite</strong>
          {" as the toolchain"}
        </li>
        <li>
          <strong>ESLint</strong>
          {" for linting"}
        </li>
        <li>
          <strong>Prettier</strong>
          {" for code formatting"}
        </li>
        <li>
          <strong>Husky</strong>
          {" for Git hooks"}
        </li>
        <li>
          <strong>Baseweb</strong>
          {" as UI library"}
        </li>
        <li>
          <strong>Nivo</strong>
          {" as a charts library"}
        </li>
      </ul>
      <p className="P-L">
        Routing is handled by <strong>vite-plugin-pages</strong> +{" "}
        <strong>React Router</strong>. Like Next, this builds each page separately,
        handles page transitions client-side and code-splitting. Unlike Next, this does
        not perform static site generation, meaning you can use browser APIs without
        issue.
      </p>
      <p className="PL">
        As for styling; follow whatever is your path of least resistance:
      </p>
      <ul>
        <li>(Global) CSS/SCSS</li>
        <li>CSS/SCSS Modules</li>
        <li>Inline style objects</li>
        <li>CSS-in-JS (via Styletron)</li>
      </ul>

      <p>
        <img src={getPublicURL("roll-safe-clever.gif")} />
      </p>

      <p className="P-L">
        Familiarise yourself with all of{" "}
        <Link to="https://baseweb.design/components/">the components</Link> available in
        Baseweb.
      </p>

      <p>
        <Button
          onClick={() => {
            return setCount((count) => {
              return count + 1;
            });
          }}
        >
          count is: {count}
        </Button>
      </p>

      <p className="P">
        Edit <code>src/pages/index.tsx</code> and save to test hot reload.
      </p>

      <p className="P">There{"'"}s also some fun bonuses hidden in the configs.</p>
      <ol>
        <li>
          You can convert pages from Markdown to TSX with <code>npm run md-to-tsx</code>.
        </li>
        <li>In CSS files, you can nest rules like in Sass.</li>
        <li>
          You can also use the correct UK spellings (colour, behaviour, maths, mitre,
          centre, capitalise, grey) instead of US ones if you so choose.
        </li>
        <li>
          Included is a Link component that merges the logic of React Router with the
          presentation of Baseweb. It will detect if the URL passed in is external for
          you.
        </li>
        <li>
          Default HTML styles are active; meaning HTML should look good out of the box.
          Adding <code>className=&quot;reset&quot;</code> will make tags completely
          unstyled.
        </li>
      </ol>

      <p className="P">
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
    </MenuLayout>
  );
};

export default Index;
