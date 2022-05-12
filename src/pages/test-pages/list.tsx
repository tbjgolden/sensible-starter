import { Checkbox } from "baseui/checkbox";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";
import { MenuLayout } from "_/components/Layouts";

import { gql, useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { Link } from "_/components/Link";
import { Button } from "baseui/button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from "_/components/Modal";

const LIST_ITEMS_QUERY = gql`
  {
    listItems {
      id
      name
      checked
      updatedAt
    }
  }
`;

const UPDATE_ITEM_CHECKED_MUTATION = gql`
  mutation updateItemChecked($id: ID!, $checked: Boolean!) {
    updateListItem(where: { id: $id }, data: { checked: $checked }) {
      id
    }
  }
`;

const List = () => {
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const { loading, error, data } = useQuery(LIST_ITEMS_QUERY);
  const [updateItemChecked] = useMutation(UPDATE_ITEM_CHECKED_MUTATION, {
    refetchQueries: [LIST_ITEMS_QUERY],
  });

  if (loading) {
    return <MenuLayout />;
  } else if (error) {
    return (
      <MenuLayout>
        <pre>
          <code>{error?.stack ?? error.message}</code>
        </pre>
      </MenuLayout>
    );
  } else {
    const { listItems } = data;

    return (
      <MenuLayout>
        <h1 className="D">List</h1>
        <p className="PL-L">This list uses the integrated Keystone API:</p>

        {listItems.length > 0 ? (
          <TableBuilder data={listItems}>
            <TableBuilderColumn
              overrides={{
                TableHeadCell: { style: { width: "1%" } },
                TableBodyCell: { style: { width: "1%" } },
              }}
            >
              {(row) => {
                return (
                  <Checkbox
                    key="checkbox"
                    checked={row.checked}
                    onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                      await updateItemChecked({
                        variables: {
                          id: row.id,
                          checked: event.target.checked,
                        },
                      });
                    }}
                  />
                );
              }}
            </TableBuilderColumn>
            <TableBuilderColumn header="Name">
              {(row) => {
                return <div key="name">{row.name}</div>;
              }}
            </TableBuilderColumn>
          </TableBuilder>
        ) : (
          <h6>
            Working but empty &ndash;{" "}
            <Link
              to={`${
                import.meta.env.VITE_KEYSTONE_HOST ?? "http://localhost:3001"
              }/list-items`}
            >
              add some test data
            </Link>
          </h6>
        )}

        <p>
          It is mostly here to test the built-in prod proxy logic, but it also serves to
          show a simple example of using Keystone.
        </p>
        <p>
          You can modify the data{" "}
          <Link
            to={import.meta.env.VITE_KEYSTONE_HOST ?? "http://localhost:3001"}
            target="_blank"
          >
            here
          </Link>
          .
        </p>
        <blockquote>
          <p className="PL-L">What is Keystone?</p>
          <p>
            Keystone takes a single input <code>keystone.ts</code> file and generates a
            full CRUD GraphQL API and Admin UI.
          </p>
          <p>
            It supports User types and makes auth easy. Schema migrations are pretty
            seamless and it connects to a Postgres or SQLite database.
          </p>
        </blockquote>
        <p>
          Client errors are sent to Keystone. To intentionally throw a client error, click
          this button.
        </p>
        <Button
          onClick={() => {
            setIsErrorAlertOpen(true);
            (undefined as unknown as Record<string, unknown>).aDeliberateError;
          }}
        >
          Deliberately Throw Error
        </Button>
        <Modal
          onClose={() => {
            setIsErrorAlertOpen(false);
          }}
          closeable
          isOpen={isErrorAlertOpen}
          animate
          autoFocus
          role="alertdialog"
          overrides={{
            Root: {
              style: {
                zIndex: 999,
              },
            },
          }}
        >
          <ModalHeader>Error thrown</ModalHeader>
          <ModalBody>
            <p>In production, this sends an error to Keystone.</p>
            <p>In development, it does nothing.</p>
          </ModalBody>
          <ModalFooter>
            <ModalButton
              onClick={() => {
                setIsErrorAlertOpen(false);
              }}
            >
              Close
            </ModalButton>
          </ModalFooter>
        </Modal>
      </MenuLayout>
    );
  }
};

export default List;
