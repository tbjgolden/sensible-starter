import dedent from "dedent";
import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";
// import { getPublicURL } from "_/utilities/urls";

const CRA = () => {
  return (
    <MenuLayout>
      <h1 className="D">CRA</h1>
      <h2 className="H-S">Quick How-To Guides</h2>
      <p className="C c">
        Note: These topics are taken directly from Create-React-App, but the answers are
        specific to this starter.
      </p>
      <hr />
      <h3>Adding a CSS Modules Stylesheet</h3>
      <p>
        To add CSS Modules imports, create a file ending in <code>.module.css</code> and
        import it from a TSX file. For example:
      </p>
      <pre>
        <code>{dedent`
          /* MagicComponent.tsx */
          import { magic } from "./MagicComponent.module.css";

          export const MagicComponent = () => {
            return (
              <div className={magic}>
                Text
              </div>
            );
          }
        `}</code>
      </pre>
      <pre>
        <code>{dedent`
          /* MagicComponent.module.css */
          .magic {
            display: inline-block;
            padding: 4px 8px;
            background: #000;
          }
        `}</code>
      </pre>
      <p className="H" style={{ color: "red" }}>
        ^ This is broke, fix this
      </p>
      <h3>Adding a Router</h3>
      <p>
        You don't need to add a router,{" "}
        <Link to="https://github.com/remix-run/react-router">
          <code>react-router-dom</code>
        </Link>{" "}
        is already set up.
      </p>
      <h3>Adding a SASS Stylesheet</h3>
      <p>
        To add a SASS stylesheet, create a file ending in <code>.scss</code> and import it
        from a TSX file. For example:
      </p>
      <h6>MagicComponent.tsx</h6>
      <pre>
        <code>{dedent`
          import "./MagicComponent.scss";
          export const MagicComponent = () => {
            return <div className="magic">Text</div>;
          };
        `}</code>
      </pre>
      <h6>MagicComponent.scss</h6>
      <pre>
        <code>{dedent`
          $black: #000;
          $white: #fff;
          .magic {
            display: inline-block;
            padding: 4px 8px;
            color: $white;
            background: $black;
          }
        `}</code>
      </pre>
      <p>
        Note: these stylesheets are <strong>not scoped</strong> to the component, so vague
        CSS selectors will also affect other components.
      </p>
      <p>
        Note: You may not need SASS. Imported CSS is transformed with PostCSS, meaning it
        supports SASS-style nested rules out of the box.
      </p>
      <h3>Adding a Stylesheet (CSS)</h3>
      <p>
        This is the same as <strong>Adding a SASS Stylesheet</strong> above, except the
        file extension is <code>.css</code> and SASS features cannot be used.
      </p>
      <h3>Adding Bootstrap</h3>
      <p>Don't do this. Use Baseweb components instead.</p>
      <h3>Adding CSS Reset</h3>
      <p>
        A CSS Reset has already been set up, and is at <code>src/styles/reset.css</code>.
      </p>
      <h3>Adding Custom Environment Variables</h3>
      <p>
        Add them in your local .env file, and also to the .env.example, so other devs can
        see that a new variable has been added.
      </p>
      <p>
        To access an environment variable within the <code>src</code> directory, the
        variable will need to be prefixed with <code>VITE_</code>, so Vite knows to expose
        it to the client-side code.
      </p>
      <h3>Adding Flow</h3>
      <p>Don't do this. Flow has been made obsolete by newer versions of TypeScript.</p>
      <h3>Adding Images, Fonts and Files</h3>
      <p>
        See <strong>Using the Public Folder</strong>
      </p>
      <pre>
        <code>
          {dedent`
            import { getPublicURL } from "_/utilities/urls";
            // ...
            <img src={getPublicURL("images/cat.png")} />
            // => uses image located at "public/images/cat.png"
          `}
        </code>
      </pre>
      <h3>Adding Relay</h3>
      <p>
        Don't do this. Apollo is a better choice these days, and has already been
        integrated. An example is shown in <code>src/pages/test-pages/list.tsx</code>.
      </p>
      <h3>Adding TypeScript</h3>
      <p>TypeScript is already added.</p>
      <p>
        Files with the <code>.ts</code> file extension are TypeScript{" "}
        <strong>without JSX</strong> support, whereas <code>.tsx</code> is for TypeScript{" "}
        <strong>with JSX</strong> support.
      </p>
      <p>
        Note: this mistake can sometimes lead to unintuitive error messages, as TypeScript
        generics <code>{`const fn = <T>(arg: T): T => { ... }`}</code> and JSX tags{" "}
        <code>{`const el = <p>...</p>`}</code> can look very similar to the TypeScript
        parser.{" "}
        <span style={{ color: "var(--mono700)" }}>
          (In TSX files, generics are often misread as JSX, in TS files, JSX is a syntax
          error).
        </span>
      </p>
      <h3>Advanced Configuration</h3>
      <p>
        Internal config files are exposed, but if opening in VSCode, these config files
        have been deliberately hidden from the file tree view. To unhide these and edit
        them, comment out the file/directory you'd like to unhide in{" "}
        <code>.vscode/settings.json</code> in <code>"files.exclude"</code>.
      </p>
      <h3>Alternatives to Ejecting</h3>
      <p>
        N/A - Unlike <code>create-react-app</code> there is no concept of ejecting, as the
        config files are already exposed.
      </p>
      <h3>Analysing the Bundle Size</h3>
      <p>
        To work out what might be causing the initial JS bundle to be too large, run from
        the project root:
      </p>
      <pre>
        <code>{`npx vite build && npx source-map-explorer ./dist/index.*.js`}</code>
      </pre>
      <p className="H" style={{ color: "red" }}>
        ^ This needs an extra cli arg, fix this
      </p>
      <h3>Available Scripts</h3>
      <p>To see the available scripts, simply run:</p>
      <pre>
        <code>{`npm run help`}</code>
      </pre>
      <h3>Can I Use Decorators</h3>
      <p>No.</p>
      <h3>Code Splitting</h3>
      <p>
        Code is split into smaller chunks automatically. These chunks are approximately 1
        per screen, but all you need to know is that splitting the app into pages inside{" "}
        <code>src/pages</code> is why this is possible.
      </p>
      <h3>Custom Templates</h3>
      <p>
        Two example page templates are in the <code>src/components/Layouts.tsx</code>{" "}
        file, a blank page layout called <code>EmptyLayout</code> and a layout with a
        responsive navigation component called <code>MenuLayout</code>. Feel free to
        modify and add layouts to satisfy your requirements.
      </p>
      <h3>Debugging Tests</h3>
      <p>
        See <strong>Running Tests</strong>
      </p>
      <h3>Deployment</h3>
      <p>
        It's designed to be as simple as possible. This can simply be started on a Virtual
        Cloud Server like AWS EC2, DigitalOcean and many more. It is tested and working on
        Ubuntu 20.04 LTS.
      </p>
      <p className="PL">Requires node: ^16.15.0 and npm: &gt;5.2.0</p>
      <pre>
        <code>
          {dedent`
            # copy this directory or clone into a new directory to a machine
            cd <projectRootDir>
            # install dependencies
            npm install
            # create your prod .env file
            cp .env.example .env
            # edit it with prod values
            nano .env
            # this creates a database if none exists
            npm run dev
            # this starts the actual prod server
            npm run prod
          `}
        </code>
      </pre>
      In practice, at a minimum you'd want to do a few extra things:
      <ul>
        <li>
          Use <strong>ufw</strong> as a firewall (Guide)
        </li>
        <li>
          Use <strong>nginx</strong> as a reverse proxy (Guide)
        </li>
        <li>
          Use <strong>certbot</strong> to set up automatic SSL with nginx (Guide)
        </li>
        <li>
          Use <strong>pm2</strong> to daemonise <code>npm run prod</code> to restart the
          app if something crashes (Guide)
        </li>
        <li>
          Finally, create a Keystone admin user if you haven't already, and verify that
          any API calls are correctly reflected in the Keystone Admin UI. (If no other API
          calls, perhaps verify that a runtime error appears in Admin).
        </li>
      </ul>
      <p className="H" style={{ color: "red" }}>
        ^ Add the guide links to this, and update the keystone version
      </p>
      <h3>Developing Components in Isolation</h3>
      <p>
        This is more important in long-term projects and projects without a UI library
        like Baseweb. But if this project evolves into something like that, you might want
        to introduce Storybook. There's probably a vite plugin for this!
      </p>
      <h3>Fetching Data with AJAX Requests</h3>
      <p>
        Use native <code>fetch</code> instead of Axios, XMLHTTPRequests, etc.
      </p>
      <p>
        <Link to="https://developer.mozilla.org/">MDN</Link> has great documentation for{" "}
        <code>fetch</code> and many other web standards.
      </p>
      <h3>Folder Structure</h3>
      <p>
        See <Link to="/docs/structure">Page: Directory Structure</Link>
      </p>
      <h3>Getting Started</h3>
      <p>
        See{" "}
        <Link to="https://github.com/tbjgolden/sensible-starter">
          this projects README
        </Link>
      </p>
      <h3>Importing a Component</h3>
      <pre>
        <code>{`import { ComponentName } from "_/components/ComponentName";`}</code>
      </pre>
      <h3>Installing a Dependency</h3>
      <pre>
        <code>{`npm add <name-of-new-npm-dependency>`}</code>
      </pre>
      <p>
        Before adding, it's wise to check{" "}
        <Link to="https://bundlephobia.com">bundlephobia</Link> to see how much the
        package will add to the overall page bundle size.
      </p>
      <h3>Integrating with an API Backend</h3>
      <p>
        Keystone is a backend that generates a GraphQL API, docs, and an admin UI with
        user auth from a single file &ndash; <code>keystone.ts</code>. To add to the
        starter API, edit that file and restart your dev server (<kbd>Ctrl-C</kbd> then{" "}
        <code>npm run dev</code> again). This will automatically create and run migrations
        (database changes) and create the new API + Docs.
      </p>
      <h3>Loading GraphQL Files</h3>
      <p>
        See <strong>Integrating with an API Backend</strong>
      </p>
      <h3>Making a Progressive Web App</h3>
      <p>Vite probably has a plugin for this.</p>
      <h3>Measuring Performance</h3>
      <p>Common tools for measuring performance are:</p>
      <ul>
        <li>Lighthouse scores (on a live website)</li>
        <li>Lighthouse can also run from Chrome DevTools</li>
        <li>
          Measuring LCP (Largest Contentful Paint) in your browser's devtools - this is
          the best metric for calculating perceived loading speed
        </li>
        <li>
          In your browser's devtools, you can ask it to simulate certain conditions. You
          can:
          <ul>
            <li>slow down the CPU device</li>
            <li>throttle the internet speed</li>
            <li>
              add a 50ms latency (ping) to help identify causes of request waterfalls that
              would be unnoticable in development
            </li>
          </ul>
        </li>
        <li>
          Measure the data sent over-the-wire via your devtools until the page has
          finished loading; &gt;500kB is a noticeable delay, &gt;1000kB will end up
          feeling very slow on non-fibre internet.
        </li>
      </ul>
      <p>
        You don't want to over-optimise for performance until you know that there's an
        issue. It's easy to fix performance problems after the fact with this starter.
      </p>
      <h3>Post Processing CSS</h3>
      <p>
        CSS is pre-processed with PostCSS. This means you don't need to minify your CSS or
        add vendor prefixes (like <code>-moz-</code>); this is solved for you.
      </p>
      <h3>Pre-Rendering Into Static HTML Files</h3>
      <p>
        This starter makes no effort to play nice with static optimisation, as for most
        new projects this is out of scope. If this does become essential (e.g. for SEO
        reasons), you might want to migrate your code to this Next.js starter.
      </p>
      <p className="H" style={{ color: "red" }}>
        ^ Add the link to the similar Next.js starter
      </p>
      <h3>Production Build</h3>
      <p>
        By default <code>npm run prod</code> will satisfy requirements for production, but
        if wanting to use something like Cloudfront for the front-end (the keystone api
        will always need a back-end), the output files can be found in the{" "}
        <code>dist</code> directory - make sure to use <code>index.html</code> as the 404
        page to allow client-side routing.
      </p>
      <h3>Proxying API Requests in Development</h3>
      <p>This has been set up for you.</p>
      <h3>Running Tests</h3>
      <p>
        Tests are not built into this starter, but can be added using <code>jest</code>{" "}
        and <code>react-testing-library</code> by using those projects' documentation.
      </p>
      <h3>Setting Up Your Editor</h3>
      <p>
        It's recommended to use VSCode/VSCodium for by far the best TypeScript support.
      </p>
      <p>
        If not using VSCode, you'll likely need to set up your editor's equivalent of the
        VSCode plugins found in <code>.vscode/extensions.json</code>.
      </p>
      <p>
        In truth, no editor (perhaps besides vim?) will be able to live up to VSCode's TS
        "IntelliSense" (at time of writing).
      </p>
      <h3>Supported Browsers Features</h3>
      <p>
        The starter supports all major desktop and mobile browsers, except IE11. Vite has
        a legacy plugin to enable support for IE11.
      </p>
      <h3>Title and Meta Tags</h3>
      <p>
        To add meta tags and the title, simply add them to the <code>index.html</code>{" "}
        file.
      </p>
      <p>
        For a more robuse SEO solution, see{" "}
        <strong>Pre-Rendering Into Static HTML Files</strong>
      </p>
      <h3>Troubleshooting</h3>
      <ol>
        <li>Check the console, google the top error if there is one</li>
        <li>
          If there isn't one and the screen is blank, double check your browser URL
          against your code
        </li>
        <li>
          Experiment with a few things in your code/browser devtools and see what happens
        </li>
        <li>Ask for help</li>
      </ol>
      <h3>Updating to New Releases</h3>
      <p>
        Run <code>npm help update</code> to view the npm docs for how to update packages.
      </p>
      <h3>Using Global Variables</h3>
      <p>
        Don't if you can think of any way to avoid it. If absolutely required, attach
        things to the window object using a singleton pattern, and for objects/arrays,
        make sure to mutate them instead of reassigning a new value to avoid bugs.
      </p>
      <h3>Using HTTPS in Development</h3>
      <p>
        Services like <code>ngrok</code> can help with this.
      </p>
      <h3>Using the Public Folder</h3>
      <p>
        Put any static assets like images, fonts and files (but not HTML/CSS/JS) somewhere
        inside the <code>public</code> directory. These files can then be referenced
        consistently between dev and prod by using the <code>getPublicURL</code> function
        exported from <code>src/utilities/urls.ts</code> file.
      </p>
    </MenuLayout>
  );
};

export default CRA;
