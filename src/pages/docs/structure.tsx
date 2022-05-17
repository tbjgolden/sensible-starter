import { MenuLayout } from "_/components/Layouts";
import { TreeView, TreeNode, toggleIsExpanded } from "baseui/tree-view";
import { Checkbox } from "baseui/checkbox";
import { ChangeEvent, ReactChild, useEffect, useState } from "react";
import {
  File as FileIcon,
  FolderPlus as FolderPlusIcon,
  FolderMinus as FolderMinusIcon,
} from "lucide-react";
import { useDeepState } from "_/hooks/useDeepState";

interface File {
  name: string;
  description?: ReactChild;
  hidden?: boolean;
}

interface Folder {
  name: string;
  description?: ReactChild;
  children: Array<Folder | File>;
  hidden?: boolean;
}

const Label = ({ entry }: { entry: Folder | File }): JSX.Element => {
  return (
    <div
      style={{
        flex: "1 1 1px",
        minHeight: "2em",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "1 1 1px", userSelect: "none" }}>
        <div className="PL-S">{entry.name}</div>
        {entry.description ? (
          <div className="C" style={{ whiteSpace: "pre-wrap" }}>
            {entry.description}
          </div>
        ) : null}
      </div>
    </div>
  );
};

const HOME_URL = import.meta.env.VITE_FRONTEND_HOST ?? "http://localhost:3000";

const toTreeViewData = (
  entries: Folder["children"],
  path = "<root>"
): TreeNode<{
  isHidden: boolean;
}>[] => {
  const treeNodes: TreeNode[] = [];

  for (const entry of entries) {
    const pathWithName = path + "/" + entry.name;
    if ("children" in entry) {
      treeNodes.push({
        id: pathWithName,
        children: toTreeViewData(entry.children, pathWithName),
        isExpanded: pathWithName === "<root>/src",
        label: () => {
          return <Label entry={entry} />;
        },
        isHidden: entry.hidden || false,
      });
    } else {
      treeNodes.push({
        id: pathWithName,
        label: () => {
          return <Label entry={entry} />;
        },
        isHidden: entry.hidden || false,
      });
    }
  }

  return treeNodes;
};

const removeHidden = (tree: Array<File | Folder>): Array<File | Folder> => {
  const filtered: Array<File | Folder> = [];
  for (const entry of tree) {
    if ("children" in entry) {
      if (!entry.hidden) {
        const filteredChildren = removeHidden(entry.children);
        if (filteredChildren.length > 0) {
          filtered.push({
            ...entry,
            children: filteredChildren,
          });
        }
      }
    } else {
      if (!entry.hidden) {
        filtered.push(entry);
      }
    }
  }
  return filtered;
};

