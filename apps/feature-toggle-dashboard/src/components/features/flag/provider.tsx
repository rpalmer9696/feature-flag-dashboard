import React, { PropsWithChildren, useState } from "react";
import { FlagContextProvider } from "./context";

interface FlagProviderProps extends PropsWithChildren {}

export const FlagProvider = ({ children }: FlagProviderProps) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <FlagContextProvider value={{ enabled, setEnabled }}>
      {children}
    </FlagContextProvider>
  );
};
