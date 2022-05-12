import dedent from "dedent";
import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";

const options = [
  {
    title: "Adding a CSS Modules Stylesheet",
    content: (
      <>
        <p>
          To add CSS Modules imports, create a file ending in <code>.module.css</code> and
          import it from a TSX file. For example:
        </p>
        <pre>
          <code>
            {dedent`
              /* MagicComponent.tsx */
              import classes from "./MagicComponent.module.css";
              export const MagicComponent = () => {
                return (
                  <div className={classes.magic}>
                    Text
                  </div>
                );
              }
            `}
          </code>
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
      </>
    ),
  },
  {
    title: "Adding a Router",
    content: (
      <>
        <p>
          You don't need to add a router,{" "}
          <Link to="https://github.com/remix-run/react-router">
            <code>react-router-dom</code>
          </Link>{" "}
          is already set up.
        </p>
      </>
    ),
  },
  {
    title: "Adding a SASS Stylesheet",
    content: (
      <>
        <p>
          To add a SASS stylesheet, create a file ending in <code>.scss</code> and import
          it from a TSX file. For example:
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
          Note: these stylesheets are <strong>not scoped</strong> to the component, so
          vague CSS selectors will also affect other components.
        </p>
        <p>
          Note: You may not need SASS. Imported CSS is transformed with PostCSS, meaning
          it supports SASS-style nested rules out of the box.
        </p>
      </>
    ),
  },
  {
    title: "Adding a Stylesheet (CSS)",
    content: (
      <>
        <p>
          This is the same as <strong>Adding a SASS Stylesheet</strong> above, except the
          file extension is <code>.css</code> and SASS features cannot be used.
        </p>
      </>
    ),
  },
  {
    title: "Adding Bootstrap",
    content: (
      <>
        <p>Don't do this. Use Baseweb components instead.</p>
      </>
    ),
  },
  {
    title: "Adding CSS Reset",
    content: (
      <>
        <p>
          A CSS Reset has already been set up, and is at <code>src/styles/reset.css</code>
          .
        </p>
      </>
    ),
  },
  {
    title: "Adding Custom Environment Variables",
    content: (
      <>
        <p>
          Add them in your local .env file, and also to the .env.example, so other devs
          can see that a new variable has been added.
        </p>
        <p>
          To access an environment variable within the <code>src</code> directory, the
          variable will need to be prefixed with <code>VITE_</code>, so Vite knows to
          expose it to the client-side code.
        </p>
      </>
    ),
  },
  {
    title: "Adding Flow",
    content: (
      <>
        <p>Don't do this. Flow has been made obsolete by newer versions of TypeScript.</p>
      </>
    ),
  },
  {
    title: "Adding Images, Fonts and Files",
    content: (
      <>
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
      </>
    ),
  },
  {
    title: "Adding Relay",
    content: (
      <>
        <p>
          Don't do this. Apollo is a better choice these days, and has already been
          integrated. An example is shown in <code>src/pages/test-pages/list.tsx</code>.
        </p>
      </>
    ),
  },
  {
    title: "Adding TypeScript",
    content: (
      <>
        <p>TypeScript is already added.</p>
        <p>
          Files with the <code>.ts</code> file extension are TypeScript{" "}
          <strong>without JSX</strong> support, whereas <code>.tsx</code> is for
          TypeScript <strong>with JSX</strong> support.
        </p>
        <p>
          Note: this mistake can sometimes lead to unintuitive error messages, as
          TypeScript generics <code>{`const fn = <T>(arg: T): T => { ... }`}</code> and
          JSX tags <code>{`const el = <p>...</p>`}</code> can look very similar to the
          TypeScript parser.{" "}
          <span style={{ color: "var(--mono700)" }}>
            (In TSX files, generics are often misread as JSX, in TS files, JSX is a syntax
            error).
          </span>
        </p>
      </>
    ),
  },
  {
    title: "Advanced Configuration",
    content: (
      <>
        <p>
          Internal config files are exposed, but if opening in VSCode, these config files
          have been deliberately hidden from the file tree view. To unhide these and edit
          them, comment out the file/directory you'd like to unhide in{" "}
          <code>.vscode/settings.json</code> in <code>"files.exclude"</code>.
        </p>
      </>
    ),
  },
  {
    title: "Alternatives to Ejecting",
    content: (
      <>
        <p>
          N/A - Unlike <code>create-react-app</code> there is no concept of ejecting, as
          the config files are already exposed.
        </p>
      </>
    ),
  },
  {
    title: "Analysing the Bundle Size",
    content: (
      <>
        <p>To work out what the initial JS bundle comprises of, run:</p>
        <pre>
          <code>{`npm run view-bundle`}</code>
        </pre>
      </>
    ),
  },
  {
    title: "Available Scripts",
    content: (
      <>
        <p>To see the available scripts, simply run:</p>
        <pre>
          <code>{`npm run help`}</code>
        </pre>
      </>
    ),
  },
  {
    title: "Can I Use Decorators",
    content: (
      <>
        <p>No.</p>
      </>
    ),
  },
  {
    title: "Code Splitting",
    content: (
      <>
        <p>
          Code is split into smaller chunks automatically. These chunks are approximately
          1 per screen, but all you need to know is that splitting the app into pages
          inside <code>src/pages</code> is why this is possible.
        </p>
      </>
    ),
  },
  {
    title: "Custom Templates",
    content: (
      <>
        <p>
          Two example page templates are in the <code>src/components/Layouts.tsx</code>{" "}
          file, a blank page layout called <code>EmptyLayout</code> and a layout with a
          responsive navigation component called <code>MenuLayout</code>. Feel free to
          modify and add layouts to satisfy your requirements.
        </p>
      </>
    ),
  },
  {
    title: "Debugging Tests",
    content: (
      <>
        <p>
          See <strong>Running Tests</strong>
        </p>
      </>
    ),
  },
  {
    title: "Deployment",
    content: (
      <>
        <p>
          It's designed to be as simple as possible. This can simply be started on a
          Virtual Cloud Server like AWS EC2, DigitalOcean and many more. It is tested and
          working on Ubuntu 20.04 LTS.
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
            Use <strong>ufw</strong> as a firewall
          </li>
          <li>
            Use <strong>nginx</strong> as a reverse proxy
          </li>
          <li>
            Use <strong>certbot</strong> to set up automatic SSL with nginx
          </li>
          <li>
            Use <strong>pm2</strong> to daemonise <code>npm run prod</code> to restart the
            app if something crashes
          </li>
          <li>
            Finally, create a Keystone admin user if you haven't already, and verify that
            any API calls are correctly reflected in the Keystone Admin UI. (If no other
            API calls, perhaps verify that a runtime error appears in Admin).
          </li>
        </ul>
        <Link to="https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04">
          Full Guide
        </Link>
      </>
    ),
  },
  {
    title: "Developing Components in Isolation",
    content: (
      <>
        <p>
          This is more important in long-term projects and projects without a UI library
          like Baseweb. But if this project evolves into something like that, you might
          want to introduce Storybook. There's probably a vite plugin for this!
        </p>
      </>
    ),
  },
  {
    title: "Fetching Data with AJAX Requests",
    content: (
      <>
        <p>
          Use native <code>fetch</code> instead of Axios, XMLHTTPRequests, etc.
        </p>
        <p>
          <Link to="https://developer.mozilla.org/">MDN</Link> has great documentation for{" "}
          <code>fetch</code> and many other web standards.
        </p>
      </>
    ),
  },
  {
    title: "Folder Structure",
    content: (
      <>
        <p>
          See <Link to="/docs/structure">Page: Directory Structure</Link>
        </p>
      </>
    ),
  },
  {
    title: "Getting Started",
    content: (
      <>
        <p>
          See{" "}
          <Link to="https://github.com/tbjgolden/sensible-starter">
            this projects README
          </Link>
        </p>
      </>
    ),
  },
  {
    title: "Importing a Component",
    content: (
      <>
        <pre>
          <code>{`import { ComponentName } from "_/components/ComponentName";`}</code>
        </pre>
      </>
    ),
  },
  {
    title: "Installing a Dependency",
    content: (
      <>
        <pre>
          <code>{`npm add <name-of-new-npm-dependency>`}</code>
        </pre>
        <p>
          Before adding, it's wise to check{" "}
          <Link to="https://bundlephobia.com">bundlephobia</Link> to see how much the
          package will add to the overall page bundle size.
        </p>
      </>
    ),
  },
  {
    title: "Integrating with an API Backend",
    content: (
      <>
        <p>
          Keystone is a backend that generates a GraphQL API, docs, and an admin UI with
          user auth from a single file &ndash; <code>keystone.ts</code>. To add to the
          starter API, edit that file and restart your dev server (<kbd>Ctrl-C</kbd> then{" "}
          <code>npm run dev</code> again). This will automatically create and run
          migrations (database changes) and create the new API + Docs.
        </p>
      </>
    ),
  },
  {
    title: "Loading GraphQL Files",
    content: (
      <>
        <p>
          See <strong>Integrating with an API Backend</strong>
        </p>
      </>
    ),
  },
  {
    title: "Making a Progressive Web App",
    content: (
      <>
        <p>Vite probably has a plugin for this.</p>
      </>
    ),
  },
  {
    title: "Measuring Performance",
    content: (
      <>
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
                add a 50ms latency (ping) to help identify causes of request waterfalls
                that would be unnoticable in development
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
      </>
    ),
  },
  {
    title: "Post Processing CSS",
    content: (
      <>
        <p>
          CSS is pre-processed with PostCSS. This means you don't need to minify your CSS
          or add vendor prefixes (like <code>-moz-</code>); this is solved for you.
        </p>
      </>
    ),
  },
  {
    title: "Pre-Rendering Into Static HTML Files",
    content: (
      <>
        <p>
          This starter makes no effort to play nice with static optimisation, as for most
          new projects this is out of scope. If this does become essential (e.g. for SEO
          reasons), you might want to migrate your code to Next.js:{" "}
          <Link to="https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js">
            Blog post
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    title: "Production Build",
    content: (
      <>
        <p>
          By default <code>npm run prod</code> will satisfy requirements for production,
          but if wanting to use something like Cloudfront for the front-end (the keystone
          api will always need a back-end), the output files can be found in the{" "}
          <code>dist</code> directory - make sure to use <code>index.html</code> as the
          404 page to allow client-side routing.
        </p>
      </>
    ),
  },
  {
    title: "Proxying API Requests in Development",
    content: (
      <>
        <p>This has been set up for you.</p>
      </>
    ),
  },
  {
    title: "Running Tests",
    content: (
      <>
        <p>
          Tests are not built into this starter, but can be added using <code>jest</code>{" "}
          and <code>react-testing-library</code> by using those projects' documentation.
        </p>
      </>
    ),
  },
  {
    title: "Setting Up Your Editor",
    content: (
      <>
        <p>
          It's recommended to use VSCode/VSCodium for by far the best TypeScript support.
        </p>
        <p>
          If not using VSCode, you'll likely need to set up your editor's equivalent of
          the VSCode plugins found in <code>.vscode/extensions.json</code>.
        </p>
        <p>
          In truth, no editor (perhaps besides vim?) will be able to live up to VSCode's
          TS "IntelliSense" (at time of writing).
        </p>
      </>
    ),
  },
  {
    title: "Supported Browsers Features",
    content: (
      <>
        <p>
          The starter supports all major desktop and mobile browsers, except IE11. Vite
          has a legacy plugin to enable support for IE11.
        </p>
      </>
    ),
  },
  {
    title: "Title and Meta Tags",
    content: (
      <>
        <p>
          To add meta tags and the title, simply add them to the <code>index.html</code>{" "}
          file.
        </p>
        <p>
          For a more robuse SEO solution, see{" "}
          <strong>Pre-Rendering Into Static HTML Files</strong>
        </p>
      </>
    ),
  },
  {
    title: "Troubleshooting",
    content: (
      <>
        <ol>
          <li>Check the console, google the top error if there is one</li>
          <li>
            If there isn't one and the screen is blank, double check your browser URL
            against your code
          </li>
          <li>
            Experiment with a few things in your code/browser devtools and see what
            happens
          </li>
          <li>Ask for help</li>
        </ol>
      </>
    ),
  },
  {
    title: "Updating to New Releases",
    content: (
      <>
        <p>
          Run <code>npm help update</code> to view the npm docs for how to update
          packages.
        </p>
      </>
    ),
  },
  {
    title: "Using Global Variables",
    content: (
      <>
        <p>
          Don't if you can think of any way to avoid it. If absolutely required, attach
          things to the window object using a singleton pattern, and for objects/arrays,
          make sure to mutate them instead of reassigning a new value to avoid bugs.
        </p>
      </>
    ),
  },
  {
    title: "Using HTTPS in Development",
    content: (
      <>
        <p>
          Services like <code>ngrok</code> can help with this.
        </p>
      </>
    ),
  },
  {
    title: "Using the Public Folder",
    content: (
      <>
        <p>
          Put any static assets like images, fonts and files (but not HTML/CSS/JS)
          somewhere inside the <code>public</code> directory. These files can then be
          referenced consistently between dev and prod by using the{" "}
          <code>getPublicURL</code> function exported from{" "}
          <code>src/utilities/urls.ts</code> file.
        </p>
      </>
    ),
  },
];

const CRA = () => {
  return (
    <MenuLayout>
      <h1 className="D-S">{options.length} How-To Mini Guides</h1>
      <p className="P-S">
        These questions have been taken from React's own starter (create-react-app) as
        they represent a broad range of common user questions. This project is built on
        different tech though, so the answers are very different.
      </p>
      {options.map(({ title, content }) => {
        return (
          <>
            <h3>{title}</h3>
            {content}
          </>
        );
      })}
    </MenuLayout>
  );
};

export default CRA;
