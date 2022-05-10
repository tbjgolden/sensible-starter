import { Button } from "baseui/button";
import { useState } from "react";
import { MenuLayout } from "_/components/Layouts";
import { getPublicURL } from "_/utilities/urls";

const Test = () => {
  const [count, setCount] = useState(0);
  return (
    <MenuLayout>
      <h1 className="D">Test: Basics</h1>

      <h2>Image Test</h2>

      <p>
        <img src={getPublicURL("images/roll-safe-clever.gif")} />
      </p>

      <h2>State Change Test</h2>

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

      <h2>Live Reload Test</h2>

      <p className="P">
        Edit the text below in <code>src/pages/test/index.tsx</code> and save:
      </p>

      <blockquote>
        <p>The five boxing wizards jump quickly</p>
      </blockquote>
    </MenuLayout>
  );
};

export default Test;
