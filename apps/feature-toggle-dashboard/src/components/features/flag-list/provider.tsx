"use client";

import React, { PropsWithChildren, useReducer, useState } from "react";
import {
  FlagListContextProvider,
  OnUpdateFlagFormSubmitProps,
} from "./context";
import { useForm } from "@mantine/form";
import { EnvKind, FlagType } from "../types";
import { api } from "api/trpc/react";

type UpdateFlagActionType =
  | {
      type: "UPDATE_ENV";
      payload: {
        uuid: string;
        env: EnvKind;
        enabled: boolean;
      };
    }
  | {
      type: "FILTER_FLAGS";
      payload: {
        name: string;
      };
    }
  | {
      type: "REFRESH";
    };

interface FlagListProviderProps extends PropsWithChildren {
  initialFlags: FlagType[];
}

export const FlagListProvider = ({
  children,
  initialFlags,
}: FlagListProviderProps) => {
  const addNewFlag = api.flag.createFlag.useMutation();
  const deleteFlagMutation = api.flag.deleteFlag.useMutation();
  const updateFlagMutation = api.flag.updateFlag.useMutation();
  const updateFlagEnvToggleMutation =
    api.flag.updateFlagEnvToggle.useMutation();

  const [flags, setFlags] = useState(initialFlags);

  const updateFlagForm = useForm({
    initialValues: {
      uuid: "",
      name: "",
    },
  });

  const { refetch: refetchFlags } = api.flag.getFlags.useQuery(undefined, {
    enabled: false,
  });

  const flagActionsReducer = (
    state: FlagType[],
    action: UpdateFlagActionType
  ) => {
    switch (action.type) {
      case "UPDATE_ENV":
        return state.map((item) => {
          if (item.uuid !== action.payload.uuid) return item;

          item.envs.find((env) => env.type === action.payload.env)!.enabled =
            action.payload.enabled;
          return item;
        });
      case "FILTER_FLAGS":
        return flags.filter(
          (item) =>
            action.payload.name === "" ||
            item.name.toLowerCase().includes(action.payload.name.toLowerCase())
        );
      case "REFRESH":
        return flags;
      default:
        return state;
    }
  };

  const refreshFlags = async () => {
    const updatedFlags = await refetchFlags();
    setFlags(updatedFlags.data!);
    dispatch({ type: "REFRESH" });
  };

  const [state, dispatch] = useReducer(flagActionsReducer, flags);

  const onUpdateFlagFormSubmit: OnUpdateFlagFormSubmitProps = async ({
    uuid,
    name,
  }) => {
    await updateFlagMutation.mutate(
      { uuid, name },
      {
        onSuccess: refreshFlags,
        onError: (error) => console.error(error.message),
      }
    );
  };

  const onUpdateEnvironmentToggle = async (
    uuid: string,
    env: EnvKind,
    enabled: boolean
  ) => {
    dispatch({ type: "UPDATE_ENV", payload: { uuid, env, enabled } });
    await updateFlagEnvToggleMutation.mutate(
      { uuid, env, enabled },
      {
        onSuccess: refreshFlags,
        onError: (error) => console.error(error.message),
      }
    );
  };

  const filterFlags = (name: string) => {
    dispatch({ type: "FILTER_FLAGS", payload: { name } });
  };

  const createFlag = (name: string) => {
    addNewFlag.mutate(
      { name },
      {
        onSuccess: refreshFlags,
        onError: (error) => alert(error.message),
      }
    );
  };

  const deleteFlag = (uuid: string) => {
    deleteFlagMutation.mutate(
      { uuid },
      {
        onSuccess: refreshFlags,
        onError: (error) => console.error(error.message),
      }
    );
  };

  return (
    <FlagListContextProvider
      value={{
        flags: state,
        updateFlagForm,
        onUpdateFlagFormSubmit,
        onUpdateEnvironmentToggle,
        filterFlags,
        createFlag,
        deleteFlag,
        refreshFlags,
      }}
    >
      {children}
    </FlagListContextProvider>
  );
};
