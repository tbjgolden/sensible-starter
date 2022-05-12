import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";

const Video = ({ src }: { src: string }) => {
  return (
    <iframe
      width="100%"
      height="400"
      src={src}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{
        backgroundColor: "#ccc",
      }}
    />
  );
};

const Documentation = () => {
  return (
    <MenuLayout>
      <h1 className="D">Documentation</h1>
      <p className="P-L">
        Every single library and tool in this starter was assessed for inclusion via its
        pros and cons. Here's what's included (plus why!) - it should all make sense by
        the end.
      </p>
      <h2>React</h2>
      <p className="PL-L">React as fast as possible:</p>
      <Video src="https://www.youtube.com/embed/Tn6-PIqc4UM" />
      <Video src="https://www.youtube.com/embed/TNhaISOUy6Q" />
      <p className="PL-L">Why React?</p>
      <p className="P-L">
        According to StackOverflow users, React is the 2nd most loved JS front-end
        framework, just behind Svelte.
      </p>
      <p className="P">
        <Link to="https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks">
          StackOverflow survey on most-loved web frameworks
        </Link>
      </p>
      <p className="P-L">
        The State of JS survey also found it to be the second favourite, again behind
        Svelte.
      </p>
      <p className="P">
        <Link to="https://2021.stateofjs.com/en-US/libraries/#tier_list">
          JS Ecosystem Tier List
        </Link>
      </p>
      <p className="P-L">
        So why not Svelte? The main reason is that it is much harder to find Svelte
        developers than React developers. There are also some technical reasons:
      </p>
      <ul>
        <li>
          React forces you to write declarative change logic, which is arguably a better
          fit for UI development as forces developers to handle all edge cases. Svelte
          mixes both imperative and declarative logic.
        </li>
        <li>
          React is rock-solid. 99% of React code that worked over 6 years ago still works
          today with new versions of React.
        </li>
        <li>
          React's strengths are most apparent when developing a web app with a lot of
          functionality and reusable logic.
        </li>
      </ul>
      <h2>TypeScript</h2>
      <p className="PL-L">TypeScript as fast as possible:</p>
      <Video src="https://www.youtube.com/embed/zQnBQ4tB3ZA" />
      <Video src="https://www.youtube.com/embed/ahCwqrYpIuM" />
      <p className="PL-L">Why TypeScript?</p>
      <p className="P-L">
        According to StackOverflow users, TypeScript is the 3rd most loved programming
        language.
      </p>
      <p className="P">
        <Link to="https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-programming-scripting-and-markup-languages">
          StackOverflow survey on most-loved languages
        </Link>
      </p>
      <p>
        Most of the cons that used to TypeScript used to have are now resolved.
        Considering how much dev time it saves, it's no surprise that it's considered
        S-tier these days.
      </p>
      <hr />
      <h2>Vite</h2>
      <p className="PL-L">Vite as fast as possible:</p>
      <Video src="https://www.youtube.com/embed/KCrXgy8qtjM" />
      <p className="PL-L">Why Vite (instead of Next)?</p>
      <p className="P-L">
        It's able to do everything that Next can do through plugins, plus has a much
        faster live-reload.
      </p>
      <hr />
      <h2>Baseweb</h2>
      <p className="P-L">
        Baseweb is a React component library, and is the open-source library that Uber
        uses to product its own user interfaces. It seems to be under the radar - possibly
        because Uber isn't well known for its open source tech. When benchmarking React
        component libraries, I{" "}
        <Link to="https://github.com/tbjgolden/design-systems-benchmarks">
          tried it out
        </Link>{" "}
        and realised that it was really good in all the ways that matter.
      </p>
      <p>
        Most importantly, it is treeshakeable, is themeable, is accessible, bundles
        TypeScript types, low footprint and makes mostly sensible technical choices.
      </p>
      <p>Design-wise, it's unopinionated and highly-functional.</p>
      <p>
        The best part is actually the API; the React component props are by far the most
        practical I've seen, and clearly they have some smart and thoughtful developers
        working on this. Even if you want/need to opt-out of one of their components,
        you'd still want to use their API design!
      </p>

      <hr />

      <h2>Zero controversy choices:</h2>
      <h3>ESLint</h3>
      <p>
        A linter that is preconfigured with rules for this starter. If your editor has a
        plugin for ESLint installed, warnings and errors will appear alongside your code.
        ESLint is well liked and has no major alternative.
      </p>
      <h3>Prettier</h3>
      <p>
        An opinionated code-formatter which basically outsources all code-style arguments
        to an algorithm. Prettier can format pretty much all front-end, config file and
        markup languages. Prettier is well liked and has no major alternative.
      </p>
      <h3>Husky</h3>
      <p>
        A package that allows you to add put git hooks into source control. Husky now asks
        that people manually enable it after <code>npm install</code> with{" "}
        <code>npm run prepare</code>, as the automatic way caused more problems than it
        solved.
      </p>
      <h3>React Router</h3>
      <p>
        Routing is handled by <strong>vite-plugin-pages</strong> +{" "}
        <strong>React Router</strong>. Like Next, this builds each page separately,
        handles page transitions client-side and code-splitting.
      </p>
      <h3>Utility Classes / BYO-CSS</h3>
      <p>
        CSS doesn't really have a best option yet; I'd argue the best (Tailwind,
        styled-components) are still B-tier solutions. As such, I've popped just enough{" "}
        <Link to="https://tachyons.io/">tachyons</Link>-inspired utility classes in here
        in some (Post-)CSS files and left it off there.
      </p>
      <p>Possible options:</p>
      <ul>
        <li>(Global) CSS/SCSS</li>
        <li>CSS/SCSS Modules</li>
        <li>Inline style objects</li>
        <li>CSS-in-JS (via Styletron, which is already bundled via Baseweb)</li>
      </ul>
    </MenuLayout>
  );
};

export default Documentation;