const fileData = [
  {
    name: ".husky",
    description: "Contains scripts that run on git events",
    children: [
      {
        name: "pre-commit",
        description: "A script that runs before commits. Runs lint-staged out of box",
      },
    ],
    hidden: true,
  },
  {
    name: ".scripts",
    description: "Contains some custom logic used by 'npm run ...' scripts",
    children: [
      {
        name: "lib",
        description: "Contains helpers",
        children: [
          {
            name: "jsonc.ts",
            description: "Like JSON.parse, but works with JSON with comments",
          },
          {
            name: "project.ts",
            description: "A helper that gets the project root directory",
          },
          { name: "url.ts", description: "A simple URL parser" },
        ],
      },
      { name: "help.ts", description: "'npm run help' - CLI help script" },
      { name: "prod.ts", description: "'npm run prod' - Production express server" },
    ],
    hidden: true,
  },
  {
    name: ".vscode",
    description: "Contains project specific VSCode configuration (incl hiding files)",
    children: [
      {
        name: "extensions.ts",
        description: "A list of recommended extensions for the project",
      },
      {
        name: "settings.ts",
        description:
          "Project-specific editor settings + why some files don't appear in the tree view",
      },
    ],
  },
  {
    name: "public",
    description:
      "Contains assets passed straight through to the root output directory\ne.g. <projectRoot>/public/a.png => https://i.ai/a.png",
    children: [
      {
        name: "fonts",
        children: [
          { name: "Inter400.woff2", description: "Static font file (fallback)" },
          { name: "Inter500.woff2", description: "Static font file (fallback)" },
          { name: "Inter600.woff2", description: "Static font file (fallback)" },
          { name: "Inter900.woff2", description: "Static font file (fallback)" },
          { name: "InterVariable.woff2", description: "Variable font file" },
        ],
      },
      {
        name: "images",
        children: [{ name: "bbc-example.png" }, { name: "roll-safe-clever.gif" }],
      },
    ],
  },
  {
    name: "src",
    description: "Contains all of the application logic",
    children: [
      {
        name: "components",
        description: "Contains reusable React components",
        children: [
          {
            name: "Drawer.tsx",
            description: "A wrapper for the baseweb drawer component",
          },
          {
            name: "Grid.tsx",
            description: "An easy way to create responsive columns/grids",
          },
          {
            name: "Layouts.tsx",
            description: "Common layout logic shared by multiple pages",
          },
          {
            name: "Link.tsx",
            description: "= react-router Link logic + baseweb Link style",
          },
          { name: "Modal.tsx", description: "A wrapper for the baseweb modal component" },
          {
            name: "ResponsiveNav.tsx",
            description: "A simple responsive navigation build from baseweb components",
          },
        ],
      },
      {
        name: "hooks",
        description: "Contains any custom React hooks you might want to add",
        children: [
          { name: "useExample.ts", description: "A hypothetical React hook file" },
        ],
      },
      {
        name: "pages",
        description:
          "Contains entrypoints for the pages using the filesystem routing pattern",
        children: [
          {
            name: "docs",
            description: `Contains pages that act as documentation for this starter\n→ ${HOME_URL}/docs/**`,
            children: [
              { name: "css-guide.tsx", description: `→ ${HOME_URL}/docs/css-guide` },
              { name: "index.tsx", description: `→ ${HOME_URL}/docs` },
            ],
          },
          {
            name: "test-pages",
            description: `Contains pages that are used to validate that this starter is working\n→ ${HOME_URL}/test-pages/**`,
            children: [
              {
                name: "chart.tsx",
                description: `→ ${HOME_URL}/test-pages/chart`,
              },
              {
                name: "components.tsx",
                description: `→ ${HOME_URL}/test-pages/components`,
              },
              {
                name: "html-test.tsx",
                description: `→ ${HOME_URL}/test-pages/html-test`,
              },
              { name: "index.tsx", description: `→ ${HOME_URL}/test-pages` },
              { name: "list.tsx", description: `→ ${HOME_URL}/test-pages/list` },
            ],
          },
          {
            name: "index.tsx",
            description: `→ ${HOME_URL}/`,
          },
        ],
      },
      {
        name: "styles",
        description: "Contains CSS files. Full CSS docs in /docs/css",
        children: [
          { name: "custom.css", description: "Custom CSS goes in here" },
          { name: "reset.css", description: "Reset/normalise browser styles" },
          {
            name: "spacing-defaults.css",
            description: "Fixes for the default margins of block elements",
          },
          {
            name: "spacing-scale.css",
            description: "Contains padding/margin utility classes",
          },
          {
            name: "tags.css",
            description: "Fixes for the default style of HTML semantic tags",
          },
          {
            name: "typography.css",
            description: "Where all the typography logic lives (scale/defaults/fonts)",
          },
        ],
      },
      {
        name: "utilities",
        description: "Contains client-side helper methods",
        children: [
          {
            name: "urls.ts",
            description:
              "getPublicURL() makes it possible to use absolute paths for public/** files",
          },
        ],
      },
      { name: "main.tsx", description: "The entrypoint for the whole React app" },
      { name: "theme.ts", description: "Builds and exports a baseweb theme" },
      {
        name: "vite-env.d.ts",
        description: "Needed for TypeScript to know what types to assign to some imports",
        hidden: true,
      },
    ],
  },
  {
    name: ".editorconfig",
    description: "Enforces indent styles in different editors",
    hidden: true,
  },
  {
    name: ".env.example",
    description: "Example .env file, but contains no secrets and kept in git",
    hidden: true,
  },
  {
    name: ".eslintrc.cjs",
    description: "ESLint config file",
    hidden: true,
  },
  {
    name: ".gitignore",
    description: "Specifies which files should be ignored by git (i.e. not committed)",
  },
  {
    name: ".lintstagedrc.cjs",
    description: "Specifies the checks to run on currently staged files",
    hidden: true,
  },
  {
    name: ".prettierignore",
    description: "Specifies which files that should not be auto-formatted on save/commit",
    hidden: true,
  },
  {
    name: ".prettierrc.cjs",
    description: "Prettier config file",
    hidden: true,
  },
  { name: ".stylelintrc.json", description: "Stylelint config file", hidden: true },
  {
    name: "index.html",
    description: "The html file that the React app will be embedded into",
  },
  {
    name: "keystone.ts",
    description: "Used by Keystone to generate a GraphQL API, Admin UI and migrations",
  },
  {
    name: "package-lock.json",
    description: "A lockfile which locks in the versions of packages installed by npm",
    hidden: true,
  },
  {
    name: "package.json",
    description: "Project config file, containing npm scripts and npm dependencies",
  },
  {
    name: "postcss.config.cjs",
    description: "PostCSS config file",
    hidden: true,
  },
  { name: "README.md" },
  {
    name: "schema.graphql",
    description: "GraphQL file autogenerated by Keystone",
    hidden: true,
  },
  {
    name: "schema.prisma",
    description: "Prisma file autogenerated by Keystone",
    hidden: true,
  },
  { name: "tsconfig.json", description: "TypeScript config file", hidden: true },
  { name: "vite.config.ts", description: "Vite config file", hidden: true },
];

const treeDataAll = toTreeViewData(fileData);
const treeDataFiltered = toTreeViewData(removeHidden(fileData));

export const FileTreeView = () => {
  const [showInternalFiles, setShowInternalFiles] = useState(false);
  const [treeData, setTreeData] = useDeepState(treeDataFiltered);

  useEffect(() => {
    if (showInternalFiles) {
      setTreeData(treeDataAll);
    } else {
      setTreeData(treeDataFiltered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showInternalFiles]);

  return (
    <div>
      <div className="mt48">
        <Checkbox
          checked={showInternalFiles}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setShowInternalFiles(event.target.checked);
          }}
          labelPlacement="right"
        >
          Show internal files
        </Checkbox>
      </div>

      <hr />

      <TreeView
        singleExpanded
        indentGuides
        data={treeData}
        onToggle={(node) => {
          setTreeData((prevData) => {
            return toggleIsExpanded(prevData, node);
          });
        }}
        overrides={{
          IconContainer: {
            style: {},
          },
          CollapseIcon: {
            component: FolderMinusIcon,
          },
          ExpandIcon: {
            component: FolderPlusIcon,
          },
          LeafIconContainer: {
            style: {},
          },
          LeafIcon: {
            component: FileIcon,
          },
        }}
      />
    </div>
  );
};

const Structure = () => {
  return (
    <MenuLayout>
      <h1 className="D">Directory Structure</h1>
      <p className="H-S">(i.e. what each file is for)</p>
      <FileTreeView />
    </MenuLayout>
  );
};

export default Structure;
