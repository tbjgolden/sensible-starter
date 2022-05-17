import { Link } from "_/components/Link";

import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Table } from "baseui/table-semantic";
import { RadioGroup, Radio } from "baseui/radio";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from "_/components/Modal";
import { Slider } from "baseui/slider";
import { MenuLayout } from "_/components/Layouts";
import { Grid, GridAlign } from "_/components/Grid";
import { useState } from "react";
import { Button } from "baseui/button";
import { useDeepState } from "_/hooks/useDeepState";

const COLUMNS = ["Name", "Age", "Address"];
const DATA = [
  ["Sarah Brown", 31, "100 Broadway St., New York City, New York"],
  ["Jane Smith", 32, "100 Market St., San Francisco, California"],
  ["Joe Black", 33, "100 Macquarie St., Sydney, Australia"],
];

const HTMLTest = () => {
  const [gridAlign, setGridAlign] = useState<GridAlign | "auto">("auto");
  const [gridGap, setGridGap] = useDeepState([16]);
  const [gridCellWidth, setGridCellWidth] = useDeepState([240]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MenuLayout>
      <h1>Components</h1>
      <h2>Forms</h2>
      <p>
        Forms should use{" "}
        <Link to="https://baseweb.design/components/form-control/#form-control">
          the baseweb input components
        </Link>
      </p>
      <form>
        <FormControl
          label={() => {
            return "label";
          }}
          caption={() => {
            return "caption";
          }}
        >
          <Input />
        </FormControl>
      </form>
      <h2>Tables</h2>
      <p>
        Tables should use{" "}
        <Link to="https://baseweb.design/guides/tables/">
          the baseweb table components
        </Link>
      </p>
      <Table columns={COLUMNS} data={DATA} />
      <h2>Headings</h2>
      <p>
        Just use standard <code>&lt;h1&gt;</code>...<code>&lt;h6&gt;</code> tags:
      </p>
      <h1>This is &lt;h1&gt;</h1>
      <p>Use a heading of the highest level once per page.</p>
      <h2>This is &lt;h2&gt;</h2>
      <p>
        Use <code>&lt;h2&gt;</code> for sections of the page.
      </p>
      <h3>This is &lt;h3&gt;</h3>
      <p>
        Use <code>&lt;h3&gt;</code> for sub-sections.
      </p>
      <h4>This is &lt;h4&gt;</h4>
      <p>I would recommend to avoid this type of heading at all.</p>
      <h5>This is &lt;h5&gt;</h5>
      <p>I would recommend to avoid this type of heading at all.</p>
      <h6>This is &lt;h6&gt;</h6>
      <p>I would recommend to avoid this type of heading at all.</p>
      <p>
        Sup<sup>®</sup> and Sub<sub>®</sub> Elements
      </p>
      <hr />
      <h2>Lists</h2>
      <p>
        Just use standard <code>&lt;ul&gt;</code>, <code>&lt;ol&gt;</code> tags:
      </p>
      <ul>
        <li>Orange</li>
        <li>
          Apple
          <ol>
            <li>First</li>
            <li>
              Second
              <ul>
                <li>Blue</li>
                <li>Yellow</li>
                <li>Green</li>
                <li>Red</li>
              </ul>
            </li>
            <li>Third</li>
          </ol>
        </li>
        <li>Apricot</li>
      </ul>
      <h2>Responsive Columns</h2>
      <FormControl
        label={() => {
          return "Grid Align:";
        }}
      >
        <RadioGroup
          value={gridAlign}
          onChange={(event) => {
            const gridAlign = event.currentTarget.value as GridAlign | "auto";
            return setGridAlign(gridAlign);
          }}
          name="grid-align"
          align="horizontal"
        >
          <Radio value="auto">(auto)</Radio>
          <Radio value="left">left</Radio>
          <Radio value="right">right</Radio>
          <Radio value="center">center</Radio>
          <Radio value="stretched">stretched</Radio>
          <Radio value="justified">justified</Radio>
        </RadioGroup>
      </FormControl>

      <FormControl
        label={() => {
          return "Grid Gap:";
        }}
      >
        <Slider
          value={gridGap}
          step={4}
          max={32}
          marks
          onChange={({ value }) => {
            return setGridGap(value);
          }}
        />
      </FormControl>

      <FormControl
        label={() => {
          return "Cell Width:";
        }}
      >
        <Slider
          value={gridCellWidth}
          step={32}
          min={64}
          max={288}
          marks
          onChange={({ value }) => {
            return setGridCellWidth(value);
          }}
        />
      </FormControl>

      <Grid
        cellWidth={gridCellWidth?.[0] ?? 240}
        gap={gridGap?.[0] ?? 16}
        align={gridAlign}
        className="mt16"
      >
        <p>
          You can use the <code>Columns</code> component to have multiple columns.
        </p>
        <p>You can pass in a custom cell width!</p>
        <p>
          All cells will be equal width! If <code>{'align="stretched"'}</code>, this width
          will be at least <code>codeWidth</code>, otherwise it will be <em>exactly</em>{" "}
          <code>codeWidth</code>
        </p>
      </Grid>
      <h2>Other Tags</h2>
      <h4>Paragraph</h4>
      <p>
        Other tags <em>should</em> generally display in the{" "}
        <strong>the way you'd expect</strong>. For example, the <code>&lt;u&gt;</code> tag
        will <u>display an underline</u>, the <code>&lt;del&gt;</code> tag will{" "}
        <del>display an strikethrough</del>, etc.
      </p>
      <h4>Code block</h4>
      <pre>
        <code>
          {`/* Normalise browser styles and fix bad defaults */
@import "./styles/reset.css";

/* Tweak defaults for ugly unstyled HTML tags */
@import "./styles/tags.css";

/* Type scale and related utility classes */
@import "./styles/typography.css";

/* Spacing scale and defaults */
@import "./styles/spacing.css";
`}
        </code>
      </pre>
      <h4>Blockquote</h4>
      <blockquote>
        Use this to emphasize a quote
        <footer>— Author Name, Publication</footer>
      </blockquote>
      <h4>Modal</h4>
      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <ModalHeader>Modal Header</ModalHeader>
        <ModalBody>Modal Body</ModalBody>
        <ModalFooter>
          <ModalButton
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Modal Footer &gt; Modal Button (Close Modal)
          </ModalButton>
        </ModalFooter>
      </Modal>
      <h4>Keyboard</h4>
      <p>
        <kbd>ctrl + l</kbd>
      </p>
    </MenuLayout>
  );
};

export default HTMLTest;
