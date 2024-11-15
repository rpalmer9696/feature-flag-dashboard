"use client";

import { Button, Table } from "@mantine/core";
import { Flag } from "~/components/features/flag";
import {
  AddFlagModal,
  UpdateFlagModal,
  useModalContext,
} from "~/components/features/modals";
import { useFlagListContext } from "./context";

export const FlagListContent = () => {
  const { flags, refreshFlags } = useFlagListContext();
  const { openAddModal } = useModalContext();
  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Created By</Table.Th>
            <Table.Th>Created Date</Table.Th>
            <Table.Th>Edited Date</Table.Th>
            <Table.Th>
              <Button onClick={openAddModal}>Add New</Button>
              <Button
                variant="light"
                onClick={refreshFlags}
                style={{ marginLeft: "12px" }}
              >
                Refresh
              </Button>
              <AddFlagModal />
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {!flags.length && (
            <Table.Tr>
              <Table.Td
                style={{
                  width: "100%",
                  padding: "32px",
                  backgroundColor: "lightgrey",
                  textAlign: "center",
                }}
                colSpan={5}
              >
                <h3>No Flags Found</h3>
              </Table.Td>
            </Table.Tr>
          )}
          {flags.map((flag, index) => (
            <Flag key={index} flag={flag} />
          ))}
        </Table.Tbody>
      </Table>
      <UpdateFlagModal />
    </>
  );
};
