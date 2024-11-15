import { Switch, Table } from "@mantine/core";
import { EnvKind } from "../types";
import { useFlagListContext } from "../flag-list/context";

interface FlagToggleProps {
  uuid: string;
  label: string;
  env: EnvKind;
}

export const FlagToggle = ({ uuid, label, env }: FlagToggleProps) => {
  const { onUpdateEnvironmentToggle, flags } = useFlagListContext();
  return (
    <Table.Tr>
      <Table.Td></Table.Td>
      <Table.Td>{label}</Table.Td>
      <Table.Td>
        <Switch
          checked={
            flags
              .find((flag) => flag.uuid === uuid)
              ?.envs.find((environment) => environment.type === env)!.enabled
          }
          onChange={(event) => {
            onUpdateEnvironmentToggle(uuid, env, event.currentTarget.checked);
          }}
        />
      </Table.Td>
    </Table.Tr>
  );
};
