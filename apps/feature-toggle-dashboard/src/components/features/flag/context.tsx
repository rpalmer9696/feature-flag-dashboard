import { createSafeContext } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

interface FlagContextValue {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
}

export const [FlagContextProvider, useFlagContext] =
  createSafeContext<FlagContextValue>(
    "FlagContext must be used within a FlagContextProvider"
  );
