import { MenuLayout } from "_/components/Layouts";
import { Link } from "_/components/Link";

const Index = () => {
  return (
    <MenuLayout>
      <h1 className="D">Sensible Starter</h1>

      <p className="P-L">A sensible starter for a web app.</p>

      <p className="PL-L">The guiding principles used to group these tools together:</p>

      <ul className="P-M">
        <li>
          Include tools that boost performance{" "}
          <strong>if, and only if, they don't require compromises</strong>, i.e.
          <ul>
            <li>bundling only the code for a specific page does count</li>
            <li>
              static pre-rendering does not count (compromise: unable to use browser APIs
              on initial render)
            </li>
          </ul>
        </li>
        <li>Avoid flaky/dead dependencies</li>
        <li>
          Try to <strong>pre-include popular features</strong> - as many as possible
        </li>
        <li>
          Expose the internals to make tinkering easy, but hide them from the editor's
          file tree explorer
        </li>
        <li>
          Embrace <strong>graceful degradation</strong> to improve functionality and
          performance
        </li>
      </ul>

      <p className="H-S">
        <Link to="/docs">Docs: Overview</Link>
      </p>
    </MenuLayout>
  );
};

export default Index;
