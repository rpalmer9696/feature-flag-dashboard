"use client";

import { CloseButton, TextInput } from "@mantine/core";
import styles from "./search.module.scss";
import { useFlagListContext } from "../flag-list/context";
import { useState } from "react";

export const Search = () => {
  const { filterFlags } = useFlagListContext();
  const [value, setValue] = useState("");
  return (
    <TextInput
      placeholder="Search for feature flag"
      aria-label="Search feature flags"
      className={styles.search}
      value={value}
      onInput={(e) => {
        setValue(e.currentTarget.value);
        filterFlags(e.currentTarget.value);
      }}
      rightSection={
        <CloseButton
          onClick={() => {
            setValue("");
            filterFlags("");
          }}
          style={{ display: value ? undefined : "none" }}
        />
      }
    />
  );
};
