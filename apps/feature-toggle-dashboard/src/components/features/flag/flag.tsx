"use client";

import { Button, Table } from "@mantine/core";
import { FlagProvider } from "./provider";
import { FlagToggle } from "../flag-toggle";
import { useFlagListContext } from "../flag-list/context";
import { FlagType } from "../types";
import { useState } from "react";
import { format } from "date-fns";
import { DeleteFlagModal, useModalContext } from "../modals";
import { api } from "api/trpc/react";

interface FlagProps {
  flag: FlagType;
}

const FlagContent = ({
  flag: { uuid, name, createdAt, updatedAt },
}: FlagProps) => {
  const { updateFlagForm } = useFlagListContext();
  const { openUpdateModal, openDeleteModal } = useModalContext();
  const [expanded, setExpanded] = useState(false);

  const envs = api.envs.getEnvs.useQuery();

  return (
    <>
      <Table.Tr>
        <Table.Td>{name}</Table.Td>
        <Table.Td>Test Name</Table.Td>
        <Table.Td>
          {format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss")}
        </Table.Td>
        <Table.Td>
          {format(new Date(updatedAt), "dd/MM/yyyy HH:mm:ss")}
        </Table.Td>
        <Table.Td>
          <Button
            variant="light"
            onClick={() => {
              updateFlagForm.setValues({ uuid, name });

              openUpdateModal();
            }}
          >
            Update
          </Button>
          <Button
            variant="light"
            style={{ marginLeft: "12px" }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
          <Button
            color="red"
            style={{ marginLeft: "12px" }}
            onClick={openDeleteModal}
          >
            Delete
          </Button>
          <DeleteFlagModal uuid={uuid} />
        </Table.Td>
      </Table.Tr>
      {!!expanded &&
        envs!.data!.map((env) => (
          <FlagToggle
            key={`${uuid}+${env.type}`}
            uuid={uuid}
            label={env.type}
            env={env.type}
          />
        ))}
    </>
  );
};

export const Flag = (input: FlagProps) => {
  return (
    <FlagProvider>
      <FlagContent flag={input.flag} />
    </FlagProvider>
  );
};
