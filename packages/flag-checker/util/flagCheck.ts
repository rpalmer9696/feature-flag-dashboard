import { api } from "api/trpc/server";

/**
 * Checks is a feature flag is enabled, if so it will action the provided callback, if not it won't do anything.
 * @param flagName The name of the flag.
 * @param featureCallback The callback to action when the flag is enabled.
 * @param args Any arguments that the callback needs.
 * @returns A promise that resolves to a boolean dependending on the enabled state of the flag.
 */
export const flagCheck = async <
  Feature extends (...args: Arguments) => void,
  Arguments extends unknown[] = [],
>(
  flagName: string,
  featureCallback: Feature,
  ...args: Arguments
) => {
  const isEnabled = await api.flag.isEnabled({ name: flagName });

  if (isEnabled) {
    featureCallback(...args);
    return true;
  }

  return false;
};
