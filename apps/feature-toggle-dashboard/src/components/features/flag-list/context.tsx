"use client";

import { createSafeContext } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormEvent } from "react";
import { EnvKind, type FlagType } from "~/components/features/types";

export type OnUpdateFlagFormSubmitProps = (
  values: { uuid: string; name: string },
  event: FormEvent<HTMLFormElement> | undefined
) => void;

interface FlagListContextValue {
  flags: FlagType[];
  updateFlagForm: UseFormReturnType<
    {
      uuid: string;
      name: string;
    },
    (values: { uuid: string; name: string }) => {
      uuid: string;
      name: string;
    }
  >;
  onUpdateFlagFormSubmit: OnUpdateFlagFormSubmitProps;
  onUpdateEnvironmentToggle: (
    uuid: string,
    env: EnvKind,
    enabled: boolean
  ) => void;
  filterFlags: (name: string) => void;
  createFlag: (name: string) => void;
  deleteFlag: (uuid: string) => void;
  refreshFlags: () => void;
}

export const [FlagListContextProvider, useFlagListContext] =
  createSafeContext<FlagListContextValue>(
    "FlagListContext must be used within a FlagListContextProvider"
  );
