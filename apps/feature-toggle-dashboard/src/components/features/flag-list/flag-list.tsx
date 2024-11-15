import { FlagListProvider } from "./provider";
import { Search } from "../search";
import { FlagListContent } from "./flag-list-content";
import { api } from "api/trpc/server";

export const FlagList = async () => {
  const flags = await api.flag.getFlags();

  return (
    <FlagListProvider initialFlags={flags ?? []}>
      <Search />
      <FlagListContent />
    </FlagListProvider>
  );
};
