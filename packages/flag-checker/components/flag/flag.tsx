import { PropsWithChildren, ReactNode } from "react";
import { api } from "api/trpc/server";

interface FlagProps extends PropsWithChildren {
  /** The name of the flag to check for. */
  flagName: string;
  /** Content to render if the flag is disabled. */
  fallback?: ReactNode;
}

/**
 * A React component that will render its child nodes if a feature flag is enabled, otherwise will fallback to whatever is provided as a fallback.
 * @param {FlagProps} props - The properties of the component.
 * @returns
 */
export const Flag = async ({ children, flagName, fallback }: FlagProps) => {
  const isEnabled = await api.flag.isEnabled({ name: flagName });

  return <>{isEnabled ? children : fallback}</>;
};
