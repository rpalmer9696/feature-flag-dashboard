export type FlagType = {
  uuid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  envs: EnvFlags[];
};

type EnvFlags = {
  type: EnvKind;
  enabled: boolean;
};

export type EnvKind = "development" | "testing" | "production";
